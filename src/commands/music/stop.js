const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the queue'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.reply({ content: 'No music is being played!', ephemeral: true });
        queue.destroy();
        interaction.reply({ content: 'Stopped the queue!', ephemeral: true });
    }
}