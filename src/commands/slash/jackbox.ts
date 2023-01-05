import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../types";

const jackbox: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("jackbox")
        .setDescription("View upcoming Jackbox times."),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        await interaction.editReply("Jackbox times coming soon!");
    },
};

export default jackbox;