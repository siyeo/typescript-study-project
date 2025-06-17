import { ApiResponse } from "./apiResponse";
import { SimplifiedArtist } from "./artist";
import { ExternalUrls, Image, Restriction } from "./commonType";

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