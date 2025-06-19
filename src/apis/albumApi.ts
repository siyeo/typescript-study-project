import axios from "axios"
import { SPOTIFY_BASE_UTL } from "../configs/commonConfig";
import { SeveralAlbumsResponse, GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async(ClientCredentialToken:string):Promise<GetNewReleasesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_UTL}/browse/new-releases?limit=6`, {
            headers:{
                Authorization:`Bearer ${ClientCredentialToken}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch new releases");
    }
}

export const getSeveralAlbums = async(ClientCredentialToken:string):Promise<SeveralAlbumsResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_UTL}/albums?ids=3OaW4df1SA62k0arNpn6bK,11lLYKMkFheiV7ObD7WCnx,1AFVTHHm7kKoQ6Rgb25x3p,0Facfeed2mATsDICeHBIz1,7bnqo1fdJU9nSfXQd3bSMe,5V729UqvhwNOcMejx0m55I&market=KR`, {
            headers:{
                Authorization:`Bearer ${ClientCredentialToken}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to get several albums");
    }
}