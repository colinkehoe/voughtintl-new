import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    GuildMember,
    Role,
    RoleSelectMenuBuilder
} from 'discord.js';
import { SlashCommand } from '../../types';
import { color_text } from '../../utils/utils';

const ban: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from this server')
        .addStringOption((option) => 
            option
                .setName('user')
                .setDescription('The id of the user to ban')
                .setRequired(true) 
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {

        //if command is not run in server, return
        if (!interaction.guildId) {
            console.log('Command issued in invalid guild');
            return interaction.editReply(
                'This command can only be used in a guild!'
            );
        }

        
        const targetID: any = interaction.options.getString('user');           //get target from command
        const target: any = await client.users.fetch(targetID).catch(() => {
            return interaction.editReply('Please specify a valid user to ban!');
        })

        //invalid targets
        if (!target)
            return interaction.editReply('Please specify a user to ban!');
        if (target.id === interaction.user.id)
            return interaction.editReply("You can't ban yourself!");
        if (target.bot)
            return interaction.editReply("You can't ban a bot!");

        const member: GuildMember | undefined =
            interaction.guild!.members.cache.get(target.id);
        if (!member)
            return interaction.editReply('The user is not in this server');
        if (!member.bannable)
            return interaction.editReply("I can't ban this user");

        //get the mod who issued the command
        const mod: GuildMember | undefined = interaction.guild!.members.cache.get(interaction.user.id);
        
        //if the user has the proper permissions
        if (
            !mod!.roles.cache.some((role: Role) => {
                role.name === 'Vought Executives (Admins)' ||
                    role.name === 'Vought Staff (Mods)' ||
                    role.name === 'Overlord';
            })
        ) {
            console.log('banning user...')
            /*
            await member
                .ban()
                .then(() => {
                    console.log(color_text('red', `Banned ${target.tag}`));
                    interaction.editReply(
                        `${interaction.user.tag} has banned ${target.tag}`
                    );
                })
                .catch((err) => {
                    console.error(err);
                    interaction.editReply("I can't ban this user");
                });
                */
        } else {
            await interaction.editReply(
                "You don't have permission to ban this user"
            );
        }
    },
};

export default ban;
