/*
 * Command: members
 ! This is a slash command.
 ? This command gets a list of members in a server.
*/

import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Role,
    GuildMember,
} from 'discord.js';
import { SlashCommand } from '../../types';

const members: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('members')
        .setDescription('Get a list of users in this server')
        .addRoleOption((option) =>
            option
                .setName('role')
                .setDescription('The role to get the members of')
                .setRequired(false)
        )
        .addNumberOption((option) =>
            option
                .setName('online')
                .setDescription('Get online or offline members')
                .addChoices(
                    {
                        name: 'Online',
                        value: 1
                    },
                    {
                        name: 'Offline',
                        value: 0
                    }
                )
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) {
            console.log('Command issued in invalid guild');
            return interaction.editReply(
                'This command can only be used in a guild!'
            );
        }

        const role: Role | null =
            (interaction.options.getRole('role') as Role) || null;
        const online: number | null =
            interaction.options.getNumber('online') || null;

        const members = (
            await interaction.guild?.members.fetch({ withPresences: true })
        )?.filter((member: GuildMember) =>
            member.roles.cache.some((frole: Role) => frole == role)
        );
        console.log(members?.map((member) => member.presence));
        if (!members) return interaction.editReply('Something went wrong!');

        if (!role && !online) {
            return interaction.editReply(
                'Please specify a role or set online to true'
            );
        }

        if (role && !online) {
            const list: string = members
                .map((member) => member.user.tag)
                .join('\n');
            return interaction.editReply(list);
        }

        var list: string = 'defauult';

        switch (online) {
            case 0:
                list = members.filter((member) => member.presence?.status === 'offline').map((member) => member.user.tag).join('\n');
                break;
            case 1: 
                list = members.filter((member) => member.presence?.status === 'online').map((member) => member.user.tag).join('\n');
        }

        if (role && online) {
            return interaction.editReply(list);
        }

        if (online && !role) {
            return interaction.editReply(list);
        }
    },
};

export default members;
