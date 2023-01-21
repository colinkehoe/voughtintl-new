import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    GuildMember,
} from 'discord.js';
import { SlashCommand } from '../../types';
import { QueryType } from 'discord-player';
import { EmbedBuilder } from '@discordjs/builders';

const scotlandforever: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('scotlandforever')
        .setDescription('Plays Scotland Forever')
        .addNumberOption((option) =>
            option
                .setName('volume')
                .setDescription('Volume to play at')
                .setRequired(false)
        )
        .addNumberOption((option) =>
            option
                .setName('number')
                .setDescription('Number of times to play')
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) return;
        const volume = interaction.options.getNumber('volume') || 0.5;
        const number = interaction.options.getNumber('number') || 1;

        let queue = client.player.getQueue(interaction.guildId!);
        const member: GuildMember = interaction.member as GuildMember;

        if (!member?.voice.channel) {
            return await interaction.editReply(
                'You must be in a voice channel to use this command!'
            );
        }

        if (!queue)
            queue = client.player.createQueue(interaction.guildId, {
                metadata: interaction.channel,
                autoSelfDeaf: true,
            });
        if (!queue.connection) await queue.connect(member.voice.channel);

        let result = await client.player.search(
            'https://youtu.be/f2bHoTUiMpI',
            {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            }
        );
        if (!result || result.tracks.length == 0) {
            return await interaction.editReply(
                'There was an error finding the song!'
            );
        }
        const song = result.tracks[0];

        for (let i = 0; i < number; i++) {
            await queue.addTrack(song);
        }

        if (!queue.playing) await queue.play();
        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Vought International',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Scotland Forever')
            .setDescription(`Playing the glorious anthem.`)
            .setThumbnail('https://flagsweb.com/DT/PNG/Flag_of_Scotland.png')
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user?.avatarURL()!,
            })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};

export default scotlandforever;
