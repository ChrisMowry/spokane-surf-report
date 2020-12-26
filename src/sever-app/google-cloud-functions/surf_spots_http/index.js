/**
 * Returns a list of Google APIs and the link to the API's docs.
 * @param {Express.Request} req The API request.
 * @param {Express.Response} res The API response.
 */


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
const key = require("./key.json");
const Util = require("./util");

admin.initializeApp(key);

exports.surfSpotHttp = async (req, res) => {
    const db = admin.firestore();

    let spots = []; // holds spots to be returned.

    // sets headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // parses parameters from the request
    const params = req.params["0"].split("/")
                                  .map((param) => decodeURIComponent(param))
                                                    .filter((param) => param);

    //console.log(JSON.stringify(params))
    //console.log(JSON.stringify(req.query))

    if(params.length > 0){
        switch (req.method) {
            case 'OPTIONS':
                res.status(200).send();
                break;
            case 'GET':
                // if a spot is specified return array with spot
                switch(params[0]){
                    case 'overview': // handles the request for overview values
                        // if no spot parameter is provided, all spots are returned.
                        if(params.length == 1){
                            db.collection('surf-spots').get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((spotDoc) => {
                                    spots.push(Util.getSpotOverview(spotDoc.data()))
                                });
                                res.status(200).send(spots);
                            });
                        }

                        // if a spot is specified, only that spot is returned
                        if(params.length == 2){
                            console.log(params[1])
                            const docRef = db.collection('surf-spots')
                                            .doc(params[1])
                                            .get()
                                            .then((spotDoc) => {
                                                if(spotDoc.exists){
                                                    spots.push(Util.getSpotOverview(spotDoc.data()))
                                                    res.status(200).send(spots);
                                                } else {
                                                    res.status(404).send('Surf spot not found!');
                                                }
                                            })
                        } 
                        break;
                    case 'detail': // handles the request for detail values
                    if(params.length == 1){
                        db.collection('surf-spots').get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((spotDoc) => {
                                spots.push(Util.getSpotDetail(spotDoc.data()))
                            });
                            res.status(200).send(spots);
                        });
                        
                    }

                    // if a spot is specified, only that spot is returned
                    if(params.length == 2){
                        const docRef = db.collection('surf-spots')
                                        .doc(params[1])
                                        .get()
                                        .then((spotDoc) => {
                                            if(spotDoc.exists){
                                                spots.push(Util.getSpotDetail(spotDoc.data()))
                                                res.status(200).send(spots);
                                            } else {
                                                res.status(404).send('Surf spot not found!');
                                            }
                                        })
                    } 
                    break;
                        break;
                    default:
                        res.status(404).send('Endpoint not found!');
                }
                break;
            case 'POST':
                res.status(403).send('Forbidden!');
                break;
            case 'PUT':
                res.status(403).send('Forbidden!');
                break;
            default:
                res.status(405).send('Unsupported method');
                break;
        }
    } else {
        res.status(404).send('Endpoint not found!');
    }
};