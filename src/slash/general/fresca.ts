import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMemberRoleManager, EmbedBuilder, Message, MessageReaction } from 'discord.js';
import { SlashCommand } from '../../types';

const fresca: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('fresca')
        .setDescription('Create a fresca club membership poll')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to welcome into the Fresca Club')
                .setRequired(false)
    ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId)
            return await interaction.editReply('You must be in a guild to use this command.');
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) {
            await interaction.editReply('You must be in a guild to use this command.');
            return;
        }
        const fresca = interaction.guild?.roles.cache.find(role => role.name === 'Fresca Club');
        const noFresca = interaction.guild?.roles.cache.find(role => role.name === 'No Fresca');

        if (!fresca || !noFresca)
            return await interaction.editReply('Fresca Club role not found.');
        
        
        if ((member.roles as GuildMemberRoleManager).cache.has(fresca.id))
            return await interaction.editReply('You are already a member of the Fresca Club.');
        if ((member.roles as GuildMemberRoleManager).cache.has(noFresca.id))
            return await interaction.editReply('You are already a member of the No Fresca Club.');
        
        const poll: Message = await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Fresca Club Membership Poll')
                    .setDescription(`Should we welcome ${user.tag} into the Church of the Collective?`)
                    .setFooter({
                        text: `React to vote | Requested by ${interaction.user.tag}`,
                        iconURL: user.avatarURL() || undefined
                    })
            ]
        })

        await poll.react('👍');
        await poll.react('👎');

        const collector = poll.createReactionCollector({
            filter: (reaction) => {
                return reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
            },
            time: 1000 * 60 * 60
        });

        collector.on('collect', async (reaction: MessageReaction) => {
            if (reaction.users.cache.last()?.bot)
                return;
            
            if (reaction.emoji.name === '👍' || reaction.emoji.name === '👎')
                console.log(`Collected ${reaction.emoji.name} from ${reaction.users.cache.last()?.tag}}`);
        });
        collector.on('end', async (collected) => {
            const yes = collected.get('👍')?.count || 0;
            const no = collected.get('👎')?.count || 0;
            const total = yes + no;
            const yesPercent = Math.round((yes / total) * 100);
            const noPercent = Math.round((no / total) * 100);
            const embed = new EmbedBuilder()
                .setTitle('Fresca Club Membership Poll')
                .setDescription(`Should we welcome ${user.tag} into the Church of the Collective?`)
                .setFooter({
                    text: `Poll ended | Requested by ${interaction.user.tag}`,
                    iconURL: user.avatarURL() || undefined
                })
                .addFields({
                    name: 'Yes',
                    value: `${yes} votes (${yesPercent}%)`,
                    inline: true
                })
                .addFields({
                    name: 'No',
                    value: `${no} votes (${noPercent}%)`,
                    inline: true
                });
            if (yes > no) {
                embed.setColor(0x00FF00);
                await member.roles.add(fresca.id);
            } else {
                embed.setColor(0xFF0000);
                await member.roles.add(noFresca.id);
            }
            await poll.edit({
                embeds: [embed]
            });
        })
    }
}

export default fresca