import {
    Guild,
    GuildMember,
    Message,
    TextChannel,
    PermissionResolvable,
    PermissionFlagsBits,
} from 'discord.js';
import fetch from 'node-fetch';
import chalk from 'chalk';

export const color_text = (color: string, text: string) => {
    switch (color) {
        case 'red':
            return chalk.red(text);
        case 'green':
            return chalk.green(text);
        case 'yellow':
            return chalk.yellow(text);
        case 'blue':
            return chalk.blue(text);
        case 'green':
            return chalk.green(text);
        case 'magenta':
            return chalk.magenta(text);
        case 'cyan':
            return chalk.cyan(text);
        case 'white':
            return chalk.white(text);
        default:
            return chalk.white(text);
    }

    return chalk.blue(text);
};

export const random_chance = (chance: number) => {
    let fractionalChance = chance / 100;
    let random = Math.random();
    return random < fractionalChance;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const check_permissions = (
    member: GuildMember,
    permissions: PermissionResolvable[]
) => {
    let neededPermissions: PermissionResolvable[] = [];

    permissions.forEach((permission) => {
        if (!member.permissions.has(permission)) {
            neededPermissions.push(permission);
        }
    });

    if (neededPermissions.length === 0) return null;
    return neededPermissions.map((p) => {
        if (typeof p === 'string') return p.split(/(?=[A-Z])/).join(' ');
        else
            return Object.keys(PermissionFlagsBits)
                .find((k) => Object(PermissionFlagsBits)[k] === p)
                ?.split(/(?=[A-Z])/)
                .join(' ');
    });
};

export const fetch_JSON = (url: string) => {
    try {
        return fetch(url).then((res) => res.json());
    } catch (err) {
        console.error(err);
    }
};


const add_two = (a: number, b: number) => {
    return a + b;
}