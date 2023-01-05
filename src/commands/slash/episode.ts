import {
    Client,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from "discord.js";
import { SlashCommand, SeasonInfo } from "../../types";
import { fetch_JSON } from "../../utils/utils";

const episode: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("episode")
        .setDescription("Get information about each episode of The Boys")
        .addNumberOption((option) =>
            option
                .setName("season")
                .setDescription("The season number")
                .addChoices(
                    {
                        name: "Season 1",
                        value: 1,
                    },
                    {
                        name: "Season 2",
                        value: 2,
                    },
                    {
                        name: "Season 3",
                        value: 3,
                    }
                )
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("episode")
                .setDescription("The episode number")
                .addChoices(
                    {
                        name: "Episode 1",
                        value: 1,
                    },
                    {
                        name: "Episode 2",
                        value: 2,
                    },
                    {
                        name: "Episode 3",
                        value: 3,
                    },
                    {
                        name: "Episode 4",
                        value: 4,
                    },
                    {
                        name: "Episode 5",
                        value: 5,
                    },
                    {
                        name: "Episode 6",
                        value: 6,
                    },
                    {
                        name: "Episode 7",
                        value: 7,
                    },
                    {
                        name: "Episode 8",
                        value: 8,
                    }
                )
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const season: number | null = interaction.options.getNumber("season"); //Get user input
        const episode: number | null = interaction.options.getNumber("episode");

        const seasonsAPI = encodeURI(
            `http://api.tvmaze.com/shows/15299/seasons`
        ); //get season data
        const seasons = await fetch_JSON(seasonsAPI);
        const seasonsArray = seasons.map(
            (season: SeasonInfo.Season) => season.id
        );
        const seasonSummaries = seasons.map((season: SeasonInfo.Season) =>
            season.summary.replace(/<\/?[^>]+>/gi, "")
        );
        const seasonImages = seasons.map((season: SeasonInfo.Season) => {
            const href = season.image!.original;
            if (!href)
                return "https://static.tvmaze.com/uploads/images/medium_portrait/0/1.jpg";
            else return href;
        });

        const episodesAPI = encodeURI(
            `http://api.tvmaze.com/seasons/${
                seasonsArray[season! - 1]
            }/episodes`
        ); //individual episode data
        const episodesJSON = await fetch_JSON(episodesAPI);
        const episodeNames = episodesJSON.map(
            (episode: SeasonInfo.Episode) => episode.name
        );
        const episodeDescriptions = episodesJSON.map(
            (episode: SeasonInfo.Episode) =>
                episode.summary.replace(/<\/?[^>]+>/gi, "")
        );
        const episodeImages = episodesJSON.map(
            (episode: SeasonInfo.Episode) => {
                const href = episode.image!.original;
                if (!href)
                    return "https://static.tvmaze.com/uploads/images/medium_portrait/0/1.jpg";
                else return href;
            }
        );
        const episodeRuntimes = episodesJSON.map(
            (episode: SeasonInfo.Episode) => episode.runtime.toString()
        );
        let episodeAirDates = episodesJSON.map(
            (episode: SeasonInfo.Episode) => episode.airdate
        );
        const episodeRating = episodesJSON.map((episode: SeasonInfo.Episode) =>
            episode.rating.average!.toString()
        );

        if (!episode) {
            const embed = new EmbedBuilder()
                .setTitle(`Season ${season}`)
                .setDescription(seasonSummaries[season! - 1])
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
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .setThumbnail(seasonImages[season! - 1])
                .setColor(0x00ff00);
            interaction.editReply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Season ${season}, Episode ${episode}` })
                .setTitle(`${episodeNames[episode - 1]}`)
                .addFields({
                    name: "Episode Summary",
                    value: episodeDescriptions[episode - 1],
                })
                .addFields({
                    name: "Episode Duration",
                    value: episodeRuntimes[episode - 1] + " minutes",
                })
                .addFields({
                    name: "Episode Air Date",
                    value: episodeAirDates[episode - 1],
                })
                .addFields({
                    name: "Episode Rating",
                    value: episodeRating[episode - 1],
                })
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .setThumbnail(episodeImages[season! - 1])
                .setColor(0x00ff00);
            interaction.editReply({ embeds: [embed] });
        }
    },
};

export default episode;
