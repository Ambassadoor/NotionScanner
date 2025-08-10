import { sdsScanHandler } from "./sdsScanHandler.js"

// Maps validator functions to button data-func values
export const getScanHandler = (func) => {
    const dispatcher = {
        sds: sdsScanHandler,
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

    return dispatcher[func]
}