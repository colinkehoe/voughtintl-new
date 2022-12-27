const { EmbedBuilder, ActionRowBuilder,  ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Report')
        .setType(ApplicationCommandType.User),
    run: async ({ client, interaction }) => {
        

        const reasonInput = new TextInputBuilder()
            .setCustomId('reason')
            .setPlaceholder('Reason')
            .setLabel('Reason for Reporting')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(100);

        const firstActionRow = new ActionRowBuilder()
            .addComponents(reasonInput)
        
        const modal = new ModalBuilder()
            .setCustomId('report')
            .setTitle('Report User')
        modal.addComponents(firstActionRow)

        await interaction.showModal(modal);
    }
}