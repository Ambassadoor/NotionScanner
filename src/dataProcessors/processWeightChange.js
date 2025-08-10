import { getPageID } from "../helpers/getPageID.js"

export const processWeightChange = async (params) => {
    const {codes, weight} = params;
    const pageId = getPageID(JSON.parse(codes[0]));

    const response = await fetch(`/api/updateWeight/${pageId}/${weight}`)
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const pageData = await response.json();
    const name = pageData.properties["Name"].title[0].plain_text;
    const id = `${pageData.properties["ID"].unique_id.prefix}-${pageData.properties["ID"].unique_id.number}`;

    alert(`Weight was successfully updated to ${weight} for ${name} (${id}).`);                                        

    return data

}