import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Message
} from 'discord.js';
import { SlashCommand } from '../../types';

const roleEmbed: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('roleembed')
        .setDescription('Creates a role embed'),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Vought International',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Roles')
            .setDescription('React to this message to get a role!')
            .addFields({
                name: 'The Boys News',
                value: `Pings for updates in the server.`,
            })
            .addFields({
                name: 'Server News',
                value: `Pings for updates in the server.`,
            })
            .addFields({
                name: 'Giveaways',
                value: `Pings for giveaways in the server.`,
            })
            .addFields({
                name: 'Spoiler Friendly',
                value: `Shows you are open to spoilers. Gives access to #s4-spoilers for set leaks and discussion.`,
            })
            .setFooter({
                text: `Unreact to get the role removed.`,
                iconURL: client.user?.avatarURL()!,
            })
            .setColor('#FF0000')
            .setTimestamp();
        await interaction.channel
            ?.send({ embeds: [embed] })
            .then((msg: Message) => {
                msg.react('📰');
                msg.react('📢');
                msg.react('🎉');
                msg.react('🚫');
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

export default roleEmbed;
