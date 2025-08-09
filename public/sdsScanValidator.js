import { scanValidatorTypes } from "./scanValidatorTypes.js"
import { getSDS } from "./getSDS.js"

// If code param is valid, add to codes array and returns data function with params
export const sdsScanValidator = (code, codes) => {
    if (scanValidatorTypes.chem(code)) {
        codes.push(code)
        return { done: true, callback: getSDS, params: { codes: codes } }
    } else {
        return { done: false }
    }
}