import {
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
} from 'discord.js';
import { SlashCommand } from '../../types';

/*
 * @param {Client} client
 * @param {}
 */

const skip: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song.')
        .addIntegerOption((option) =>
            option
                .setName('to')
                .setDescription('The song number to skip to')
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (interaction.guildId) {
            console.log('Command issued in invalid guild');
            return interaction.editReply(
                'This command can only be used in a guild!'
            );
        }

        const queue = client.player.getQueue(interaction.guildId!);
        const songIndex = interaction.options.getInteger('to');
        if (!queue || !queue.playing)
            return interaction.editReply('There is no music playing!');
        const current = queue.current;

        if (songIndex) {
            if (songIndex > queue.tracks.length || songIndex < 0)
                return interaction.editReply('Invalid queue index!');

            try {
                queue.skipTo(songIndex - 1);
            } catch (error) {
                console.log(error);
                return interaction.editReply(
                    'There was an error skipping to that song!'
                );
            }

            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: 'Voughtify',
                            iconURL: client.user?.avatarURL()!,
                        })
                        .setTitle('Skipped to Song')
                        .setDescription(
                            `Skipped to ${
                                queue.tracks[songIndex - 1].author
                            } -- **${queue.tracks[songIndex - 1].title}**!`
                        )
                        .setThumbnail(queue.tracks[songIndex - 1].thumbnail)
                        .setFooter({
                            text: `Skipped by ${interaction.user.tag}`,
                            iconURL: interaction.user?.avatarURL()!,
                        })
                        .setTimestamp(),
                ],
            });
        }

        const success = queue.skip();
        success
            ? await interaction.editReply({
                  embeds: [
                      new EmbedBuilder()
                          .setAuthor({
                              name: 'Voughtify',
                              iconURL: client.user?.avatarURL()!,
                          })
                          .setTitle('Song Skipped')
                          .setDescription(`Skipped **${current.title}**!`)
                          .addFields({
                              name: 'Now Playing',
                              value: `${queue.tracks[0].author} -- ${queue.tracks[0].title}`,
                          })
                          .setThumbnail(queue.tracks[0].thumbnail)
                          .setFooter({
                              text: `Skipped by ${interaction.user.tag}`,
                              iconURL: interaction.user?.avatarURL()!,
                          })
                          .setTimestamp(),
                  ],
              })
            : await interaction.editReply(
                  'There was an error skipping the song.'
              );
    },
};

export default skip;
