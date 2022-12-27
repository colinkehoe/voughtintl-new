const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the current queue'),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue)
            return interaction.editReply('There is no music being played right now!');
        
        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        var page = 0;

        if (page > totalPages) 
            return interaction.editReply(`The page number can't be greater than ${totalPages}!`);
        console.log(`There are ${queue.tracks.length} songs: \n`);
        var queueString = `**Currently Playing** \n${queue.current.title}\n` + `**Queue**\n` + queue.tracks.slice(page * 10, (page + 1) * 10).map((song, i) => {
            return `**${i + 1}.** ${song.author} -- ${song.title}`;
        }).join('\n');

        console.log(queueString);

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('first')
                    .setEmoji('⏮️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setEmoji('⏪')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setEmoji('⏩')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('last')
                    .setEmoji('⏭️')
                    .setStyle(ButtonStyle.Primary)
            )
        
        // make an embed with the queue with buttons to navigate
        var embed = new EmbedBuilder()
            .setAuthor({ name: 'Voughtify', iconURL: client.user.avatarURL() })
            .setTitle('Queue')
            .setDescription(queueString)
            .setFooter({ text: `Queue requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        
        await interaction.editReply({ embeds: [embed], components: [buttons] });

        const collector = interaction.channel.createMessageComponentCollector({ filter: i => i.customId == 'first' || i.customId == 'next' || i.customId == 'previous' || i.customId == 'last', time: 60000 });
        collector.on('collect', async button => {
            switch (button.customId) {
                case 'first':
                    page = 0;
                    break;
                case 'next':
                    page = page > totalPages ? totalPages : page + 1;
                    break;
                case 'previous':
                    page = page < 0 ? 0 : page - 1;
                    break;
                case 'last':
                    page = totalPages - 1;
                    break;
            
            }
            queueString = queue.tracks.slice(page * 10, (page + 1) * 10).map((song, i) => {
                return `**${(page * 10) + i + 1}.** ${song.author} -- ${song.title}`;
            }).join('\n');

            embed
                .setDescription(`**Currently Playing** \n${queue.current.title}\n` + `**Queue**\n` + queueString)
                .setFooter({ text: `Page ${page + 1} of ${totalPages} | Queue requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
                .setTimestamp();
            
            await button.update({ embeds: [embed] });
        })
    }
}