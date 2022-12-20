/*
*          Define:
*           - Define a word
*           - Get a random word
*           - Uses Urban Dictionary API
*           - Returns an embed with the definition
*/


const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UrbanDictionary = require('urban-dictionary');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Define a word')
        .addBooleanOption(option => 
            option
                .setName('random')
                .setDescription('Get a random word')
                .setRequired(false)
        )
        .addStringOption(option => 
            option
                .setName('word')
                .setDescription('The word to define')
                .setRequired(false)
    ),
    run: async ({ client, interaction }) => {
        const word = interaction.options.getString('word');                             // Get user input
        const random = interaction.options.getBoolean('random');

        console.log(`${interaction.user.tag} has searched for ${word}.`);

        if (!word && !random) {                                                                     //*Ensure user has entered correct parameters. If not, return error message and end
            interaction.editReply('You must provide a word to define!');
            return;
        }
        if (word && random) {
            interaction.editReply('You can\'t define a word and get a random word at the same time!');
            return;
        }

        if (random) {                                                                                       //?handle random word
            UrbanDictionary.random((error, entries) => {
                if (error) {
                    interaction.editReply('An error occurred trying to define that word.');
                }
                else {
                    const definition = entries[0].definition.replace(/[\[\]']+/g,'');
                    const example = entries[0].example;
                    const author = entries[0].author;
                    const thumbsUp = entries[0].thumbs_up;
                    const thumbsDown = entries[0].thumbs_down;
                    
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: 'Urban Dictionary', iconURL: "https://i.imgur.com/1ZQ2Z9r.png" })
                        .setTitle(entries[0].word)
                        .setDescription(definition)
                        .addFields({ name: 'Example', value: example })
                        .addFields({ name: 'Author', value: author })
                        .addFields({ name: 'Votes', value: `${thumbsUp} 👍 | ${thumbsDown} 👎` })
                        .setColor(0x00ff00)
                        .setTimestamp()
                        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                    interaction.editReply({ embeds: [embed] });
                }
            })
        }
        else {                                                                                              //?handle user input               
            UrbanDictionary.define((word), (error, entries) => {
                if (error) {
                    interaction.editReply('An error occurred trying to define that word.');
                }
                else {
                    entryword = entries[0].word;
                    definition = entries[0].definition.replace(/[\[\]']+/g,'');
                    example = entries[0].example;
                    author = entries[0].author;
                    thumbsUp = entries[0].thumbs_up;
                    thumbsDown = entries[0].thumbs_down;
                }

                const embed = new EmbedBuilder()
                        .setAuthor({ name: 'Urban Dictionary', iconURL: "https://i.imgur.com/1ZQ2Z9r.png"})
                        .setTitle(entryword)
                        .setDescription(definition)
                        .addFields({ name: 'Example', value: example })
                        .addFields({ name: 'Author', value: author })
                        .addFields({ name: 'Votes', value: `${thumbsUp} 👍 | ${thumbsDown} 👎` })
                        .setColor(0x00ff00)
                        .setTimestamp()
                        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                interaction.editReply({ embeds: [embed] });
            })
        }
    }
}