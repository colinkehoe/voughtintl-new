const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleembed")
    .setDescription("Creates a role embed"),
  run: async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Vought International",
        iconURL: client.user.avatarURL,
      })
      .setTitle("Roles")
      .setDescription("React to this message to get a role!")
      .addFields({
        name: "The Boys News",
        value: `Pings for updates in the server.`,
      })
      .addFields({
        name: "Server News",
        value: `Pings for updates in the server.`,
      })
      .addFields({
        name: "Giveaways",
        value: `Pings for giveaways in the server.`,
      })
      .addFields({
        name: "Spoiler Friendly",
        value: `Shows you are open to spoilers. Gives access to #s4-spoilers for set leaks and discussion.`,
      })
      .setFooter({
        text: `Unreact to get the role removed.`,
        iconUrl: client.user.avatarURL,
      })
      .setColor("#FF0000")
      .setTimestamp();
    const msg = await interaction.channel.send({ embeds: [embed] });
    interaction.editReply(
      "Role Embed Created! You can now delete this message."
    );

    await msg.react("📰");
    await msg.react("📢");
    await msg.react("🎉");
    await msg.react("🚫");
  },
};
