import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    CategoryChannel,
    StageChannel,
    TextBasedChannel,
    ForumChannel,
    APIInteractionDataResolvedChannel,
    DMChannel,
    Role,
    GuildMemberRoleManager,

    
} from 'discord.js';
import { SlashCommand } from '../../types';
import { delay } from '../../utils/utils';

/*
*   @param { Client } client - The client object.
*   @param { ChatInputCommandInteraction } interaction - The interaction issued.
*   @param { Channel } channel - The channel to nuke.
*   @returns { Promise<void> }
*/

const nuke: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Nuke a channel.')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel to nuke.')
                .setRequired(false)
    )
        .addStringOption(option =>
            option
                .setName('amount')
                .setDescription('The amount of messages to delete.')
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) {
            console.log(`#${interaction.user.tag} has tried to issue a command in DMs.`);
            return await interaction.editReply("You can't use this command in DMs!");
        }

        const memberRoles: any = (interaction.member?.roles as GuildMemberRoleManager).cache;

        if (!memberRoles.find((role: Role) => role.name === 'Vought Executives (Admin)')
            &&
            !memberRoles.find((role: Role) => role.name === 'Vought Executives (Mod)')
            &&
            !memberRoles.find((role: Role) => role.name === 'Overlord')) {
            return interaction.editReply("You don't have permission to use this command!");
        }

        const channel: any = interaction.options.getChannel('channel') ?? interaction.channel;
        const number: string = interaction.options.getString('amount') ?? '100';
        if (!channel)
            return interaction.editReply("You can't use this command in DMs!");
        
        if (channel instanceof CategoryChannel)
            return interaction.editReply("You can't nuke a category!");
        if (channel instanceof StageChannel)
            return interaction.editReply("You can't nuke a stage channel!");
        if (channel instanceof ForumChannel)
            return interaction.editReply("You can't nuke a forum channel!");
        if (channel instanceof DMChannel)
            return interaction.editReply("You can't nuke a DM channel!");
        
        
        if (number === "100") {
            const messages = await channel.messages.fetch();
            await channel.bulkDelete(messages, true);
            await delay(5000);
            return channel.send(`Boom! Nuked #${channel.name}.`);
          } else {
            const messages = await channel.messages.fetch({ limit: parseInt(number) });
            await channel.bulkDelete(messages, true);
            await delay(5000);
            return channel.send(`Boom! Nuked ${number} messages in #${channel.name}.`);
          }
        

    }
}

export default nuke;