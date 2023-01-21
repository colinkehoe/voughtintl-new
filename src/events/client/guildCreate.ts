import { Client, Guild } from 'discord.js';
import { Event } from '../../types';

const guildCreate: Event = {
    name: 'guildCreate',
    run: async (client: Client, guild: Guild) => {
        console.log(`Joined guild ${guild.name} -- ID: (${guild.id})`);
    },
};

export default guildCreate;
