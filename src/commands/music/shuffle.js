const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the current queue'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.reply({ content: 'No music is being played!', ephemeral: true });
        queue.shuffle();
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Voughtify', iconURL: client.user.avatarURL() })
            .setTitle('Queue Shuffled')
            .setDescription('Shuffled the queue!')
            .setFooter({ text: `Shuffled by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}