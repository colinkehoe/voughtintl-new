const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.editReply({ content: 'No music is being played!', ephemeral: true });
        const success = queue.skip();

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Voughtify', iconURL: client.user.avatarURL() })
            .setTitle('Song Skipped')
            .setDescription(success ? `Skipped the current song!\n\n**Now Playing** \n ${queue.tracks[0].author} -- ${queue.tracks[0].title}` : `There was a problem skipping the song!`)
            .setFooter({ text: `Skipped by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        
        return interaction.editReply({ embeds: [embed], ephemeral: true });
    }
}