import {
    Guild,
    GuildMember,
    Message,
    TextChannel,
    PermissionResolvable,
    PermissionFlagsBits,
} from 'discord.js';
import fetch from 'node-fetch';

type colorType = 'text' | 'variable' | 'error';

const themeColors = {
    text: '#ff8e4d',
    variable: '#ff624d',
    error: '#f5426c',
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
