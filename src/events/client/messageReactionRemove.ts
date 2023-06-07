import {
    Client,
    GuildMember,
    MessageReaction,
    User,
    ChannelType,
    Message,
    GuildBasedChannel,
    EmbedBuilder,
    Events,
} from 'discord.js';
import { Event } from '../../types';

const messageReactionRemove: Event = {
    name: Events.MessageReactionRemove,
    run: async (client: Client, reaction: MessageReaction, user: User) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (
            reaction.message.channel.id == '765807931408777236' ||
            reaction.message.channel.id == '998044358903349349'
        ) {
            if (reaction.emoji.name === '📰') {
                await reaction.message.guild.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles
                            .remove('')
                            .then((member: GuildMember) => {
                                console.log(
                                    `Removed role from ${member.user.tag}`
                                );
                            })
                            .catch((error: Error) => console.log(error));
                    })
                    .catch((error: Error) => console.log(error));
            }
            if (reaction.emoji.name === '📢') {
                await reaction.message.guild.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles
                            .remove('')
                            .then((member: GuildMember) =>
                                console.log(
                                    `Removed role from ${member.user.tag}`
                                )
                            )
                            .catch((error: Error) => console.log(error));
                    })
                    .catch((error: Error) => console.log(error));
            }
            if (reaction.emoji.name === '🎉') {
                await reaction.message.guild.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles
                            .remove('')
                            .then((member: GuildMember) =>
                                console.log(
                                    `Removed role from ${member.user.tag}`
                                )
                            )
                            .catch((error: Error) => console.log(error));
                    })
                    .catch((error: Error) => console.log(error));
            }
            if (reaction.emoji.id === '🚫') {
                await reaction.message.guild.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles
                            .remove('')
                            .then((member: GuildMember) =>
                                console.log(
                                    `Removed role from ${member.user.tag}`
                                )
                            )
                            .catch((error: Error) => console.log(error));
                    })
                    .catch((error: Error) => console.log(error));
            }

            if (reaction.emoji.name === '⭐') {
                if (reaction.message.channel.type !== ChannelType.GuildText) {
                    return;
                }

                let pinboard: GuildBasedChannel | undefined =
                    reaction.message.channel.name === '30'
                        ? reaction.message.guild.channels.cache.find(
                              (channel) => {
                                  return channel.name === '30-pin';
                              }
                          )
                        : reaction.message.guild.channels.cache.find(
                              (channel) => {
                                  return channel.name === 'pin-board';
                              }
                          );
                if (!pinboard) return;
                if (pinboard?.type !== ChannelType.GuildText) return;

                let existing = await pinboard.messages
                    .fetch({ limit: 100 })
                    .then((messages) => {
                        try {
                            return messages.find((message: Message) => {
                                return (
                                    message.embeds[0]?.footer?.text ===
                                    reaction.message.id
                                );
                            });
                        } catch (error: any) {
                            console.log(error);
                            return;
                        }
                    })
                    .catch((error: Error) => console.log(error));

                if (existing) {
                    const star = existing.embeds[0].footer?.text
                        .split('⭐')[1]
                        .trim();

                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: 'Vought International',
                            iconURL: client.user?.avatarURL()!,
                        })
                        .setTitle('Message Pinned')
                        .setDescription(
                            `**${reaction.message.author}:** \n${reaction.message.content} \n\n In <#${reaction.message.channel.id}>`
                        )
                        .setTimestamp()
                        .setFooter({
                            text: `⭐ ${parseInt(star!) + 1} | Message ID: ${
                                reaction.message.id
                            }`,
                            iconURL: reaction.message.author?.avatarURL()!,
                        });
                    existing.edit({ embeds: [embed] });
                }
            }
        } else {
            return;
        }
    },
};

export default messageReactionRemove;
