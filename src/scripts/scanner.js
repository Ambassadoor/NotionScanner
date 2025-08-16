import { getScanHandler } from "../helpers/getScanHandler.js";

let prefix = "^";  // default fallback
let suffix = "Enter";  // default fallback

// Get current prefix/suffix values from server
const getPrefixSuffix = async () => {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        prefix = config.prefix;
        suffix = config.suffix;
    } catch (error) {
        console.warn('Failed to load config, using defaults:', error);
    }
};

// Initialize config before setting up listeners
await getPrefixSuffix();

// Hidden input for scanner to add text to
const scannerInput = document.querySelector("#scannerInput")

// Adds click event listener to buttons container.
document.querySelector(".scan_buttons_container").addEventListener("click", (e) => {
    // The button that was clicked
    const button = e.target.closest(".scan");
    
    // Handles non button clicks within container
    if (!button) return;

    // Grabs the appropriate handler function based on button data-func
    const buttonFunc = getScanHandler(button.dataset.func);
    
    // Calls click handler
    onScanButtonClick(buttonFunc);
});

// Handler for scan button click
const onScanButtonClick = (callback) => {
    // Focuses the hidden input and clears it
    scannerInput.focus();
    scannerInput.value = "";
    // Refreshes focus every 100ms
    const intervalId = setInterval(() => {
        if (document.activeElement !== scannerInput) {
            scannerInput.focus();
        }
    }, 100);

    // Abortcontroller set up to handle listener removal
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Refocuses hidden input on blur
    const handleBlur = () => {
        scannerInput.focus();
    };    

    // Handler for keydown
    const handleKeydown = async (e) => {
        // Array for accumulating scanned codes
        const codes = [];

        // Current value of hidden input
        let text = e.target.value;

        // Checks for valid code (prefix and suffix)
        if (e.key === suffix && text[0] === prefix) {
            // Removes prefix
            text = text.slice(prefix.length);

            // Calls the mapped validation function. 
            const response = callback(text, codes);
            console.log(response)

            // Upon validation completion, cleans up and calls data processing function
            if (response?.done) {
                cleanup(intervalId, abortController);
                if (typeof response.callback === "function") {
                    await response.callback(response.params);
                }
            }
        }
    };
    
    // Adds event listeners
    scannerInput.addEventListener("blur", handleBlur, { signal });
    scannerInput.addEventListener("keydown", handleKeydown, { signal });
};

// Removes event listeners and clears interval
const cleanup = (intervalId, abortController) => {
    clearInterval(intervalId);
    abortController.abort();
}

const radioButtons = document.querySelector("#unit_div")
const densityInput = document.querySelector("#densityDiv")

radioButtons.addEventListener('change', (e) => {
    const button = e.target.closest(".radio")
    if (button.value === "mL" && button.checked) {
        densityInput.hidden = false;
        densityInput.required = true;
    } else {
        densityInput.hidden = true;
        densityInput.required = false;
    }
})

const today = new Date().toISOString().split('T');
const dateReceived = document.querySelector("#date_received")

dateReceived.value = today[0]
dateReceived.max = today[0]
