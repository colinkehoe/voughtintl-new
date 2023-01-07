import { Client, Interaction } from 'discord.js';
import { Event } from '../../types';

const ready: Event = {
    name: 'ready',
    once: true,
    run: async (client: Client, interaction?: Interaction) => {
        console.log(`Logged in as ${client.user?.tag}!`);
    },
};

export default ready;
