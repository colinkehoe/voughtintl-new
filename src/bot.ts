/*
 * Project: Vought International
 ! Rebuilt from the ground up by Colin Kehoe
 ? This is the main file for the bot.
*/

import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { Player } from 'discord-player';
import { readdirSync } from 'fs';
import { config } from 'dotenv';
import { SlashCommand, Event, Command } from './types';
import { color_text } from './utils/utils';

process.env.FORCE_COLOR = 'true';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember,
        Partials.ThreadMember,
    ],
});
client.player = new Player(client, {
    smoothVolume: true,
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
    },
});

client.slashCommands = new Collection<string, SlashCommand>();
client.events = new Collection<string, Event>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

readdirSync('./dist/handlers')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        try {
            process.stdout.write(`\nLoading handler: ${file}...`);
            require(`./handlers/${file}`)(client);
        } catch (error: any) {
            console.log(
                color_text(
                    'red',
                    '\nThere was an error loading this handler!\n'
                ) + color_text('yellow', error)
            );
            process.exit();
        } finally {
            console.log(color_text('green', 'Successfully loaded handler.'));
        }
    });

client.login(process.env.DISCORD_TOKEN);

const guild = client.guilds.cache.get("983913934153195520");

    // This takes ~1 hour to update
client.application?.commands.set([]);
    // This updates immediately
guild?.commands.set([]);
