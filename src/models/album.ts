import { ApiResponse } from "./apiResponse";
import { SimplifiedArtist } from "./artist";
import { CopyrightObject, ExternalIds, ExternalUrls, Image, Restriction } from "./commonType";
import { Track } from "./track";

export interface GetNewReleasesResponse {
    albums:ApiResponse<SimplifiedAlbum>
}

export interface SimplifiedAlbum {
    album_type:string;
    total_tracks:number;
    available_markets:string[];
    external_urls:ExternalUrls;
    href:string;
    id:string;
    images:Image[];
    name:string;
    release_date:string;
    release_date_precision:string;
    restrictions?:Restriction;
    type:string;
    uri:string;
    artists:SimplifiedArtist[];
}

export interface SeveralAlbumsResponse {
    albums:Album[];
}

export interface Album extends SimplifiedAlbum{
    track:Track;
    copyrights:CopyrightObject;
    external_ids:ExternalIds;
    genres:string[];
    label:string;
    popularity:number;
}