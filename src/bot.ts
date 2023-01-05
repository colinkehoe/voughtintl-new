import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { Player } from "discord-player";
import { readdirSync } from "fs";
import { config } from "dotenv";
import { SlashCommand, Event, Command } from "./types";

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
    ],
});
client.player = new Player(client, {
    smoothVolume: true,
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
});

client.slashCommands = new Collection<string, SlashCommand>();
client.events = new Collection<string, Event>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

readdirSync("./dist/handlers")
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
        console.log(`Loading handler: ${file}...`);
        require(`./handlers/${file}`)(client);
    });

client.login(process.env.DISCORD_TOKEN);
