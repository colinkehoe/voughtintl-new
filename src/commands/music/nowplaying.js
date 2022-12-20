const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows the currently playing song'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue)
            return interaction.editReply('There is no music being played right now!');
        
        let bar = queue.createProgressBar({
            timecodes: true,
            queue: false,
            length: 15
        });
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Voughtify', iconURL: client.user.avatarURL() })
            .setThumbnail(queue.current.thumbnail)
            .setTitle('Currently Playing')
            .setDescription(`${queue.current.author} -- [${queue.current.title}](${queue.current.url})`)
            .addFields({
                name: 'Progress',
                value: bar,
                inline: false
            })
            .setFooter({ text: `Requested by ${queue.current.requestedBy.tag}`, iconURL: queue.current.requestedBy.avatarURL() })
            .setTimestamp();
            
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('Pause')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('resume')
                    .setLabel('Resume')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setLabel('Skip')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder() 
                    .setCustomId('stop')
                    .setLabel('Stop')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('queue')
                    .setLabel('Queue')
                    .setStyle(ButtonStyle.Primary),
        )
        
        await interaction.editReply({ ephemeral: true, embeds: [embed], components: [row] });
    }
}