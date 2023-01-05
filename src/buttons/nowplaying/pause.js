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

    queue.setPaused(true);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("resume")
        .setEmoji("▶️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("skip")
        .setEmoji("⏭️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("stop")
        .setEmoji("⏹️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("queue")
        .setEmoji("📜")
        .setStyle(ButtonStyle.Primary)
    );

    return button.update({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "Voughtify", iconURL: client.user.avatarURL() })
          .setTitle("Paused the music!")
          .setThumbnail(queue.current.thumbnail)
          .setDescription(
            `Currently playing: ${queue.current.author} -- [${queue.current.title}](${queue.current.url})`
          )
          .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: queue.current.requestedBy.avatarURL(),
          })
          .setTimestamp(),
      ],
      components: [row],
    });
  },
};
