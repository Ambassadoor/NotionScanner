// Import helper functions
import { getPageID } from "../helpers/getPageID.js";
import { getSDSUrl } from "../helpers/getSDSUrl.js";
import { getNotionPage } from "../helpers/getNotionPage.js";

// Get iFrame element to display file
const iFrame = document.querySelector("#SDS_viewer")

// Sets src of iFrame to url to display sds
export const displaySDS = async (params) => {
    const code = params.codes[0];
    const pageId = getPageID(JSON.parse(code));
    const page = await getNotionPage(pageId);
    console.log(page)
    const url = getSDSUrl(page)

    iFrame.src = url
}

