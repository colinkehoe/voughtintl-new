const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for ban')
                .setRequired(false)),
    run: async ({ client, interaction }) => {
        if (!interaction.member.roles.cache.find(r => r.name === 'Vought Executives (Admins)') && !interaction.member.roles.find(r => r.name === 'Overlord')) {
            return interaction.editReply('Why are you trying to ban someone?');
        }

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason specified';
        const member = interaction.guild.members.cache.get(user.id);

        member.ban({ reason: reason });
        interaction.editReply(`Banned ${user.tag} for ${reason}`);
    }
}