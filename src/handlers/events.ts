import { Client, ChatInputCommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import { Event } from "../types";

module.exports = (client: Client) => {
    console.log("Loading events...");
    const eventFiles = readdirSync("./dist/events/client").filter((file) =>
        file.endsWith(".js")
    );
    for (const file of eventFiles) {
        if (!file.endsWith(".js")) continue;
        const event: Event = require(`../events/client/${file}`).default;
        event.once
            ? client.once(event.name, (...args) => event.run(client, ...args))
            : client.on(event.name, (...args) => {
                  console.log(`New event: ${event.name}`);
                  event.run(client, ...args);
              });
        console.log(`Loaded event: ${event.name}`);
    }
};
