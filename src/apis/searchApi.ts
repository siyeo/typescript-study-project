import axios from "axios";
import { SPOTIFY_BASE_UTL } from "../configs/commonConfig";

const searchItemsByKeyword = async(token, params)=>{
    try{
        const response = await axios.get(`${SPOTIFY_BASE_UTL}/search?${}`, {
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to search by keyword");
    }
}