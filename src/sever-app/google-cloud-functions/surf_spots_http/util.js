module.exports = class Util{

    static getSpotOverview(spot){
        let simpleSpot = {};
        simpleSpot.spot_id = spot.spot_id;
        simpleSpot.name = spot.name;
        simpleSpot.location = spot.location;
        simpleSpot.accessLoc = spot.accessLoc;
        simpleSpot.min = spot.min;
        simpleSpot.max = spot.max;
        simpleSpot.optimumFlowLow_i = spot.optimumFlowLow_i;
        simpleSpot.optimumFlowHigh_i = spot.optimumFlowHigh_i;
        simpleSpot.kayakable = spot.kayakable;
        simpleSpot.boardable = spot.boardable;
        simpleSpot.site = spot.site;
        simpleSpot.siteName = spot.siteName;
        simpleSpot.gageType = spot.gageType;
        simpleSpot.unit = spot.unit;
        simpleSpot.currentValue = spot.currentValue;
        simpleSpot.currentValueTime = spot.currentValueTime;
        simpleSpot.currentChange = spot.currentChange;

        return simpleSpot;
    }

    static getSpotDetail(spot){
        let spotDetail = {};
        spotDetail.spot_id = spot.spot_id;
        spotDetail.name = spot.name;
        spotDetail.desc = spot.desc;
        spotDetail.kayakable = spot.kayakable;
        spotDetail.boardable = spot.boardable;
        spotDetail.flowInfo = spot.flowInfo;
        spotDetail.links = spot.links;
        spotDetail.optimumFlowLow_i = spot.optimumFlowLow_i;
        spotDetail.optimumFlowHigh_i = spot.optimumFlowHigh_i;
        spotDetail.history = spot.history;
        spotDetail.features = spot.features;
        spotDetail.tricks = spot.tricks;
        spotDetail.difficulty = spot.difficulty;

        return spotDetail;
    }
}