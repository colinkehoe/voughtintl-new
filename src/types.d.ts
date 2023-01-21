import {
    Client,
    SlashCommandBuilder,
    CommandInteraction,
    Collection,
    PermissionResolvable,
    Message,
    AutocompleteInteraction,
    GuildMemberRoleManager,
    Snowflake,
    ButtonInteraction,
    ContextMenuCommandBuilder,
} from 'discord.js';
import { ImageURLOptions } from '@discordjs/rest';
import {
    Player,
    PlayerInitOptions,
    Track,
    Queue,
    PlayerOptions,
} from 'discord-player';

declare global {
    namespace NodeJS {
        interface process {
            env: {
                DISCORD_TOKEN: string;
                DISCORD_CLIENT_ID: string;
                PUBLIC_KEY: string;
            };
        }
    }
}

export interface SlashCommand {
    data: SlashCommandBuilder | any;
    run: (client: Client, interaction: any) => Promise<Message | void>;
    autoComplete?: (interaction: AutocompleteInteraction) => Promise<void>;
    permissions?: PermissionResolvable[];
    cooldown?: number;
}

declare interface Command {
    name: string;
    aliases?: string[];
    run: (Client: Client, ...args) => Promise<void>;
    permissions?: PermissionResolvable[];
}

export interface ContextMenuCommand {
    data: ContextMenuCommandBuilder;
    run: (
        client: Client,
        interaction:
            | ContextMenuCommandInteraction
            | UserContextMenuCommandInteraction
    ) => Promise<void>;
    permissions?: PermissionResolvable[];
    cooldown?: number;
}

export interface Event {
    name: string;
    once?: boolean | false;
    run: (...args: any) => Promise<void>;
}

export interface Button {
    name: string;
    run: (
        client: Client,
        button: ButtonInteraction,
        ...args
    ) => Promise<InteractionResponse>;
    cooldown?: number;
}

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        events: Collection<string, Event>;
        commands: Collection<string, Command>;
        cooldowns: Collection<string, number>;
        player: Player;
    }

    export interface GuildMember {
        id: Snowflake;
        user: User;
        displayName?: string;
        nickname?: string;

        avatar?: string;
        bannable: boolean;
        kickable: boolean;
        manageable: boolean;
        client: Client;
        displayColor: number;
        dmChannel?: DMChannel;
        guild: Guild;
        voice: VoiceState;
        joinedAt: Date;
        joinedTimestamp?: number;
        roles: GuildMemberRoleManager;
        partial: boolean;
        permissions: ReadOnly<PermissionsBitField>;
        premiumSince?: Date;
        premiumSinceTimestamp?: number;
        presence?: Presence;

        avatarURL: (options?: ImageURLOptions) => string;
        displayAvatarURL: (options?: ImageURLOptions) => string;
        ban: (options?: BanOptions) => Promise<GuildMember>;
        kick: (reason?: string) => Promise<GuildMember>;
        createDM: (force?: boolean) => Promise<DMChannel>;
        deleteDM: () => Promise<DMChannel>;
        send: (
            options: string | MessagePayload | MessageCreateOptions
        ) => Promise<Message>;
        disableCommunicationUntil: (
            communicationDisabledUntil: DateResolvable | null,
            reason?: string
        ) => Promise<GuildMember>;
        isCommunicationDisabled: () => boolean;
        timeout: (
            timeout: number | null,
            reason?: string
        ) => Promise<GuildMember>;
        permissionsIn: (
            channel: GuildChannelResolvable
        ) => Readonly<PermissionsBitField>;
        edit: (options: GuildMemberEditOptions) => Promise<GuildMember>;
        setNickname: (
            nick: string | null,
            reason?: string
        ) => Promise<GuildMember>;
        equals: (member: GuildMember) => boolean;
        fetch: (force?: boolean) => Promise<GuildMember>;
        toString: () => string;
    }
    export interface User {
        id: Snowflake;
        username: string;
        tag?: string;
        username?: string;

        avatar?: string;
        partial: boolean;
        bot?: boolean;
        client: Client;
        system?: boolean;
        createdAt: Date;
        createdTimestamp: number;
        defaultAvatarURL: string;
        discriminator?: string;
        DMChannel?: DMChannel;
        flags: ?UserFlagsBitField;
        hexAccentColor?: string;

        avatarURL: (options?: ImageURLOptions) => string;
        displayAvatarURL: (options?: ImageURLOptions) => string;
        bannerURL: (options?: ImageURLOptions) => string;
        createDM: (force?: boolean) => Promise<DMChannel>;
        deleteDM: () => Promise<DMChannel>;
        equals: (user: User) => boolean;
        fetch: (force?: boolean) => Promise<User>;
        fetchFlags: (force?: boolean) => Promise<UserFlags>;
        send: (
            options: string | MessagePayload | MessageCreateOptions
        ) => Promise<Message>;
    }
}

