const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Change the volume of the queue')
        .addIntegerOption(option => option.setName('volume').setDescription('The volume to set the queue to')),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.editReply({ content: 'No music is being played!', ephemeral: true });
        const volume = interaction.options.getInteger('volume');
        if (volume < 0 || volume > 100) return interaction.editReply({ content: 'Volume must be between 0 and 100!', ephemeral: true });
        queue.setVolume(volume);
        interaction.editReply({ content: `Set the volume to ${volume}!`, ephemeral: true });
    }
}