import { sdsScanValidator } from "./sdsScanValidator.js"

// Maps validator functions to button data-func values
export const scanButtonMap = (func) => {
    const funcMap = {
        sds: sdsScanValidator,
        checkIn: "",
        checkOut: "",
        weigh: "",
        move: "",
        addWaste: "",
        combineWaste: "",
        wasteStatus: "",
        disposeChem: "",
        getInfo: ""
    }

    return funcMap[func]
}