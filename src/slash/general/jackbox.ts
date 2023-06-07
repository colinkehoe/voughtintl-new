import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Role,
    GuildMemberRoleManager
} from 'discord.js';
import { SlashCommand } from '../../types';

const jackbox: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('jackbox')
        .setDescription('View upcoming Jackbox times.'),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) 
            return await interaction.editReply('You must be in a guild to use this command.');
        
        const jackbox: Role | undefined = interaction.guild?.roles.cache.find((role) => role.name === 'Jackbox');
        if (!jackbox) 
            return await interaction.editReply('Jackbox role not found.');
        
        if (!(interaction.member?.roles as GuildMemberRoleManager).cache.has(jackbox.id))
            return await interaction.editReply('You do not have permission to use this command.');

        await interaction.editReply('Jackbox times coming soon!');
    },
};

export default jackbox;
