const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to mute')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for mute')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('The duration of the mute.')
                .setRequired(false)),
    run: async ({ client, interaction }) => {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason specified';
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getString('duration') ?? '24h';

        if (!interaction.member.roles.cache.find(r => r.name === 'Vought Executives (Admins)') &&
        !interaction.member.roles.cache.find(r => r.name === 'Vought Staff (Mods)') &&
        !interaction.member.roles.cache.find(r => r.name === 'Overlord'))
        {
            return interaction.editReply('Why are you trying to mute someone?');
        }  
        if (member.roles.cache.find(r => r.name === 'Vought Executives (Admins)') ||
            member.roles.cache.find(r => r.name === 'Vought Staff (Mods)') ||
            member.roles.cache.find(r => r.name === 'Overlord'))
        {
            return interaction.editReply('You can\'t mute an admin!');
        }
        
        member.roles.add('Muted');

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('User muted')
            .setDescription(`Muted ${user.tag} for ${reason}`)
            .setFooter({ text: `Muted by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
            .setColor(0xFF0000);
        
        const dmEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('You have been muted')
            .setDescription(`You have been muted for ${reason}`)
            .setFooter({ text: `Muted by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
            .setColor(0xFF0000);
        
        await user.send({ embeds: [dmEmbed] });
        await interaction.editReply({ embeds: [embed] });

    }
}