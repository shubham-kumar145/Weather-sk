window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('weatherData'));

  if (!data) {
    window.location.href = './weather[1].html';
    return;
  }

  // Populate weather data
   const weather_icon="https:" + data.current.condition.icon;
document.getElementById('weatherIcon').src=weather_icon;

  document.getElementById('Temperature').innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
  
  const temp=document.getElementById('day').innerHTML = data.current.condition.text;
  document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity}%`;
  document.getElementById('wind').innerText = `Wind: ${data.current.wind_kph} kph`;
  document.getElementById('date_time').textContent = data.location.localtime;
document.getElementById('tem').innerHTML= `Temperture- ${data.current.temp_c}<sup>°C</sup>`;
// document.getElementById('rain').innerHTML=`Rainfall- ${data.current.precip_mm}%`
document.getElementById('rain').innerHTML=`Rainfall- ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`

  

// slider for humidity
    const sliderIn = document.getElementById('sliderIn');
const humidityValue = data.current.humidity;
sliderIn.style.width = `${humidityValue}%`;
// Optional: make it color-coded
const hue = (humidityValue / 100) * 120;
sliderIn.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;


//slider for temp 

//     const sliderIn4 = document.getElementById('sliderIn4');
// const tempvalue=data.current.temp_c;
// sliderIn4.style.width = `${tempvalue}%`;

// document.getElementById('location3').innerHTML=input;
// document.getElementById('sevendayicon').src=weather_icon;

  // Greeting based on time
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const wishElement = document.getElementById('wish');

  if (wishElement) {
    if (currentMinutes >= 300 && currentMinutes < 720) {
      wishElement.innerText = "GOOD MORNING";
    } else if (currentMinutes >= 720 && currentMinutes < 1020) {
      wishElement.innerText = "GOOD AFTERNOON";
    } else if (currentMinutes >= 1020 && currentMinutes < 1260) {
      wishElement.innerText = "GOOD EVENING";
    } else {
      wishElement.innerText = "GOOD NIGHT";
    }
  }

  // Draw hourly temperature chart
  if (
    data.forecast &&
    data.forecast.forecastday &&
    data.forecast.forecastday[0] &&
    data.forecast.forecastday[0].hour
  ) {
    const hourly = data.forecast.forecastday[0].hour;
    const labels = hourly.map(hour => hour.time.split(' ')[1]); // HH:MM
    const temps = hourly.map(hour => hour.temp_c);

    const ctx = document.getElementById('tempChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); 
    gradient.addColorStop(1, 'rgba(10, 255, 222, 0.5)');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temps,
          // backgroundColor: 'rgba(4,7,54)',
          backgroundColor: gradient,

          borderColor: ' white',
          borderWidth: 2,
          fill: true,
          pointRadius: 3,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
       
      scales: {
          x: {
            title: {
              display: true,
              text: 'Hour of Day',
              color: 'white',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white' // X-axis label color
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
              color: 'white',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white' // Y-axis label color
            },
            grid: {
              display: false
            }
          }
        },
       
      }
    });
  } else {
    console.error("Hourly forecast data is missing.");
  }
});

//slider for temp card 
document.addEventListener("DOMContentLoaded", () => {
   const data = JSON.parse(localStorage.getItem('weatherData'));
  const sliderIn4 = document.getElementById('sliderIn4');
  const tempvalue = data.current.temp_c; 
  sliderIn4.style.width = `${tempvalue}%`;
});


//slider for rainfall card 

document.addEventListener("DOMContentLoaded", () => {
   const data = JSON.parse(localStorage.getItem('weatherData'));
  const sliderIn5 = document.getElementById('sliderIn5');
  const tempvalue = data.current.temp_c;
  sliderIn5.style.width = `${tempvalue}%`;
});





document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem('weatherData'));
  const b3 = document.getElementById('bar3');

  if (!data || !data.forecast || !b3) return; // if data exist then only it will work 

  const container = document.createElement('div');
  container.id = 'forecast-container';
  b3.appendChild(container);

  const forecast = data.forecast.forecastday;

  forecast.forEach((day, index) => {
    const date = new Date(day.date);
    let weekday = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });

    const icon = `https:${day.day.condition.icon}`;
    const min = day.day.mintemp_c;
    const max = day.day.maxtemp_c;

    const row = document.createElement('div');
    row.className = 'forecast-row';

    row.innerHTML = `
      <div>${weekday}</div>
      <img src="${icon}" alt="weather icon">
      <div>${min}°C</div>
      <progress value="${(min + max) / 2}" max="40"></progress>
      <div>${max}°C</div>`;

    container.appendChild(row);
  });
});
