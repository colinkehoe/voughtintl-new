/*
*            Fresca Command:
*            -Creates a poll that can be reacted to.
*            -Poll will ask members of the server if they think the user should be given the fresca role.
*            -If the user has already been given a role, they will be insulted.
*            -If the user has not been given a role, they will be subject to a vote.
*            -If the user receives a majority of votes, they will be given the fresca role.
*            -If the user does not receive a majority of votes, they will be given the no fresca role as a jab.
*/

const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fresca')
        .setDescription('Create a poll'),
    run: async ({ client, interaction }) => {

        const user = interaction.member;

        if (!user.roles.cache.find(r => r.name === 'Fresca') && !user.roles.cache.find(r => r.name === 'No Fresca')) {                              //check if user has fresca role
            
            const embed = new EmbedBuilder()                                                                                                        //create embed
                .setTitle('Fresca Poll')
                .setDescription(`Should we welcome ${interaction.user.tag} to the Church of the Collective?`)
                .setFooter({ text: 'React to vote' })
                .setColor('#FF0000');
            const poll = await interaction.editReply({ embeds: [embed] });
            await poll.react('👍');
            await poll.react('👎');

            const filter = (reaction) => {                                                                                                          //create reaction filter: only allow 👍 and 👎
                return reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
            }
            let collector = poll.createReactionCollector({ filter,                                                                                  //create reaction collector for 24 hours
                time: 10000
            });
            
            collector.on('collect', r => {                                                                                                          //log reactions           
                console.log(`Collected ${r.emoji.name} from ${r.users.cache.last().tag}`)
            });
            collector.on('end', collected => {                                                                                                      //log collected reactions           
                console.log('Collected ' + collected.size + ' reactions.');

                let votesYes = 0;
                let votesNo = 0;
                collected.forEach(r => {                                                                                                            //count votes           
                    if (r.emoji.name === '👍') {
                        votesYes = r.count - 1;
                    } 
                    else if (r.emoji.name === '👎') {
                        votesNo = r.count - 1;
                    }
                });

                if (votesyes > votesno) {
                    user.roles.add('Fresca');                                                                                                       //give fresca role if user has majority of votes
                    interaction.channel.send(`Congratulations ${interaction.user.tag}, you have been deemed worthy of the Fresca role.`);
                }
                else {
                    user.roles.add('No Fresca');                                                                                                    //give no fresca role if user does not have majority of votes
                    interaction.channel.send(`Sorry ${interaction.user.tag}, you have been deemed unworthy of the Fresca role. Have the No Fresca role as punishment.`);
                }
            });
        } else {
            await interaction.editReply('You already have a role. Wait your turn.');                                                                //insult user if they have a role
        }
    }
}