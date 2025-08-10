import { getPageID } from "../helpers/getPageID.js"

export const processWeightChange = async (params) => {
    const {codes, weight} = params;
    const pageId = getPageID(JSON.parse(codes[0]));

    const response = await fetch(`/api/updateWeight/${pageId}/${weight}`)
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    return data

}