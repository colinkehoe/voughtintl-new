const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  run: async ({ client, button, interaction }) => {
    const queue = client.player.getQueue(button.guildId);
    if (!queue)
      return button.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: "Voughtify", iconURL: client.user.avatarURL() })
            .setTitle("There is no music being played right now!")
            .setTimestamp(),
        ],
      });

    queue.destroy();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("queue")
        .datasetEmoji("📜")
        .setStyle(ButtonStyle.Primary)
    );

    return button.update({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "Voughtify", iconURL: client.user.avatarURL() })
          .setTitle("Stopped the music!")
          .setFooter({
            text: `Stopped by ${interaction.user.username}`,
            iconURL: interaction.user.avatarURL(),
          })
          .setTimestamp(),
      ],
    });
  },
};
