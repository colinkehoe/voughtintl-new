const { EmbedBuilder } = require('discord.js');

module.exports = {
    run: async ({ client, member }) => {
        const channel = member.guild.channels.cache.get('963968548559015936');
        if (!channel)
            channel = member.guild.channels.cache.get('983975999433760778');
        
        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('Welcome!')
            .setDescription(`Welcome to the server ${member.user.tag}!}`)
            .addFields({ name: 'Server Population', value: `${member.guild.memberCount} members` })
            .setFooter({ text: `User ID: ${member.user.id}`, iconURL: member.user.avatarURL() })
            .setTimestamp();
        
    }
}