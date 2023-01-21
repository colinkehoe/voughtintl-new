import { Client, Interaction } from 'discord.js';
import { Event } from '../../types';
import { color_text } from '../../utils/utils';

const ready: Event = {
    name: 'ready',
    once: true,
    run: async (client: Client, interaction?: Interaction) => {
        console.log(
            color_text('blue', `\nLogged in as ${client.user?.tag}!`) +
                color_text(
                    'green',
                    `\nReady to serve ${client.guilds.cache.size} servers!`
                )
        );
    },
};

export default ready;
