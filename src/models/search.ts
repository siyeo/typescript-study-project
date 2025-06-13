import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylist } from "./playlist";
import { EpisodeShow, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./track";

export const enum SEARCH_TYPE {
    Album="album",
    Artist="artist",
    Playlist="playlist",
    Track="track",
    Show="show",
    Episode="episode",
    AudioBook="audiobook",
}

export interface SearchRequestParams {
    q:string;
    type:SEARCH_TYPE[];
    market?:string;
    limit?:number;
    offset?:number;
    include_external?:string;
}


export interface SearchResponse {
    artists?:ApiResponse<Artist>;
    albums?:ApiResponse<SimplifiedAlbum>;
    tracks?:ApiResponse<Track>;
    playlists?:ApiResponse<SimplifiedPlaylist>;
    shows?:ApiResponse<EpisodeShow>;
    episodes?:ApiResponse<SimplifiedEpisode>;
    audiobooks?:ApiResponse<SimplifiedAudioBook>
}