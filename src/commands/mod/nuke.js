/*
*               Nuke Command
*               -Removes all messages from a channel.
*               -If a number is specified, it will only remove that many messages.
*               -If no channel is specified, it will remove messages from the channel the command was sent in.
*               -Only users with the Vought Executives (Admins) role can use this command.
*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Remove all evidence')
        .addChannelOption(option => option.setName('channel').setDescription('Channel to nuke').setRequired(false))
        .addNumberOption(option => option.setName('number').setDescription('How far back to nuke the channel').setRequired(false)),
    run: async ({ client, interaction }) => {
        if (!interaction.member.roles.cache.find(r => r.name === 'Vought Executives (Admins)') || !interaction.member.roles.find(r => r.name === 'Overlord')) {
            interaction.editReply('Why are you trying to nuke the channel? Say something rude?');
            return;
        }
        
        const channel = interaction.options.getChannel('channel') ?? interaction.channel;
        const number = interaction.options.getNumber('number') ?? 'whole';

        if (number === 'whole') {
            const messages = await channel.messages.fetch();
            await channel.bulkDelete(messages, true);
            channel.send(`Nuked #${channel.name}.`);
            return;
        } else {
            const messages = await channel.messages.fetch({ limit: number });
            await channel.bulkDelete(messages, true);
            channel.send(`Nuked ${number} messages in #${channel.name}.`);
            return;
        }
    }
}