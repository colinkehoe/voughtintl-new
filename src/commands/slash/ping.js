const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    run: async ({ client, interaction }) => {
        await interaction.editReply('Pong!');
    }
}