const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue)
            return interaction.editReply('There is no music being played right now!');
        if (!queue.playing) {
            queue.setPaused(false);
            return interaction.editReply('Resumed the music!');
        }
        else if (queue.playing) {
            queue.setPaused(true);
            return interaction.editReply('Paused the music!');
        }
        else {
            return interaction.editReply('There was an issue.');
        }
    }
}