import axios from "axios"
import { SPOTIFY_BASE_UTL } from "../configs/commonConfig";
import { GetNewReleasesResponse } from "../models/album";

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