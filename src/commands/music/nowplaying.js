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
                    .setEmoji('⏸️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setEmoji('⏭️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('stop')
                    .setEmoji('⏹️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('queue')
                    .setEmoji('📜')
                    .setStyle(ButtonStyle.Primary),
        )
        
        await interaction.editReply({ ephemeral: true, embeds: [embed], components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => i.customId === 'pause' || i.customId === 'resume' || i.customId === 'skip' || i.customId === 'stop' || i.customId === 'queue', time: 60000
        });

        collector.on('collect', async button => {
            require(`../../buttons/nowplaying/${button.customId}.js`).run({ client, button });
        })
    }
}