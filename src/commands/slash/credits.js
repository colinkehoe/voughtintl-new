const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('Replies with the credits for the bot.'),
    run: async ({ client, interaction }) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Credits', iconURL: client.user.avatarURL })
            .addFields({ name: 'Developer',      value: 'colinkehoe#8735'})
            .addFields({ name: 'Donate',         value: '[My PayPal](https://www.paypal.com/paypalme/colinkehoedev)'})
            .addFields({ name: 'Contributors',   value:'Borgninja#0042'})
            .addFields({ name: 'Special Thanks', value:'None'})
            .setFooter({ text: 'Created under MIT License' })
            .setColor('#FF0000');
        interaction.editReply({ embeds: [embed] });
    }
}