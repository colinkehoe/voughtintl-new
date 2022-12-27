const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('Skips to a specific song in the queue')
        .addIntegerOption(option => option.setName('song').setDescription('The song to skip to')),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.editReply({ content: 'No music is being played!', ephemeral: true });
        const song = interaction.options.getInteger('song');
        if (song < 1 || song > queue.tracks.length) return interaction.editReply({ content: 'Song must be between 1 and the length of the queue!', ephemeral: true });
        const success = await queue.skipTo(song - 1);
        const track = queue.tracks[song - 1];

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Voughtify', iconURL: client.user.avatarURL() })
            .setTitle('Song Skipped')
            .setDescription(success ? `Skipped to ${track.author} -- ${track.title}!\n\n**Now Playing** \n ${queue.tracks[0].author} -- ${queue.tracks[0].title}` : `There was a problem skipping to the song!`)
            .setFooter({ text: `Skipped by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        
        return interaction.editReply({ embeds: [embed], ephemeral: true });
    }
}