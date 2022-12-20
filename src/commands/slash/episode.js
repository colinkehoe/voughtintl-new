const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Utils = require('../../utils/utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('episode')
        .setDescription('Get information about an episode of The Boys')
        .addNumberOption(option =>
            option
                .setName('season')
                .setDescription('The season of the episode')
                .addChoices(
                {
                    name: 'Season 1',
                    value: 1,
                },
                {
                    name: 'Season 2',
                    value: 2
                },
                {
                    name: 'Season 3',
                    value: 3
                })
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('episode')
                .setDescription('The episode number')
                .addChoices(
                {
                    name: 'Episode 1',
                    value: 1
                },
                {
                    name: 'Episode 2',
                    value: 2
                },
                {
                    name: 'Episode 3',
                    value: 3
                },
                {
                    name: 'Episode 4',
                    value: 4
                },
                {
                    name: 'Episode 5',
                    value: 6
                },
                {
                    name: 'Episode 6',
                    value: 6
                },
                {
                    name: 'Episode 7',
                    value: 7
                },
                {
                    name: 'Episode 8',
                    value: 8
                }
        ).setRequired(false)),
    run: async ({ client, interaction }) => {
        const season = interaction.options.getNumber('season');                                                 //Get user input
        const episode = interaction.options.getNumber('episode');

        const seasons_api = encodeURI(`http://api.tvmaze.com/shows/15299/seasons`);                             //get season data
        const seasons = await Utils.fetchJSON(seasons_api);
        const seasonsArray = seasons.map(season => season.id);
        const seasonSummaries = seasons.map(season => season.summary.replace(/<\/?[^>]+>/gi, ''));
        const seasonImages = seasons.map(season => season.image.original);

        const episodes_api = encodeURI(`http://api.tvmaze.com/seasons/${seasonsArray[season - 1]}/episodes`);               //individual episode data
        const episodesJSON = await Utils.fetchJSON(episodes_api);
        const episodeNames = episodesJSON.map(episode => episode.name);
        const episodeDescriptions = episodesJSON.map(episode => episode.summary.replace(/<\/?[^>]+>/gi, ''));
        const episodeImages = episodesJSON.map(episode => episode.image.original);
        const episodeRuntimes = episodesJSON.map(episode => episode.runtime.toString());
        let episodeAirDates = episodesJSON.map(episode => episode.airdate);
        const episodeRating = episodesJSON.map(episode => episode.rating.average.toString());

        if (!episode) {

            const embed = new EmbedBuilder()
                .setTitle(`Season ${season}`)
                .setDescription(seasonSummaries[season - 1])
                .addFields({
                    name: episodeNames[0],
                    value: episodeDescriptions[0],
                })
                .addFields({
                    name: episodeNames[1],
                    value: episodeDescriptions[1],
                })
                .addFields({
                    name: episodeNames[2],
                    value: episodeDescriptions[2],
                })
                .addFields({
                    name: episodeNames[3],
                    value: episodeDescriptions[3],
                })
                .addFields({
                    name: episodeNames[4],
                    value: episodeDescriptions[4],
                })
                .addFields({
                    name: episodeNames[5],
                    value: episodeDescriptions[5],
                })
                .addFields({
                    name: episodeNames[6],
                    value: episodeDescriptions[6],
                })
                .addFields({
                    name: episodeNames[7],
                    value: episodeDescriptions[7],
                })
                .setFooter({
                    text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setThumbnail(seasonImages[season - 1])
                .setColor(0x00ff00);
            interaction.editReply({ embeds: [embed] });
        }
        else {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Season ${season}, Episode ${episode}` })
                .setTitle(`${episodeNames[episode - 1]}`)
                .addFields({
                    name: 'Episode Summary',
                    value: episodeDescriptions[episode - 1]
                })
                .addFields({
                    name: 'Episode Duration',
                    value: episodeRuntimes[episode -1] + ' minutes'
                })
                .addFields({
                    name: 'Episode Air Date',
                    value: episodeAirDates[episode - 1]
                })
                .addFields({
                    name: 'Episode Rating',
                    value: episodeRating[episode - 1]
                })
                .setFooter({
                    text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setThumbnail(episodeImages[season - 1])
                .setColor(0x00ff00);
            interaction.editReply({ embeds: [embed] });
        }
    }
}