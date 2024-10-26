document.getElementById('search-button').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  const dateStart = document.getElementById('date-start').value;
  const dateEnd = document.getElementById('date-end').value;
  const segmentId = document.getElementById('eventFilter').value; 

  if (city) {
      fetchEvents(city, dateStart, dateEnd, segmentId); 
      fetchWeather(city);
  } else {
      alert("Please enter a city name.");
  }
});

async function fetchEvents(city, dateStart, dateEnd, segmentId) {
  const apiKey = '5vZPG8s1FTqX44GqNDlyshgKcx4Fba97';

  const startDateTime = dateStart ? `${dateStart}T00:00:00Z` : '';
  const endDateTime = dateEnd ? `${dateEnd}T23:59:59Z` : '';

  let url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${encodeURIComponent(city)}&startDateTime=${startDateTime}&endDateTime=${endDateTime}&apikey=${apiKey}`;

  if (segmentId) {
      url += `&segmentId=${segmentId}`;
  }

  console.log('Fetching events from:', url); 

  try {
      const response = await fetch(url);
      const data = await response.json();

      console.log('API Response:', data); 

      if (data._embedded && data._embedded.events) {
          const events = data._embedded.events;

          
          if (events.length > 0) {
              displayEvents(events);
          } else {
              document.getElementById('events-container').innerHTML = `<p>No events found for your criteria.</p>`;
          }
      } else {
          document.getElementById('events-container').innerHTML = `<p>No events found for your criteria.</p>`;
      }
  } catch (error) {
      console.error("Error fetching events:", error);
      document.getElementById('events-container').innerHTML = `<p>Unable to load events.</p>`;
  }
}

function displayEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = '';

  if (!events || events.length === 0) {
      eventsContainer.innerHTML = `<p>No events found for your criteria.</p>`;
      return;
  }

  events.forEach(event => {
      console.log('Event Object:', event); 

      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');

      const venueName = event._embedded && event._embedded.venues && event._embedded.venues[0] 
          ? event._embedded.venues[0].name 
          : 'Venue not available';

      eventCard.innerHTML = `
          <h3>${event.name}</h3>
          <p>Venue: ${venueName}</p>
          <p><a href="${event.url}" target="_blank">More Info</a></p>
      `;

      eventsContainer.appendChild(eventCard);
  });
}

const weatherApiKey = 'cbe9d1ec5864fde344f50f2984bba66f';

async function fetchWeather(city) {
  const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApiKey}`;

  try {
      const response = await fetch(weatherEndpoint);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.weather) {
          document.getElementById('city-name').textContent = data.name; 

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
              <p>Condition: ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
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

  });