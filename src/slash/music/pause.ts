import { SlashCommandBuilder, Client } from 'discord.js';
import { SlashCommand } from '../../types';

const pause: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song'),
    run: async (client: Client, interaction: any) => {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue)
            return await interaction.reply({
                content: '❌ | No music is being played!',
                ephemeral: true,
            });

        if (queue.playing) {
            const success = queue.setPaused(true);
            return await interaction.editReply({
                content: success
                    ? '⏸ | Paused the music!'
                    : '❌ | Something went wrong!',
                ephemeral: true,
            });
        } else if (!queue.playing) {
            const success = queue.setPaused(false);
            return await interaction.editReply({
                content: success
                    ? '▶ | Resumed the music!'
                    : '❌ | Something went wrong!',
                ephemeral: true,
            });
        } else {
            return await interaction.editReply({
                content: '❌ | Something went wrong!',
                ephemeral: true,
            });
        }
    },
};

export default pause;
