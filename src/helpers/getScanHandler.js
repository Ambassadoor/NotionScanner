import { sdsScanHandler } from "../handlers/sdsScanHandler.js";
import { weighScanHandler } from "../handlers/weighScanHandler.js";

// Maps validator functions to button data-func values
export const getScanHandler = (func) => {
    const dispatcher = {
        sds: sdsScanHandler,
        checkIn: "",
        checkOut: "",
        weigh: weighScanHandler,
        move: "",
        addWaste: "",
        combineWaste: "",
        wasteStatus: "",
        disposeChem: "",
        getInfo: ""
    }

    return dispatcher[func]
}