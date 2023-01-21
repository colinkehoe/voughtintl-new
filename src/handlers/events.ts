import { Client, ChatInputCommandInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import { Event } from '../types';
import { color_text } from '../utils/utils';

module.exports = (client: Client) => {
    console.log('\nLoading events...');
    const eventFiles = readdirSync('./dist/events/client').filter((file) =>
        file.endsWith('.js')
    );
    for (const file of eventFiles) {
        if (!file.endsWith('.js')) continue;
        process.stdout.write(`Loading event: ${file}... `);
        try {
            const event: Event = require(`../events/client/${file}`).default;
            event.once
                ? client.once(event.name, (...args) =>
                      event.run(client, ...args)
                  )
                : client.on(event.name, (...args) => {
                      console.log(`New event: ${event.name}`);
                      event.run(client, ...args);
                  });
        } catch (error) {
            console.log(
                color_text(
                    'red',
                    '\nThere was an error loading this event!\n'
                ) + color_text('yellow', error)
            );
            process.exit();
        } finally {
            console.log(color_text('green', 'Success'));
        }
    }
};
