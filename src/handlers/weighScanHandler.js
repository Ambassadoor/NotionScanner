import { isValidScan } from "../helpers/isValidScan.js"
import { processWeightChange } from "../dataProcessors/processWeightChange.js"

const weightInput = document.querySelector("#weightInput")


export const weighScanHandler = (code, codes) => {
    let weight = Number(weightInput.value)

    if (isValidScan.chem(code) && weight) {
        codes.push(code)
        return { done: true, callback: processWeightChange, params: {codes: codes, weight: weight}}
    } else {
        return { done: false }
    }
}