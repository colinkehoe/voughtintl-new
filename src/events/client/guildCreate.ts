/*
 * Event: guildCreate
 ! Emitted whenever the client joins a new guild.
*/

import { Client, Events, Guild } from 'discord.js';
import { Event } from '../../types';

const guildCreate: Event = {
    name: Events.GuildCreate,
    run: async (client: Client, guild: Guild) => {
        console.log(`Joined guild ${guild.name} -- ID: (${guild.id})`);
    },
};

export default guildCreate;
