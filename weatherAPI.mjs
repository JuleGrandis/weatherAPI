const locations = {
    Grimstad: gisEncode(58.33, 8.58),
    Moscow: gisEncode(55.79, 37.62)
}

function gisEncode( lat, long) {
    return { lat, long }
}

const recieved = gisEncode(1, 2);
const expected = { lat: 1, long: 2};
if (JSON.stringify)