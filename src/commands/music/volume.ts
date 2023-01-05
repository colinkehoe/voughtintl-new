import { Client, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const volume: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Change the volume of the music.")
        .addIntegerOption((option) =>
            option
                .setName("level")
                .setDescription("The volume level to set.")
                .setRequired(true)
        ),
    run: async (client: Client, interaction: any) => {
        const queue = client.player.getQueue(interaction.guildId);
        const level = interaction.options.getInteger("level");

        if (level > 100 || level < 0 || !level)
            return interaction.editReply({
                content: "You must set a volume between 0 and 100.",
                ephemeral: true,
            });
        if (!queue || !queue.playing)
            return interaction.editReply("There is no music playing!");

        const success = queue.setVolume(level);
        success
            ? await interaction.editReply(`Volume set to ${level}.`)
            : await interaction.editReply(
                  "There was an error setting the volume."
              );
    },
};

export default volume;
