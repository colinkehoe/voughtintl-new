import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types';

const stop: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue.'),
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing)
            return await interaction.editReply('There is no music playing!');

        queue.destroy();
        await interaction.editReply('Music has been stopped.');
    },
};

export default stop;
