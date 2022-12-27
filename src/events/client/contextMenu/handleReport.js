const { EmbedBuilder } = require('discord.js');

module.exports = {
    run: async ({ client, interaction }) => {
        const reason = interaction.fields.getTextInputValue('reason');

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('User reported')
            .setDescription(`${interaction.targetId} has been reported`)
            .addFields({ name: 'Reason', value: reason })
            .setFooter({ text: `Reported by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
        
        const dmEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('Thank You')
            .setDescription(`Thank you for reporting ${interaction.targetId}`)
            .addFields({ name: 'Reason', value: reason })
            .setFooter({ text: `Reported by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
            .setColor(0xFF0000);
        
        await interaction.reply({ embeds: [embed] });
        await interaction.user.send({ embeds: [dmEmbed] });
    }
}