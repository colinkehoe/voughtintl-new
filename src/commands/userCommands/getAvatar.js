const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Get Avatar')
        .setType(ApplicationCommandType.User),
    run: async ({ client, interaction }) => {

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('Get Avatar')
            .setImage(interaction.targetUser.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}