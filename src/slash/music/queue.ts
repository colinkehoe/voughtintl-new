import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import { SlashCommand } from '../../types';

const queue: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the current queue'),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId)
            return interaction.editReply({
                content: 'This command can only be used in a server!',
            });

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue)
            return interaction.editReply({
                content: 'There is no music playing!',
            });

        const totalPages = Math.ceil(queue.tracks.length / 10);
        let currentPage = 1;
        if (currentPage > totalPages)
            return interaction.editReply({
                content: 'That page does not exist!',
            });

        var queueString =
            `**Currently Playing:** \n
        ${queue.current.title} - ${queue.current.author} \n ` +
            `**Queue:** \n` +
            queue.tracks
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((track, i) => {
                    return `**${i + 1}.** ${track.title} - ${track.author}`;
                })
                .join('\n');

        const buttons: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
        );

        let embed: EmbedBuilder = new EmbedBuilder()
            .setAuthor({
                name: 'Voughtify',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Queue')
            .setDescription(queueString)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({
                text: `Page ${currentPage} of ${totalPages} | Requested by ${interaction.user.username}`,
                iconURL: client.user?.avatarURL()!,
            });

        await interaction.editReply({ embeds: [embed], components: [buttons] });

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (i) =>
                i.customId === 'first' ||
                i.customId === 'previous' ||
                i.customId === 'next' ||
                i.customId === 'last',
            time: 60000,
        });

        collector?.on('collect', async (button) => {
            switch (button.customId) {
                case 'first':
                    currentPage = 1;
                    break;
                case 'previous':
                    currentPage = currentPage <= 1 ? 1 : currentPage - 1;
                    break;
                case 'next':
                    currentPage =
                        currentPage >= totalPages
                            ? totalPages
                            : currentPage + 1;
                    break;
                case 'last':
                    currentPage = totalPages;
                    break;
            }
            queueString =
                `**Currently Playing:** \n` +
                `${queue.current.title} - ${queue.current.author} \n ` +
                `**Queue:** \n` +
                queue.tracks
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((track, i) => {
                        return `**${i + 1}.** ${track.title} - ${track.author}`;
                    })
                    .join('\n');

            embed
                .setDescription(queueString)
                .setFooter({
                    text: `Page ${currentPage} of ${totalPages} | Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.avatarURL()!,
                })
                .setTimestamp();

            await button.update({ embeds: [embed] });
        });
    },
};

export default queue;
