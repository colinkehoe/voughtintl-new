const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boom')
        .setDescription('Boom!')
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('The user to blow up')
                .setRequired(true)
    ),
    run: async ({ client, interaction }) => {
        const target = interaction.options.getUser('target')

        if (target.bot)
            return interaction.editReply('You can\'t blow up a bot!');
        if (target.id === interaction.user.id)
            return interaction.editReply('You can\'t blow up yourself!');
        if (target.id === client.user.id)   
            return interaction.editReply('My protocols prevent me from blowing myself up!');
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Vought International', iconURL: client.user.avatarURL() })
            .setTitle('Boom!')
            .setDescription(`You blew up the head of ${target.tag}`)
            .setImage('https://cdn.hswstatic.com/gif/shc-update.jpg')
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        
        await interaction.editReply({ embeds: [embed] });
    }
}