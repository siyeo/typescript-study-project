import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalIds, ExternalUrls, Image } from "./commonType";

export interface Track {
    album?:SimplifiedAlbum;
    artists?:Artist[];
    available_markets?:string[];
    disc_number?:number;
    duration_ms?:number;
    explicit?:boolean;
    external_ids?:ExternalIds;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    is_playable?:boolean;
    linked_from?: Track;
    restrictions?:{
        reason?:string;
    };
    name?:string;
    popularity?:number;
    /**
   * @deprecated Spotify Audio preview clips can not be a standalone service
   */
    preview_url?:string|null;
    track_number?:number;
    type?:string;
    uri?:string;
    is_local?:boolean;
}

export interface Episode {
    /**
   * @deprecated Spotify Audio preview clips can not be a standalone service
   */
    audio_preview_url:string|null;
    description:string;
    html_description:string;
    duration_ms:number;
    explicit:boolean;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    images?:Image[];
    is_externally_hosted:boolean;
    is_playable:boolean;
    /**
   * @deprecated Spotify Audio preview clips can not be a standalone service
   */
    language?:string;
    languages:string[];
    name:string;
    release_date:string;
    release_date_precision:string;
    resume_point?:{
        fully_played?:boolean;
        resume_position_ms?:number;
    }
    type:"episode";
    uri:string;
    restrictions?:{
        reason?:string;
    };
    show:EpisodeShow;
}

export type SimplifiedEpisode = Omit<Episode, "show">;

export interface EpisodeShow {
    available_markets:string[];
    copyrights:CopyrightObject[];
    description:string;
    html_description:string;
    explicit:boolean;
    external_urls:ExternalUrls;
    href:string;
    id:string;
    images:Image[];
    is_externally_hosted:boolean;
    languages:string[];
    media_type:string;
    name:string;
    publisher:string;
    type:string;
    uri:string;
    total_episodes:number;
}

export interface CopyrightObject {
    text?:string;
    type?:string;
}

export interface SimplifiedAudioBook {
    authors:{
        name?:string
    }[];
    available_markets:string[];
    copyrights:CopyrightObject[];
    description:string;
    html_description:string;
    edition?:string;
    explicit:boolean;
    external_urls:ExternalUrls;
    href:string;
    id:string;
    images:Image[];
    languages:string[];
    media_type:string;
    name:string;
    narrators:{
        name?:string;
    }[];
    publisher:string;
    type:"audiobook";
    uri:string;
    total_chapters:number;
}