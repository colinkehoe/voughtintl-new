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

const stop: Button = {
    name: 'stop',
    run: async (
        client: Client,
        button: ButtonInteraction,
        interaction: ChatInputCommandInteraction
    ) => {
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

        queue.destroy(true);

        return button.update({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: 'Voughtify',
                        iconURL: client.user?.avatarURL()!,
                    })
                    .setTitle('Stopped the music!')
                    .setTimestamp(),
            ],
            components: [],
        });
    },
};

export default stop;
