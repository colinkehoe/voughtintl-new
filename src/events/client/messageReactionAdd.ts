import {
    Client,
    User,
    GuildMember,
    MessageReaction,
    TextChannel,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
} from 'discord.js';
import { Event } from '../../types';

const messageReactionAdd: Event = {
    name: Events.MessageReactionAdd,
    run: async (client: Client, reaction: MessageReaction, user: User) => {
        if (reaction.message.guild === null) return;
        const channel = reaction.message.channel;
        if (channel.type !== ChannelType.GuildText) {
            return;
        }
        if (user.bot) return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error(
                    'Something went wrong when fetching the message: ',
                    error
                );
                return;
            }
        }
        if (channel.name === 'Roles') {
            if (reaction.emoji.name === '📰') {
                reaction.message.guild?.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles.add('');
                    });
            } else if (reaction.emoji.name === '📢') {
                reaction.message.guild?.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles.add('');
                    });
            } else if (reaction.emoji.name === '🎉') {
                reaction.message.guild?.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles.add('');
                    });
            } else if (reaction.emoji.name === '🚫') {
                reaction.message.guild?.members
                    .fetch(user.id)
                    .then((member: GuildMember) => {
                        member.roles.add('');
                    });
            }
        }

        if (channel.name === '30') {
            if (reaction.emoji.name !== '⭐') return;
        }

        if (reaction.emoji.name === '⭐') {
            let pinboard = reaction.message.guild.channels.cache.find(
                (channel) => {
                    return channel.name === 'pin-board';
                }
            );
            if (pinboard === undefined) return;
            if (pinboard.type !== ChannelType.GuildText) return;
            if (reaction.count < 3) return;

            const fetched = await pinboard.messages.fetch({ limit: 100 });
            const existing = fetched.find(
                (fetchedMessage) =>
                    fetchedMessage.embeds.length === 1 &&
                    fetchedMessage.embeds[0].footer?.text.startsWith('⭐') &&
                    fetchedMessage.embeds[0].footer?.text.endsWith(
                        reaction.message.id
                    )
            );
            if (existing) {
                const star = existing.embeds[0].footer?.text
                    .split('⭐')[1]
                    .trim();
                const image = existing.embeds[0].image?.url;
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
                if (image) embed.setImage(image);
                const row: any = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('Jump to Message')
                        .setURL(reaction.message.url)
                );
                existing.edit({ embeds: [embed], components: [row] });
                return;
            }

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
                    text: `⭐ ${reaction.count} | Message ID: ${reaction.message.id}`,
                    iconURL: reaction.message.author?.avatarURL()!,
                });

            if (reaction.message.attachments.size > 1) {
                embed.setImage(reaction.message.attachments.first()!.proxyURL);
            }

            const row: any = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Jump to Message')
                    .setURL(reaction.message.url)
            );

            if (channel.name === '30') {
                pinboard = reaction.message.guild.channels.cache.find(
                    (channel) => {
                        return channel.name === '30-pin';
                    }
                );
                if (!pinboard) return console.log('No 30-pin channel found!');
                if (pinboard.type !== ChannelType.GuildText)
                    return console.log('30-pin channel is not a text channel!');
            }

            await pinboard?.send({ embeds: [embed], components: [row] });
        }
    },
};

export default messageReactionAdd;
