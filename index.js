
async function getDataCoordinate(params) {
    const URL = `https://geocoding-api.open-meteo.com/v1/search?name=Indonesia&count=10&language=en&format=json`;
    const res = await fetch(URL);
    const dataCoordinate = await res.json();
    console.log(getDataCoordinate());
    


    
}