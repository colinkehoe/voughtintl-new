import { Client, Events, Message } from 'discord.js';
import { Event } from '../../types';

const messageCreate: Event = {
    name: Events.MessageCreate,
    run: async (client: Client, message: Message) => {
        if (message.author.bot) return;
        if (!message)
            return console.log(
                'There was an error with the message event. Message was undefined.'
            );
        
        return console.log(`Message sent by ${message.author.username} in ${message.guild?.name} (${message.guild?.id})`);
    }
}

export default messageCreate;