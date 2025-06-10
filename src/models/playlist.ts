import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { AddedBy, ExternalIds, ExternalUrls, Followers, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
    limit?:number;
    offset?:number;
}

export interface BasePlaylist {
    collaborative?:boolean;
    description?:string|null;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    images?:Image[];
    name?:string;
    owner?:Owner;
    public?:boolean;
    snapshot_id?:string;
    type?:"playlist";
    uri?:string;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist extends BasePlaylist {
    tracks?:{
        href?:string;
        total?:number;
    };
}

export interface Playlist extends BasePlaylist {
    followers?:Followers;
    tracks?:{
        href:string;
        limit:number;
        next:string|null;
        offset:number;
        previous:string|null;
        total:number;
        items:PlaylistTrack[];
    };
}

export interface PlaylistTrack {
    added_at?:string|null;
    added_by?:AddedBy;
    is_local?:boolean;
    track?:Track | Episode;
}

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
    linked_from?:{};
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
    type:string;
    uri:string;
    restrictions?:{
        reason?:string;
    };
    show:EpisodeShow;
}

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


export interface GetPlaylistRequest {
    playlist_id:string;
    market?:string;
    field?:string;
    additional_types?:string;
}