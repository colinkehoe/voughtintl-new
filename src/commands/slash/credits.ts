import { SlashCommandBuilder, EmbedBuilder, Client } from "discord.js";
import { SlashCommand } from "../../types";

const credits: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("credits")
        .setDescription("View the credits for the bot"),
    run: async (client: Client, interaction: any) => {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "Vought International",
                iconURL: client.user?.avatarURL()!,
            })
            .setTitle("Credits")
            .addFields({ name: "Developer", value: "colinkehoe#8735" })
            .addFields({
                name: "Donate",
                value: "[My PayPal](https://www.paypal.com/paypalme/colinkehoedev)",
            })
            .addFields({ name: "Contributors", value: "Borgninja#0042" })
            .addFields({ name: "Special Thanks", value: "None" })
            .setFooter({ text: "Created under MIT License" })
            .setColor("#FF0000");
        interaction.editReply({ embeds: [embed] });
    },
};

export default credits;
