const Discord = require('discord.js');
const { GatewayIntentBits, Partials } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const Utils = require('./utils/utils.js');
const dotenv = require('dotenv');
dotenv.config();

const { Player } = require('discord-player');

const TOKEN = process.env.DISCORD_TOKEN;                                        //bot token
const CLIENT_ID = process.env.CLIENT_ID;                                        //bot client id

const LOAD_SLASH = process.argv[2] == 'load';                                   //check if load argument is issued
const TEST_API = process.argv[2] == 'test-api';
const GUILD_ID = process.argv[3];                                               //get guild id to push commands to     

const client = new Discord.Client({                                             //Client setup
    intents: 32767,
    partials: [Partials.Channel]
});
client.player = new Player(client, {
    setVolume: 20,
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

client.slashcommands = new Discord.Collection();
let commands = [];

const sourceFiles = fs.readdirSync('./src/commands');
for (const folder of sourceFiles) {
    const files = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));        //grab all commands
    for (const file of files) {
        const slashcmd = require(`./commands/${folder}/${file}`);                                          //push each command to JSON
        client.slashcommands.set(slashcmd.data.name, slashcmd);
        if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
    }
}

process.on('unhandledRejection', error => console.error('Unhandled promise rejection:', error));            //error handling
process.on('uncaughtException', error => console.error('Uncaught exception:', error));


if (TEST_API) {
    console.log('Testing Fandom API...');
    const test = Utils.fetchJSON('https://theboys.fandom.com/api/v1/Articles/Details?ids=50&titles=Butcher&abstract=500&width=200&height=200`');
    test.then((res) => {
        console.log(res);
        process.exit();
    })
}
else if (LOAD_SLASH) {
    console.log(`Deploying slash commands to ${TOKEN}...`);                                   //load slash commands if load argument is issued
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    rest.put(Discord.Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log('Slash commands loaded successfully.');
        process.exit();
    })
    .catch((err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
} else {                                                                                       //start bot if load argument is not issued
    client.on('ready', () => {
        console.log (`Logged in as ${client.user.tag}`);                                       //console log bot username      
    });
    client.on('interactionCreate', (interaction) => {
        async function handleCommand() {                                                       //handle slash commands             
            if (!interaction.isCommand()) return;
            const slashcmd = client.slashcommands.get(interaction.commandName);
            if (!slashcmd) interaction.reply('That is not a valid command!');

            await interaction.deferReply();
            await slashcmd.run({ client, interaction });
        }
        handleCommand();
    });

    client.on('interactionCreate', (interaction) => {
        async function handleButton() {
            if (!interaction.isButton()) return;
            const button = client.buttons.get(interaction.customId);
            if (!button) interaction.reply('That is not a valid button!');
            await interaction.deferReply();

            console.log('User clicked button: ' + interaction.customId);

            await button.run({ client, interaction });
        }
    })

    client.login(TOKEN);
}