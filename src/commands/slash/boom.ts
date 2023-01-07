import {
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
    IntegrationApplication,
} from 'discord.js';
import { SlashCommand } from '../../types';

const boom: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('boom')
        .setDescription('BOOM')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('The user to boom')
                .setRequired(true)
        ),
    run: async (client: Client, interaction: any) => {
        const target = interaction.options.getUser('target');

        if (target.bot)
            return interaction.editReply(`You can't try to blow up a bot!`);
        if (target.id === client.user?.id)
            return interaction.editReply(`You can't try to blow me up!`);
        if (target.id === interaction.user.id)
            return interaction.editReply(`You can't blow yourself up!`);

        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Vought International',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Boom!')
            .setDescription(`You blew up ${target.tag}!`)
            .setImage('https://cdn.hswstatic.com/gif/shc-update.jpg')
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.avatarURL(),
            })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};

export default boom;
