// determines if the spot current value is in the spot's range
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

// adds commas as a thousands seperator
export const formatNumber = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// compares the spots for sorting
export const compareSpots = (spotA, spotB) => {

    // deconstructs the two spot objects
    const { currentValue: valA, min:minA, max:maxA } = spotA;
    const { currentValue: valB, min:minB, max:maxB } = spotB;

    // determines how far the spot A is from being in
    const deltaA = ( Math.abs( minA - minA ) < Math.abs( maxA - valA ))
                    ? Math.abs( minA - valA ) / minA
                    : Math.abs( valA - maxA ) / maxA;

    // determines how far the spot B is from being in
    const deltaB = ( Math.abs( minB - valB ) < Math.abs( maxB - valB ))
                    ? Math.abs( minB - valB ) / minB
                    : Math.abs( valB - maxB ) / maxB;


    if( getSpotStatus(spotA) === 'spot-optimum' 
        && (getSpotStatus(spotB) === 'spot-in' || getSpotStatus(spotB) === 'spot-out')){
        return -1;
    }

    if( getSpotStatus(spotB) === 'spot-optimum' 
        && (getSpotStatus(spotA) === 'spot-in' || getSpotStatus(spotA) === 'spot-out')){
        return 1;
    }
     
    if( getSpotStatus(spotA) === 'spot-in' 
        && getSpotStatus(spotB) === 'spot-out'){
        return -1;
    }

    if( getSpotStatus(spotB) ===  'spot-in' 
        && getSpotStatus(spotA) === 'spot-out'){
        return 1;
    }

    if (getSpotStatus(spotA) === 'spot-out' && getSpotStatus(spotB) === 'spot-out' ){
        if( deltaA < deltaB){ return -1; }
        if( deltaA > deltaB ){ return 1; }
    }

    return 0;
}