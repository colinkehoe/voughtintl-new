import { PermissionsBitField } from 'discord.js';
import { Command } from '../../types';

const addPartner: Command = {
    name: 'addpartner',
    aliases: ['addpartner', 'addp'],
    run: async (client, message, args) => {
        
    },
    permissions: [PermissionsBitField.Flags.ManageGuild]

}