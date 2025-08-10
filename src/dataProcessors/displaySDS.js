// Import helper functions
import { getPageID } from "../helpers/getPageID.js";
import { getSDSUrl } from "../helpers/getSDSUrl.js";

// Get iFrame element to display file
const iFrame = document.querySelector("#SDS_viewer")

// Retrieve notion page data
const getPage = async (pageId) => {
    const response = await fetch(`/api/${pageId}`);
    return response.json();
}

// Sets src of iFrame to url to display sds
export const displaySDS = async ({codes}) => {
    const code = codes[0];
    const pageId = getPageID(JSON.parse(code));
    const page = await getPage(pageId);
    const url = getSDSUrl(page)

    iFrame.src = url
}

