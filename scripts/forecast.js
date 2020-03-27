const key = 'AJhcE16rmn4UXyatd70tIlUQLudZ0bts';

//get weather information
const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

//get city information
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    console.log(base + query);
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

getCity('delhi')
    .then(data => {
        //pass the key from the getCity response
        return getWeather(data.Key); //returns a promise
    }).then(data => { //fires callback function when getWeather is resolved
        console.log(data);
    }).catch(err => console.log(err));