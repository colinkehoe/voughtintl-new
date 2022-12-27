

module.exports = {
    run: async ({ client, guild, user }) => {
        const channel = guild.channels.cache.get('963968548559015936');
        if (!channel)
            channel = guild.channels.cache.get('983975999433760778');
        
        const banEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('Member has been banned')
            .setDescription(`${user.tag} has been banned from the server.}`)
            .setFooter({ text: `User ID: ${user.id}`, iconURL: user.avatarURL() })
            .setTimestamp();
        
        const dmEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('You have been banned')
            .setDescription(`You have been banned from ${guild.name}.}`)
            .setFooter({ text: `Server ID: ${guild.id}`, iconURL: guild.iconURL() })
            .setTimestamp();
        
        await channel.send({ embeds: [banEmbed] });
        await user.send({ embeds: [dmEmbed] });
    }
}