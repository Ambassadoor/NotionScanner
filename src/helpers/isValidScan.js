// Reusable code checkers for common code types

// Checks if passed in code is a valid Chem code
const isValidChemScan = (code) => {
    // Chem code keys
    const chemKeys = ["id", "uuid"];
    let parsed

    // Verifies the code is a JSON object that has the correct keys
    try {
        parsed = JSON.parse(code);
    } catch (error) {
        console.warn("Could not parse JSON:", error);
        parsed = null;
    }

    if (parsed && chemKeys.every(k => parsed.hasOwnProperty(k))) {
        return true
    } else {
        return false
    }
    
}

// Will validate an ID scan
const isValidIdScan = () => {

}

// Will validate a location code scan
const isValidLocationScan = () => {

}

// Validation type map
export const isValidScan = {
    chem: isValidChemScan,
    id: isValidIdScan,
    location: isValidLocationScan,
}