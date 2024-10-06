document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightYearSpan = document.getElementById("copyrightYear");
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = currentYear;
    }

    const lastModifiedDate = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedLastModified = lastModifiedDate.toLocaleDateString('en-US', options);

    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modified: ${formattedLastModified}`;
    }

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    const gridViewButton = document.getElementById('gridView');
    const listViewButton = document.getElementById('listView');

    if (gridViewButton && listViewButton) {
        gridViewButton.addEventListener('click', function() {
            fetchMembers().then(members => displayMembers(members, 'grid'));
            this.classList.add('active');
            listViewButton.classList.remove('active');
        });

        listViewButton.addEventListener('click', function() {
            fetchMembers().then(members => displayMembers(members, 'list'));
            this.classList.add('active');
            gridViewButton.classList.remove('active');
        });
    }

    fetchMembers();
});

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); 
        const members = await response.json();
        return members;
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members, viewType) {
    const membersContainer = document.getElementById('membersContainer');
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        const memberImage = `<img src="${member.image}" alt="${member.name} Logo">`;
        const memberDetails = `
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Membership Level: ${member.membership_level}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;

        memberCard.innerHTML = memberImage + memberDetails;
        membersContainer.appendChild(memberCard);
    });

    if (viewType === 'grid') {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
    } else {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
    }
}

const apiKey = 'cbe9d1ec5864fde344f50f2984bba66f';
const city = 'Kennewick';
const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data && data.weather) {
            const cityName = data.name; 
            const temperature = data.main.temp; 
            const weatherDescription = data.weather[0].description; 
            const highTemp = data.main.temp_max; 
            const lowTemp = data.main.temp_min;
            const humidity = data.main.humidity; 
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); 
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); 
            const icon = data.weather[0].icon; 

            document.getElementById('weather-details').innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon" />
                <p>${temperature.toFixed(0)}°F</p>
                <p>Condition: ${weatherDescription.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                <p>High: ${highTemp.toFixed(0)}°F</p>
                <p>Low: ${lowTemp.toFixed(0)}°F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            `;
        } else {
            document.getElementById('weather-details').textContent = "Unable to fetch weather data.";
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('weather-details').textContent = "Error loading weather.";
    }
}

fetchWeather();

async function fetchWeatherForecast() {
    const apiKey = 'cbe9d1ec5864fde344f50f2984bba66f';
    const city = 'Kennewick'; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayWeatherForecast(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecast-details');

    forecastContainer.innerHTML = '';

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const todayHigh = data.list[0].main.temp_max; 
    let tomorrowHigh = null; 
    let dayAfterTomorrowHigh = null; 

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000); 

        if (date.getDate() === tomorrow.getDate() && 
            (!tomorrowHigh || item.main.temp_max > tomorrowHigh)) {
            tomorrowHigh = item.main.temp_max; 
        } else if (date.getDate() === dayAfterTomorrow.getDate() && 
            (!dayAfterTomorrowHigh || item.main.temp_max > dayAfterTomorrowHigh)) {
            dayAfterTomorrowHigh = item.main.temp_max; 
        }
    });

    const options = { weekday: 'long' }; 
    const tomorrowName = tomorrow.toLocaleDateString('en-US', options);
    const dayAfterTomorrowName = dayAfterTomorrow.toLocaleDateString('en-US', options);

    let forecastHtml = ''; 
    forecastHtml += `<p>Today: ${todayHigh.toFixed(0)}°F</p>`; 
    forecastHtml += `<p>${tomorrowName}: ${tomorrowHigh ? tomorrowHigh.toFixed(0) : 'N/A'}°F</p>`; 
    forecastHtml += `<p>${dayAfterTomorrowName}: ${dayAfterTomorrowHigh ? dayAfterTomorrowHigh.toFixed(0) : 'N/A'}°F</p>`; 

    forecastContainer.innerHTML = forecastHtml; 
}

fetchWeatherForecast();

