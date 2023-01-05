module.exports = {
  run: async ({ client, reaction, user }) => {
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
          .roles.remove("The Boys News");
      }
      if (reaction.emoji.name === "📢") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove("Server News");
      }
      if (reaction.emoji.name === "🎉") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove("Giveaways");
      }
      if (reaction.emoji.id === "🚫") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove("Spoiler Friendly");
      }
    } else {
      return;
    }
  },
};
