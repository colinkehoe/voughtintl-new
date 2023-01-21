import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from 'discord.js';
import { SlashCommand } from '../../types';

const back: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('back')
        .setDescription('Plays the previous song'),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) return;
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.editReply('There is no queue!');

        const song = queue.previousTracks[0];
        if (!song)
            return await interaction.editReply('There is no previous track!');

        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Vought International',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Now Playing')
            .setDescription(`${song.author} -- ${song.title}`)
            .setThumbnail(song.thumbnail)
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user?.avatarURL()!,
            });

        await queue.back();
        await interaction.editReply({ embeds: [embed] });
    },
};

export default back;
