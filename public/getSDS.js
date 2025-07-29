
import { getPageID } from "./getPageID.js";
import { getSDSUrl } from "./getSDSUrl.js";

const sdsButton = document.querySelector(".SDS_Button");
let buffer = "";
let collecting = false;

const getPage = async (pageId) => {
    const response = await fetch(`/${pageId}`);
    return response.json();
}

// Only add the keydown listener once
document.addEventListener("keydown", async (e) => {
    const key = e.key;

    // Start collecting when ^ is detected and we're not already collecting
    if (!collecting && key === "^") {
        buffer = "";
        collecting = true;
        return
    }

    // Only process keys when collecting
    if (!collecting) {
        return;
    }

    if (key === "Enter") {
        try {
        collecting = false;
        const formattedBuffer = buffer.substring(1);
        const pageID = getPageID(JSON.parse(formattedBuffer));
        const page = await getPage(pageID);
        const url = getSDSUrl(page);
        const iFrame = document.querySelector("#SDS_viewer");
        iFrame.src = url
        buffer = "";
        } catch (error) {
            console.error("Failed to get SDS", error)
        }
    } else {
        // Add all characters except Shift to buffer (including ^ if it's part of the data)
        if (key !== "Shift") {
        buffer += key;}
    }
});

sdsButton.addEventListener("click", () => {
    buffer = "";
    collecting = true;
});
