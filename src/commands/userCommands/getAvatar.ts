import {
    Client,
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    UserContextMenuCommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { ContextMenuCommand } from '../../types';

const getAvatar: ContextMenuCommand = {
    data: new ContextMenuCommandBuilder()
        .setName('Get Avatar')
        .setType(ApplicationCommandType.User),
    run: async (
        client: Client,
        interaction: UserContextMenuCommandInteraction
    ) => {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Vought International',
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle('Get Avatar')
            .setImage(
                interaction.targetUser.displayAvatarURL({ dynamic: true })
            )
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user?.avatarURL()!,
            })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};

export default getAvatar;