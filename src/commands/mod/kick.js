const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to kick')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for kick')
                .setRequired(false)),
    run: async ({ client, interaction }) => {
        if (!interaction.member.roles.cache.find(r => r.name === 'Vought Executives (Admins)') && !interaction.member.roles.find(r => r.name === 'Vought Staff (Mods)')) {
            return interaction.editReply('Why are you trying to kick someone?');
        }

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason specified';
        const member = interaction.guild.members.cache.get(user.id);

        member.kick({ reason: reason });

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconUrl: client.user.avatarURL() })
            .setTitle('User Kicked')
            .setDescription(`**User:** ${user.tag} (${user.id})\n**Reason:** ${reason}`)
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter({ text: `Kicked by ${interaction.member.user.tag}`, iconUrl: interaction.user.displayAvatarURL({ dynamic: true }) });

        interaction.editReply({ embeds: [embed] });
    }
}