import { ApiResponse } from "./apiResponse";
import { AddedBy, ExternalUrls, Followers, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistRequest {
    limit?:number;
    offset?:number;
}

export interface BasePlaylist {
    collaborative?:boolean;
    description?:string|null;
    external_urls?:ExternalUrls;
    href?:string;
    id:string;
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
    added_by?:AddedBy|null;
    is_local?:boolean;
    track:Track | Episode;
}

export interface GetPlaylistRequest {
    playlist_id:string;
    market?:string;
    field?:string;
    additional_types?:string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest{
    limit?:number;
    offset?:number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface CreatePlaylistRequest {
    name:string;
    playlistPublic?:boolean;
    collaborative?:boolean;
    description?:string;
}

export interface AddPlaylistRequest {
    position?:number;
    uris?:string[];
}

export interface AddPlayListResponse {
    snapshot_id?:string;
}