declare module '@discordjs/rest' {
    export interface ImageURLOptions {
        format?: 'webp' | 'png' | 'jpg' | 'jpeg';
        size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
        dynamic?: boolean;
    }
}

declare module 'discord-player' {
    export interface PlayerInitOptions {}

    export interface Track {}

    export interface Queue {
        id: string;
        player: Player;
        playing: boolean;
        tracks: Array<Track>;
        previousTracks: Array<Track>;

        addTrack: (track: Track) => void;
        addTracks: (tracks: Array<Track>) => void;
        back: () => Promise<void>;
        clear: () => void;
        connect: (channel: VoiceChannel) => Promise<Queue<T>>;
        createProgressBar: (options?: ProgressBarOptions) => string;
        getPlayerTimestamp: () => {
            current: string;
            end: string;
            progress: number;
        };
        destroy: (disconnect?: boolean) => void;
        getTrackPosition: (track: string | number | Track) => number;
        insert: (track: Track, position?: number) => void;
        remove: (position: string | number | Track) => Track;
        jump: (position: number | Track) => void;
        nowPlaying: () => Track;
        play: (src?: Track, options?: PlayOptions) => Promise<void>;
        setPaused: (paused?: boolean) => boolean;
        setBitrate: (bitrate: number | 'auto') => void;
        setFilters: (filters?: QueueFilters) => Promise<void>;
        setRepeatMode: (mode: QueueRepeatMode) => boolean;
        setVolume: (amount: number) => boolean;
        shuffle: () => boolean;
        skip: () => boolean;
        skipTo: (position: number | Track) => void;
        stop: () => void;
        toString: () => string;
        toJSON: () => {
            guild: string;
            id: string;
            options: PlayerOptions;
            tracks: Array<trackJSON>;
            voiceChannel: string;
        };
    }

    export interface Player {
        client: Client<boolean>;
        options: PlayerInitOptions;
    }
}

// Namespace for season/episode JSON files from TVMaze
export namespace SeasonInfo {
    export interface WebChannel {
        id?: number;
        name?: string;
        country?: Country;
        officialSite?: string;
    }
    export interface Image {
        medium?: string;
        original?: string;
    }
    export interface Rating {
        average?: number;
    }
    export interface links {
        self?: {
            href: string;
        };
        show?: {
            href: string;
        };
    }

    export interface Season {
        id: number;
        url?: string;
        summary: string;
        number: number;
        name?: string;
        episodeOrder: number;
        premiereDate: string;
        endDate: string;
        webChannel?: WebChannel;
        image?: Image;
        network?: any;
    }

    export interface Episode {
        id: number;
        url?: string;
        name?: string;
        season: number;
        number: number;
        type?: string;
        airdate?: string;
        airtime?: string;
        airstamp?: string;
        runtime: number;
        rating: Rating;
        image?: Image;
        summary: string;
    }
}
