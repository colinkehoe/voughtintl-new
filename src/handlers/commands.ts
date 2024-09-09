import { Client, Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { readdirSync } from 'fs';
import { SlashCommand, Command } from '../types';
import { color_text } from '../utils/utils';

module.exports = (client: Client) => {
    const slashCommands: SlashCommandBuilder[] = [];
    const commands: Command[] = [];

    //Load slash commands
    readdirSync('./dist/slash')
        .filter((folder) => !folder.endsWith('.DS_Store'))
        .forEach((folder) => {
            readdirSync(`./dist/slash/${folder}`)
                .filter((file) => !file.endsWith('.DS_Store'))
                .forEach((file) => {
                    const command: SlashCommand =
                        require(`../slash/${folder}/${file}`).default;
                    process.stdout.write(
                        `Loading slash command '${command.data.name}'...`
                    );
                    try {
                        slashCommands.push(command.data);
                        client.slashCommands.set(command.data.name, command);
                    } catch (error: any) {
                        console.log(
                            color_text(
                                'red',
                                '\nhere was an error loading this slash command!\n'
                            ) + color_text('yellow', error)
                        );
                        process.exit();
                    } finally {
                        console.log(color_text('green', ' Success'));
                    }
                });
        });

    /*
    //Load normal commands
    readdirSync('./dist/commands')
        .filter((folder) => !folder.endsWith('.DS_Store'))
        .forEach((folder) => {
            readdirSync(`./dist/commands/${folder}`)
                .filter((file) => !file.endsWith('.DS_Store'))
                .forEach((file) => {
                    const command: Command =
                        require(`../commands/${folder}/${file}`).default;
                    console.log(`Loading command '${command.name}'...`);
                    commands.push(command);
                    client.commands.set(command.name, command);
                });
        });
        */

    //create REST and then register slash commands to the Discord API
    const rest = new REST({ version: '10' }).setToken(
        process.env.DISCORD_TOKEN!
    );
    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), {
        body: slashCommands.map((command) => command.toJSON()),
    })
        .then((data: any) => {
            console.log(
                color_text(
                    'green',
                    `Successfully registered ${data.length} slash commands.`
                )
            );
        })
        .catch((error: any) => {
            console.log(
                color_text(
                    'red',
                    'There was an error registering slash commands!\n'
                ) + color_text('yellow', error)
            );
        });
};
