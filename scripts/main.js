const the_form = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const update_ui = (data) => {
    // const cityDetails = data.CityDetails;
    // const weatherDetails = data.CityWeather;
    const {
        CityDetails,
        CityWeather
    } = data;


    details.innerHTML = `
        <h5 class='my-3'>${CityDetails.EnglishName}</h5>
        <div class="my-3">${CityWeather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${CityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div> 
    `;
    const theIcon = `img/icons/${CityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', theIcon);

    let timeSrc = CityWeather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const update_city = async (city) => {
    const CityDetails = await getCity(city);
    const CityWeather = await getWeather(CityDetails.Key);

    return {
        CityDetails,
        CityWeather
    }


}


the_form.addEventListener('submit', e => {

    e.preventDefault();
    const city = the_form.city.value.trim();
    the_form.reset();

    update_city(city)
        .then(data => update_ui(data))
        .catch(error => console.log(error));
    // update_ui(data),

});