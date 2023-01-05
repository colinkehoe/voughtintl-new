import { Client, ChatInputCommandInteraction, SlashCommandBuilder, GuildMember, Role } from "discord.js";
import { SlashCommand } from "../../types";

const kick: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user from this server")
        .addMentionableOption((option) =>
            option
                .setName("user")
                .setDescription("The user to kick")
                .setRequired(true)
    )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for kicking the user")
                .setRequired(false)),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guildId) {
            console.log("Command issued in invalid guild");
            return interaction.editReply(
                "This command can only be used in a guild!"
            );
        }

        const target: any = interaction.options.getMentionable("user", false);
        const kickReason: string = interaction.options.getString("reason") ?? 'No reason specified';
        if (!target)
            return interaction.editReply("Please specify a user to kick!");
        if (target.id === interaction.user.id)
            return interaction.editReply("You can't kick yourself!");
        if (target.bot)
            return interaction.editReply("You can't kick a bot!");

        const member: GuildMember | undefined = interaction.guild!.members.cache.get(target.id);
        if (!member)
            return interaction.editReply("The user is not in this server");
        if (!member.kickable)
            return interaction.editReply("I can't kick this user");
        
        const mod: GuildMember | undefined = interaction.guild!.members.cache.get(interaction.user.id);
        if (!mod)
            return interaction.editReply("You are not in this server");
        if (mod.roles.cache.some((role: Role) => {
            role.name === "Vought Executives (Admins)" ||
                role.name === "Vought Staff (Mods)" ||
                role.name === "Overlord";
        })) {
            await member.kick(kickReason).then(() => {
                console.log(`Kicked ${target.tag}`);
                interaction.editReply(`${interaction.user.tag} has kicked ${target.tag}`);
            }).catch((err) => {
                console.error(err);
            })
        }
        else {
            await interaction.editReply(
                "You don't have permission to kick this user"
            );
        }
    }
}

export default kick;