
import { getPageID } from "./getPageID.js";
import { getSDSUrl } from "./getSDSUrl.js";

const sdsButton = document.querySelector(".SDS_Button");
const scannerInput = document.querySelector("#scannerInput");
const iFrame = document.querySelector("#SDS_viewer")

let prefix = "^"

const getPage = async (pageId) => {
    const response = await fetch(`/${pageId}`);
    return response.json();
}

sdsButton.addEventListener("click", () => {
    scannerInput.value=""
    scannerInput.focus();
    
    scannerInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            const text = scannerInput.value
            if (text.startsWith(prefix)) {
            const clean = text.slice(prefix.length);
            const pageID = getPageID(JSON.parse(clean));
            const page = await getPage(pageID);
            const url = getSDSUrl(page);
            iFrame.src = url
            scannerInput.value=""
            }
        }
    })
});
