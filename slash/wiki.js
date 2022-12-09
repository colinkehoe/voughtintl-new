const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Utils = require('../utils.js');

let wiki = {
    url: 'the-boys.fandom.com',
    title: 'The Boys'
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Grab information from The Boys Wiki')
        .addStringOption(option => option.setName('query').setDescription('The term to search for').setRequired(true)),
    run: async ({ client, interaction }) => {
        const query = interaction.options.getString('query');

        const search_api = encodeURI(`https://${wiki.url}/api/v1/Search/List?query=${query}&limit=1`);
        const search = await Utils.fetchJSON(search_api);

        console.log('User has searched for ' + query + '.');

        if (search && search.items && search.items.length === 1)
            query = search.items[0].title;
        
        console.log(query);

        const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${query}&abstract=500&width=200&height=200`);
        const body = await Utils.fetchJSON(api);

        const article = Object.values(body.items)[0];

        if (!article) {
            const embed = new EmbedBuilder()
                .setTitle('No results found')
                .setDescription(`No results were found for "${query}" on the ${wiki.title} Wiki!`)
                .setColor(0xff0000)
                .setTimestamp()
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
            interaction.editReply({ embeds: [embed] });
        }
        else {
            const embed = new EmbedBuilder()
                .setTitle(article.title)
                .setURL(article.url)
                .setDescription(article.abstract)
                .setColor(0x00ff00)
                .setTimestamp()
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
            if (article.thumbnail)
                embed.setImage(article.thumbnail);
            interaction.editReply({ embeds: [embed] });
        }
    }  
}