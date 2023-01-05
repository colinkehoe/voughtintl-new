import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    GuildMember,
} from "discord.js";
import { SlashCommand } from "../../types";

/*
 *   @param { Client } client - The client object.
 *   @param { ChatInputCommandInteraction } interaction - The interaction issued.
 *   @returns { Promise<void> }
 */

const mute: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a user.")
        .addMentionableOption((option) =>
            option
                .setName("user")
                .setDescription("The user to mute.")
                .setRequired(true)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) {
            console.log(
                `#${interaction.user.tag} has tried to issue a command in DMs.`
            );
            return interaction.editReply("You can't use this command in DMs!");
        }

        const target: any = interaction.options.getMentionable("user", true);
        if (!target)
            return interaction.editReply("You must mention a user to mute!");
        if (target.id === interaction.user.id)
            return interaction.editReply("You can't mute yourself!");
        if (target.bot) return interaction.editReply("You can't mute me!");

        const member: GuildMember | undefined =
            await interaction.guild?.members.fetch(target.id);
        if (!member)
            return interaction.editReply(
                "That user is not a member of this server!"
            );
        if (!member.manageable)
            return interaction.editReply("I can't mute that user!");

        const mutedRole = interaction.guild?.roles.cache.find(
            (role) => role.name === "Muted"
        );
        if (!mutedRole)
            return interaction.editReply(
                "There is no muted role in this server!"
            );
        member.roles
            .add(mutedRole)
            .then(() => {
                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: "Voughtify",
                                iconURL: client.user?.avatarURL()!,
                            })
                            .setTitle("User Muted")
                            .setDescription(`${target} has been muted!`)
                            .setFooter({
                                text: `Muted by ${interaction.user.tag}`,
                                iconURL: interaction.user?.avatarURL()!,
                            })
                            .setTimestamp(),
                    ],
                });
            })
            .catch(() => {
                interaction.editReply("There was an error muting that user!");
            });
    },
};

export default mute;
