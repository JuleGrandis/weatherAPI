import fetch from "node-fetch";
import crypto from "crypto";

const requestURL = "https://api.met.no/weatherapi/locationforecast/2.0/compact/";
const locations = {
    Grimstad: gisEncode(58.33, 8.58),
    Moscow: gisEncode(55.79, 37.62)
}

let location = "Grimstad";

if (process.argv[2] === "--location") {
    location = process.argv[3];
}

if (!locations[location]) {
    console.log("No such location");
    process.exit(-1);
}

console.log("Getting the weather for " + location);

async function getWeatherForLocation(coordinates) {

    try {

        const request = {
            Headers: {
                "User-Agent":"MM-203-UiA",
                "Content-Type":"application/json",
            }
        }

        const hash = crypto.createHash("sha256"); // nodejs org crypto 

        let response = await fetch( getUrl(coordinates), request );
        if(!response.ok) {
            throw new Error("Https shit happened " + response.status);
        }

        const weatherData = await response.json()
        return weatherData;

    } catch (error) {
        console.error(error)
        throw (error);
    }
}

const weatherForecast = await getWeatherForLocation(locations[location]);
console.dir(weatherForecast.properties.timeseries[0].data.next_6_hours.summary.symbol_code)

function gisEncode( lat, lon) {
    return { lat, lon }
}

function getUrl (coordinates) {
    return `${requestURL}?lat=${coordinates.lat}&lon=${coordinates.lon}`;
}

/*
const recieved = gisEncode(1, 2);
const expected = { lat: 1, lon: 2 };
if (JSON.stringify(revieved) === JSON.stringify(expected)) {
    console.log("Is ok");
} else {
    console.log("Shits n giggles")
}
*/

/*
//XML
<weatherforecast>
    <Location>
        <name>Grimstad</name>
        <lat>1</lat>
        <long>2</long>
    </Location>
</weatherforecast>
*/