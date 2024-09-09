/*
 * Event: messageCreate
 ! Fires when a message is sent in any
 ! channel that the bot can see.
 ? This event is fired for every message sent.
*/


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
        
        if (message.content.toLowerCase().includes('daredevil') || message.content.toLowerCase().includes('matt murdock'))
        {
            message.reply('<@450671008505004053>');
        }
        
        return console.log(`Message sent by ${message.author.username} in ${message.guild?.name} (${message.guild?.id})`);
    }
}

export default messageCreate;