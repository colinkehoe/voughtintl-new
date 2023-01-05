const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  run: async ({ client, reaction, user }) => {
    console.log(`${user.username} has reacted to a message...`);
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (
      reaction.message.channel.id == "765807931408777236" ||
      reaction.message.channel.id == "998044358903349349"
    ) {
      if (reaction.emoji.name === "📰") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add("The Boys News");
      }
      if (reaction.emoji.name === "📢") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add("Server News");
      }
      if (reaction.emoji.name === "🎉") {
        console.log(`${user.username} has requested the Giveaways role.`);
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add("Giveaways");
      }
      if (reaction.emoji.id === "🚫") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add("Spoiler Friendly");
      }
    }

    if (reaction.message.channel.name === "30") {
      console.log(reaction.message);
      //if (reaction.message.author.id === user.id) return reaction.users.remove(user.id);
      if (reaction.message.author.bot) return reaction.users.remove(user.id);
      if (reaction.count < 1) return;
      const pinboard = reaction.message.guild.channels.cache.find(
        (channel) => channel.name === "30-pin"
      );
      if (!pinboard) return;
      let content = reaction.message.content;
      if (content.length <= 0) content = "No text content.";
      let embed = new EmbedBuilder()
        .setAuthor({
          name: "Vought International",
          iconURL: client.user.avatarURL(),
        })
        .setTitle("Pinned Message")
        .setDescription(content)
        .addFields({
          name: "Author",
          value: reaction.message.author.tag,
          inline: true,
        })
        .addFields({
          name: "Channel",
          value: reaction.message.channel.name,
          inline: true,
        })
        .setTimestamp()
        .setFooter({
          text: `⭐ ${reaction.count} | Message ID: ${reaction.message.id}`,
          iconURL: reaction.message.author.avatarURL(),
        });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Jump to Message")
          .setURL(reaction.message.url)
      );
      if (reaction.message.attachments.size > 1) {
        embed.setImage(reaction.message.attachments.first().proxyURL);
      }
      const fetched = await pinboard.messages.fetch({ limit: 100 });
      const existing = fetched.find(
        (fetchedMessage) =>
          fetchedMessage.embeds.length === 1 &&
          fetchedMessage.embeds[0].footer.text.startsWith("⭐") &&
          fetchedMessage.embeds[0].footer.text.endsWith(reaction.message.id)
      );
      if (existing) {
        const foundStar = existing.embeds[0].footer.text.split("⭐")[1].trim();
        const image = existing.embeds[0].image
          ? existing.embeds[0].image.proxyURL
          : "";
        let embed = new EmbedBuilder()
          .setAuthor({
            name: "Vought International",
            iconURL: client.user.avatarURL(),
          })
          .setTitle("Message pinned")
          .setDescription(reaction.message.content)
          .addFields(
            {
              name: "Author",
              value: reaction.message.author.tag,
              inline: true,
            },
            { name: "Channel", value: reaction.message.channel, inline: true }
          )
          .setTimestamp()
          .setFooter({
            text: `⭐ ${parseInt(foundStar) + 1} | ${reaction.message.id}`,
            iconURL: reaction.message.author.avatarURL(),
          });
        if (image) embed.setImage(image);
        return existing.edit({ embeds: [embed] });
      } else {
        return pinboard.send({ embeds: [embed], components: [row] });
      }
    }

    if (reaction.emoji.name === "⭐") {
      console.log(reaction.message);
      //if (reaction.message.author.id === user.id) return reaction.users.remove(user.id);
      if (reaction.message.author.bot) return reaction.users.remove(user.id);
      if (reaction.count < 1) return;
      const pinboard = reaction.message.guild.channels.cache.find(
        (channel) => channel.name === "pin-board"
      );
      if (!pinboard) return;
      let content = reaction.message.content;
      if (content.length <= 0) content = "No text content.";
      let embed = new EmbedBuilder()
        .setAuthor({
          name: "Vought International",
          iconURL: client.user.avatarURL(),
        })
        .setTitle("Pinned Message")
        .setDescription(content)
        .addFields({
          name: "Author",
          value: reaction.message.author.tag,
          inline: true,
        })
        .addFields({
          name: "Channel",
          value: reaction.message.channel.name,
          inline: true,
        })
        .setTimestamp()
        .setFooter({
          text: `⭐ ${reaction.count} | Message ID: ${reaction.message.id}`,
          iconURL: reaction.message.author.avatarURL(),
        });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Jump to Message")
          .setURL(reaction.message.url)
      );
      if (reaction.message.attachments.size > 2) {
        embed.setImage(reaction.message.attachments.first().proxyURL);
      }
      const fetched = await pinboard.messages.fetch({ limit: 100 });
      const existing = fetched.find(
        (fetchedMessage) =>
          fetchedMessage.embeds.length === 1 &&
          fetchedMessage.embeds[0].footer.text.startsWith("⭐") &&
          fetchedMessage.embeds[0].footer.text.endsWith(reaction.message.id)
      );
      if (existing) {
        const foundStar = existing.embeds[0].footer.text.split("⭐")[1].trim();
        const image = existing.embeds[0].image
          ? existing.embeds[0].image.proxyURL
          : "";
        let embed = new EmbedBuilder()
          .setAuthor({
            name: "Vought International",
            iconURL: client.user.avatarURL(),
          })
          .setTitle("Message pinned")
          .setDescription(reaction.message.content)
          .addFields(
            {
              name: "Author",
              value: reaction.message.author.tag,
              inline: true,
            },
            { name: "Channel", value: reaction.message.channel, inline: true }
          )
          .setTimestamp()
          .setFooter({
            text: `⭐ ${parseInt(foundStar) + 1} | ${reaction.message.id}`,
            iconURL: reaction.message.author.avatarURL(),
          });
        if (image) embed.setImage(image);
        existing.edit({ embeds: [embed] });
      } else {
        pinboard.send({ embeds: [embed], components: [row] });
      }
    }
  },
};
