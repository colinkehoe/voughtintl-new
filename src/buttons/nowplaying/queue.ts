import {
    Client,
    ButtonInteraction,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import { Button } from '../../types';

const queue: Button = {
    name: 'queue',
    run: async (
        client: Client,
        button: ButtonInteraction,
        interaction: ChatInputCommandInteraction
    ) => {
        const queue = client.player.getQueue(button.guildId!);
        if (!queue)
            return button.reply('There is no music being played right now!');

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        var page = 0;

        var queueString =
            `**Currently Playing** \n${queue.current.title}\n` +
            `**Queue**\n` +
            queue.tracks
                .slice(page * 10, (page + 1) * 10)
                .map((song, i) => {
                    return `**${i + 1}.** ${song.author} -- ${song.title}`;
                })
                .join('\n');

        // make an embed with the queue with buttons to navigate
        var embed = new EmbedBuilder()
            .setAuthor({
                name: 'Voughtify',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Queue')
            .setDescription(queueString)
            .setFooter({
                text: `Queue requested by ${button.user.tag}`,
                iconURL: button.user?.avatarURL()!,
            })
            .setTimestamp();

        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
        await button.update({ embeds: [embed], components: [row] });

        const collector = button.channel?.createMessageComponentCollector({
            filter: (i) =>
                i.customId == 'first' ||
                i.customId == 'next' ||
                i.customId == 'previous' ||
                i.customId == 'last',
            time: 60000,
        });
        collector?.on('collect', async (button) => {
            switch (button.customId) {
                case 'first':
                    page = 0;
                    break;
                case 'next':
                    page++;
                    break;
                case 'previous':
                    page--;
                    break;
                case 'last':
                    page = totalPages;
                    break;
            }
            if (page < 0) page = 0;
            if (page > totalPages) page = totalPages;
            queueString =
                `**Currently Playing** \n${queue.current.title}\n` +
                `**Queue**\n` +
                queue.tracks
                    .slice(page * 10, (page + 1) * 10)
                    .map((song, i) => {
                        return `**${page * 10 + i + 1}.** ${song.author} -- ${
                            song.title
                        }`;
                    })
                    .join('\n');
            embed.setDescription(queueString);
            button.update({ embeds: [embed] });
        });
    },
    cooldown: 5,
};

export default queue;
