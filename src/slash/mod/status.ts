import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    GuildMember,
    Role,
    EmbedBuilder
} from 'discord.js';
import { SlashCommand } from '../../types';
import { color_text } from '../../utils/utils';

const status: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Checks the status of the bot.'),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId)
        {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: 'Vought International',
                    iconURL: client.user?.avatarURL()!,
                })
                .setTitle('Status')
                .addFields({
                    name: 'Vought International is online.',
                    value: `Online in ${client.guilds.cache.size} servers!`,
                })
                .setFooter({
                    text: `Online for ${client.uptime}ms`,
                    iconURL: client.user?.avatarURL()!,
                })
                .setColor('#FF0000')
                .setTimestamp();
            
            console.log(`Status command issued in dm by ${interaction.user.tag}`);

            return interaction.editReply({ embeds: [embed] });
            
        }

        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Vought International',
                iconURL: client.user?.avatarURL()!,
            })
    }
}

export default status;