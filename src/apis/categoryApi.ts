import axios from "axios";
import { SPOTIFY_BASE_UTL } from "../configs/commonConfig";
import { GetSeveralBrowseCategoriesRequest, GetSeveralBrowseCategoriesResponse } from "../models/category";
import api from "../utils/api";

export const getSeveralBrowseCategories = async (token:string, params:GetSeveralBrowseCategoriesRequest):Promise<GetSeveralBrowseCategoriesResponse> => {
    try{
        const response = await axios.get(`${SPOTIFY_BASE_UTL}/browse/categories`, {
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            }, params
        });
        return response.data;
    } catch (error) {
        throw new Error("Fail to get categories");
    }
}