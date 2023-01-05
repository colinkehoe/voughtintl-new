import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from "discord.js";
import { SlashCommand } from "../../types";

const ping: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        console.log("Command running...");
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: "Vought International",
                        iconURL: client.user?.avatarURL()!,
                    })
                    .setTitle("Pong!")
                    .setDescription(
                        `Pong! The bot's latency is ${client.ws.ping} ms.`
                    )
                    .setFooter({
                        text: `Requested by ${interaction.user.username}`,
                        iconURL: interaction.user.avatarURL()!,
                    })
                    .setTimestamp(),
            ],
        });
    },
};

export default ping;
