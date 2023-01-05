import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from "discord.js";
import { SlashCommand } from "../../types";

const shuffle: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffle the current queue."),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) {
            console.log(
                `#${interaction.user.tag} has tried to issue a command in DMs.`
            );
            return interaction.editReply("You can't use this command in DMs!");
        }
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing)
            return interaction.editReply("There is no music playing!");

        const success = queue.shuffle();
        success
            ? await interaction.editReply({
                  embeds: [
                      new EmbedBuilder()
                          .setAuthor({
                              name: "Voughtify",
                              iconURL: client.user?.avatarURL()!,
                          })
                          .setTitle("Queue Shuffled")
                          .setDescription("Shuffled the queue!")
                          .setFooter({
                              text: `Shuffled by ${interaction.user.tag}`,
                              iconURL: interaction.user?.avatarURL()!,
                          })
                          .setTimestamp(),
                  ],
              })
            : await interaction.editReply(
                  "There was an error shuffling the queue."
              );
    },
};

export default shuffle;
