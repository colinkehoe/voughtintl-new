import { Interaction, Client } from 'discord.js';
import { Event } from '../../types';

const interactionCreate: Event = {
    name: 'interactionCreate',
    run: async (client: Client, interaction: any) => {
        if (interaction.isUserContextMenuCommand()) {
            if (!interaction.isCommand()) return;

            await interaction
                .deferReply()
                .then(() =>
                    console.log('Interaction reply has been deferred.')
                );

            const command = interaction.client.slashCommands.get(
                interaction.commandName
            );
            let cooldown = interaction.client.cooldowns.get(
                `${interaction.commandName}-${interaction.user.username}`
            );

            if (!command) {
                interaction.editReply('This command does not exist.');
                return;
            }

            console.log('Checking for cooldown...');
            if (command.cooldown && cooldown) {
                //if the command is currently on cooldown
                if (Date.now() < cooldown) {
                    await interaction.editReply(
                        'Please wait a few seconds before using this command again.'
                    );
                    return;
                }
                interaction.client.cooldowns.set(
                    `${interaction.commandName}-${interaction.user.username}`,
                    Date.now() + command.cooldown! * 1000
                );
            } else {
                //if the command is not on cooldown
                interaction.client.cooldowns.set(
                    `${interaction.commandName}-${interaction.user.username}`,
                    Date.now() + command.cooldown! * 1000
                );
            }

            console.log('Running command...');
            command.run(client, interaction);
        }

        if (interaction.isChatInputCommand()) {
            if (!interaction.isCommand()) return;

            await interaction
                .deferReply()
                .then(() =>
                    console.log('Interaction reply has been deferred.')
                );

            const command = interaction.client.slashCommands.get(
                interaction.commandName
            );
            let cooldown = interaction.client.cooldowns.get(
                `${interaction.commandName}-${interaction.user.username}`
            );

            if (!command) {
                interaction.editReply('This command does not exist.');
                return;
            }

            console.log('Checking for cooldown...');
            if (command.cooldown && cooldown) {
                //if the command is currently on cooldown
                if (Date.now() < cooldown) {
                    await interaction.editReply(
                        'Please wait a few seconds before using this command again.'
                    );
                    return;
                }
                interaction.client.cooldowns.set(
                    `${interaction.commandName}-${interaction.user.username}`,
                    Date.now() + command.cooldown! * 1000
                );
                setTimeout(() => {
                    interaction.client.cooldowns.delete(
                        `${interaction.commandName}-${interaction.user.username}`
                    );
                }, command.cooldown! * 1000);
            } else if (command.cooldown && !cooldown) {
                interaction.client.cooldowns.set(
                    `${interaction.commandName}-${interaction.user.username}`,
                    Date.now() + command.cooldown! * 1000
                );
            }
            console.log('Running command...');
            await command.run(client, interaction);
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.slashCommands.get(
                interaction.commandName
            );
            if (!command) {
                console.log(
                    `User ${interaction.user.username} has requested a command that does not exist.`
                );
                return;
            }

            try {
                if (!command.autoComplete) return;
                command.autoComplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    },
};

export default interactionCreate;
