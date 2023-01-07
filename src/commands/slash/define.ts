import { SlashCommandBuilder, EmbedBuilder, Client } from 'discord.js';
import { SlashCommand } from '../../types';
import UrbanDictionary from 'urban-dictionary';

const define: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Define a word')
        .addBooleanOption((option) =>
            option
                .setName('random')
                .setDescription('Get a random word')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('word')
                .setDescription('The word to define')
                .setRequired(false)
        ),
    run: async (client: Client, interaction: any) => {
        const random = interaction.options.getBoolean('random');
        const word = interaction.options.getString('word');

        if (!random && !word) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: 'Urban Dictionary',
                    iconURL: 'https://i.imgur.com/1ZQ2Z9r.png',
                })
                .setDescription(
                    `Please provide a word, or use the 'random' option.`
                )
                .setColor('#ff0000')
                .setTimestamp()
                .setFooter({
                    text: `Powered by Urban Dictionary | Requested by ${interaction.user.username}`,
                });
        }

        if (random) {
            UrbanDictionary.random((error: any, entries: any) => {
                if (error) {
                    return interaction.editReply(
                        `An error occurred while fetching a random word.`
                    );
                }
                let definition = entries[0].definition.replace(/[\[\]']+/g, '');
                let example = entries[0].example;
                let author = entries[0].author;
                let thumbsUp = entries[0].thumbs_up;
                let thumbsDown = entries[0].thumbs_down;

                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: 'Urban Dictionary',
                        iconURL: 'https://i.imgur.com/1ZQ2Z9r.png',
                    })
                    .setTitle(entries[0].word)
                    .setDescription(definition)
                    .addFields({ name: 'Example', value: example })
                    .addFields({ name: 'Author', value: author })
                    .addFields({
                        name: 'Votes',
                        value: `${thumbsUp} 👍 | ${thumbsDown} 👎`,
                    })
                    .setColor(0x00ff00)
                    .setTimestamp()
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    });
                interaction.editReply({ embeds: [embed] });
            });
        } else {
            UrbanDictionary.define(word, (error: any, entries: any) => {
                if (error)
                    return interaction.editReply(
                        `An error occurred while fetching the definition of ${word}.`
                    );

                let entryword = entries[0].word;
                let definition = entries[0].definition.replace(/[\[\]']+/g, '');
                let example = entries[0].example;
                let author = entries[0].author;
                let thumbsUp = entries[0].thumbs_up;
                let thumbsDown = entries[0].thumbs_down;

                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: 'Urban Dictionary',
                        iconURL: 'https://i.imgur.com/1ZQ2Z9r.png',
                    })
                    .setTitle(entryword)
                    .setDescription(definition)
                    .addFields({ name: 'Example', value: example })
                    .addFields({ name: 'Author', value: author })
                    .addFields({
                        name: 'Votes',
                        value: `${thumbsUp} 👍 | ${thumbsDown} 👎`,
                    })
                    .setColor(0x00ff00)
                    .setTimestamp()
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    });
                interaction.editReply({ embeds: [embed] });
            });
        }
    },
};

export default define;
