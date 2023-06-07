import { Client, Events, GuildMember, EmbedBuilder, ChannelType } from 'discord.js';
import { Event } from '../../types';

const guildMemberAdd: Event = {
    name: Events.GuildMemberAdd,
    run: async (client: Client, member: GuildMember) => {
        console.log(`User ${member.user.username} joined the guild ${member.guild.name}. 
                   \nUser ID: (${member.user.id}) 
                   \nGuild ID: (${member.guild.id})`);
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Vought International`, iconURL: client.user?.avatarURL()! })
            .setTitle(`Welcome to ${member.guild.name}!`)
            .setDescription(`Welcome to ${member.guild.name}, ${member.user.username}!`)
            .setColor('Random')
            .setTimestamp()
            .setFooter({ text: `Guild: ${member.guild.name} | ID: ${member.guild.id}` });
        
        const welcome = await member.guild.channels.cache.find((channel) => {
            return channel.name === 'welcome';
        })

        if (!welcome)
            return;
        if (welcome.type !== ChannelType.GuildText)
            return console.log(`Channel ${welcome.name} is not a text channel.`);

        welcome.send({ embeds: [embed] });
    }
}

export default guildMemberAdd;