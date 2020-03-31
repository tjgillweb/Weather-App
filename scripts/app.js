const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//update the DOM
const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    //destructure properties from an object
    const {
        cityDetails,
        weather
    } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update night/day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null;
    // if (weather.IsDayTime) {
    //     timeSrc = "img/day.svg";
    // } else {
    //     timeSrc = "img/night.svg";
    // }

    //refactor using ternary operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute("src", timeSrc);

    //remove d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value from input field
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //Update the UI with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set localStorage
    localStorage.setItem('city', city);
});

// runs everytime the page loads or user refreshes the page
if (localStorage.getItem('city')) { //check if localStorage with the key 'city' exists
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}