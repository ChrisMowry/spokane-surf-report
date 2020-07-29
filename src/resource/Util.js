
export const getSpotStatus = (spot) => {

    // destructures spot object
    const { currentValue:value, min, max, optimumFlowLow_i:optMin, optimumFlowHigh_i:optMax } = spot;

    if (value === undefined || min === undefined || max === undefined) {
        return "NoData";
    } else {

        // compares the current value to the min, max and optimum ranges
        let status = value > min && value < max
                    ? value > optMin && value < optMax 
                        ? 'spot-optimum' 
                        : 'spot-in'
                    : 'spot-out';

        return status;
    }
    

}