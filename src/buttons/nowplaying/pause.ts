import {
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ButtonInteraction,
    ChatInputCommandInteraction,
} from 'discord.js';
import { Button } from '../../types';

/*
 *   @param {CLient} client - The client object
 *   @param {ButtonInteraction} button - The button that was clicked.
 *   @param {ChatInputCommandInteraction} interaction - The interaction that the button was clicked on.
 */

const pause: Button = {
    name: 'pause',
    run: async (
        client: Client,
        button: ButtonInteraction,
        interaction: ChatInputCommandInteraction
    ) => {
        console.log(button);
        const queue = client.player.getQueue(button.guildId!);
        if (!queue)
            return button.update({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: 'Voughtify',
                            iconURL: client.user?.avatarURL()!,
                        })
                        .setTitle('There is no music being played right now!')
                        .setTimestamp(),
                ],
            });

        queue.setPaused(true);

        const row: any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('resume')
                .setEmoji('▶️')
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
                .setStyle(ButtonStyle.Primary)
        );

        return button.update({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: 'Voughtify',
                        iconURL: client.user?.avatarURL()!,
                    })
                    .setTitle('Paused the music!')
                    .setThumbnail(queue.current.thumbnail)
                    .setDescription(
                        `Currently playing: ${queue.current.author} -- [${queue.current.title}](${queue.current.url})`
                    )
                    .addFields({
                        name: 'Progress',
                        value: queue.createProgressBar({
                            timecodes: true,
                            queue: true,
                            length: 15,
                        }),
                    })
                    .setFooter({
                        text: `Requested by ${interaction.user.username}`,
                        iconURL: queue.current.requestedBy.avatarURL()!,
                    })
                    .setTimestamp(),
            ],
            components: [row],
        });
    },
    cooldown: 5,
};

export default pause;
