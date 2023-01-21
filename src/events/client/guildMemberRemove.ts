import { Client, GuildMember } from 'discord.js';
import { Event } from '../../types';

const guildMemberRemove: Event = {
    name: 'guildMemberRemove',
    run: async (client: Client, member: GuildMember) => {
        console.log(`User ${member.user.username} left the guild ${member.guild.name}. 
                   \nUser ID: (${member.user.id}) 
                   \nGuild ID: (${member.guild.id})`);
    }
}