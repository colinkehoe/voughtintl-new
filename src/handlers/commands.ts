import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";
import { SlashCommand, Command } from "../types";

module.exports = (client: Client) => {
    const SlashCommands: SlashCommandBuilder[] = [];
    const commands: Command[] = [];

    readdirSync("./dist/commands")
        .filter((folder) => !folder.endsWith(".DS_Store"))
        .forEach((folder) => {
            readdirSync(`./dist/commands/${folder}`)
                .filter((file) => !file.endsWith(".DS_Store"))
                .forEach((file) => {
                    const command: SlashCommand =
                        require(`../commands/${folder}/${file}`).default;
                    console.log(
                        `Loading slash command '${command.data.name}'...`
                    );
                    SlashCommands.push(command.data);
                    client.slashCommands.set(command.data.name, command);
                });
        });

    const rest = new REST({ version: "10" }).setToken(
        process.env.DISCORD_TOKEN!
    );

    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), {
        body: SlashCommands.map((command) => command.toJSON()),
    })
        .then((data: any) => {
            console.log(
                `Successfully registered ${data.length} slash commands.`
            );
        })
        .catch((error: any) => {
            console.log(error);
        });
};
