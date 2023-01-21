import {
    Client,
    ButtonInteraction,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';
import { Button } from '../../types';

const resume: Button = {
    name: 'resume',
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

        queue.setPaused(false);

        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
                .setStyle(ButtonStyle.Primary)
        );

        return button.update({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: 'Voughtify',
                        iconURL: client.user?.avatarURL()!,
                    })
                    .setTitle('Resumed the music!')
                    .setTimestamp(),
            ],
            components: [row],
        });
    },
    cooldown: 5,
};

export default resume;
