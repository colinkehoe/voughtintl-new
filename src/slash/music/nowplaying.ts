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

const nowplaying: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows the currently playing song'),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId)
            return interaction.editReply(
                'This command can only be used in a server!'
            );

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return interaction.editReply('There is no music playing!');

        let bar = queue.createProgressBar({
            timecodes: true,
            queue: true,
            length: 15,
        });

        let embed = new EmbedBuilder()
            .setAuthor({
                name: 'Voughtify',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Now Playing')
            .setThumbnail(queue.current.thumbnail!)
            .setDescription(
                `**${queue.current.title}** - ${queue.current.author}`
            )
            .addFields({
                name: 'Progress',
                value: bar,
            })
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({
                text: `Requested by ${queue.current.requestedBy.username}`,
                iconURL: queue.current.requestedBy.avatarURL()!,
            });

        let row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
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

        await interaction.editReply({
            embeds: [embed],
            components: [row],
        });

        const collector = interaction.channel?.createMessageComponentCollector({
            filter: (i) =>
                i.customId === 'pause' ||
                i.customId === 'resume' ||
                i.customId === 'skip' ||
                i.customId === 'stop' ||
                i.customId === 'queue',
            time: 60000,
        });

        collector?.on('collect', async (button) => {
            require(`../../buttons/nowplaying/${button.customId}.js`).default.run(
                client,
                button,
                interaction
            );
        });
    },
};

export default nowplaying;
