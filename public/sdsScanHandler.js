import { isValidScan } from "./isValidScan.js"
import { displaySDS } from "./displaySDS.js"

// If code param is valid, add to codes array and returns data function with params
export const sdsScanHandler = (code, codes) => {
    if (isValidScan.chem(code)) {
        codes.push(code)
        return { done: true, callback: displaySDS, params: { codes: codes } }
    } else {
        return { done: false }
    }
}