/*
 * Command: slowmode
 ! This is a slash command.
 ? This command sets the slowmode of a channel.
*/

import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ChannelType,
    TextChannel,
    GuildMember,
    Role,
} from 'discord.js';
import { SlashCommand } from '../../types';

const slowmode: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set the slowmode of a channel')
        .addIntegerOption((option) =>
            option
                .setName('power')
                .setDescription('Turn on/off the slowmode')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'On',
                        value: 1
                    },
                    {
                        name: 'Off',
                        value: 0
                    }
                )
        )
        .addIntegerOption((option) =>
            option
                .setName('seconds')
                .setDescription('The amount of seconds to set the slowmode to')
                .setRequired(false)
        )
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('The channel to set the slowmode of')
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {

        /*
        * Check if the command was issued in a server, 
        * and if the user has permission to use the command
        */

        if (!interaction.guildId)
            return interaction.editReply(
                'This command can only be used in a server'
            );
        const mod: GuildMember | undefined =
            interaction.guild!.members.cache.get(interaction.user.id);
        if (!mod) return interaction.editReply('You are not in this server');
        if (
            !mod.roles.cache.some(
                (role: Role) =>
                    role.name === 'Vought Executives (Admins)' ||
                    role.name === 'Vought Staff (Mods)' ||
                    role.name === 'Overlord'
            )
        ) {
            return interaction.editReply(
                'You do not have permission to use this command!'
            );
        }

        /*
        * Get the channel and time from the command options
        */

        let channel = interaction.options.getChannel('channel') || interaction.channel;
        const time: number = interaction.options.getInteger('seconds') || 0;
        const off: number = interaction.options.getInteger('power') || 0;

        /*
        * Ensure time and text channel are valid
        */
        
        if (time > 21600)
            return interaction.editReply('Slowmode cannot be set to more than 6 hours (21600 seconds)');
        if (channel?.type !== ChannelType.GuildText)
            return interaction.editReply(
                'You can only set the slowmode of a text channel'
            );
        channel = channel as TextChannel;

        /*
        * Turn off the slowmode if the user has requested it
        * Otherwise, set the slowmode to the specified time
        */

        off === 0
            ? await channel.setRateLimitPerUser(0).then(() => interaction.editReply('Slowmode has been turned off!')).catch((error) => console.log(error))
            : channel.setRateLimitPerUser(time).then(() => interaction.editReply(`Slowmode has been set to ${time} seconds!`)).catch((error) => console.log(error))
        
    },
};

export default slowmode;
