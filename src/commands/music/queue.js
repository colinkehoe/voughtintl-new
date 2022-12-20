const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the current queue'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue)
            return interaction.editReply('There is no music being played right now!');
        
        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        
        const queueString = queue.tracks.slice(page * 10, (page + 1) * 10).map((song, i) => {
            return `${i + 1}. ${song.title}`;
        }).join('\n');

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary),
            )
        
        // make an embed with the queue with buttons to navigate
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Voughtify', iconURL: client.user.avatarURL() })
            .setTitle('Queue')
            .setDescription(queueString)
            .setFooter({ text: `Page ${page + 1} of ${totalPages}` })
            .setTimestamp();
        
        await interaction.editReply({ embeds: [embed], components: [buttons] });
    }
}