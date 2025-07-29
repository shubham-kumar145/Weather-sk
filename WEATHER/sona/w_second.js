window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('weatherData'));

  if (!data) {
    window.location.href = './weather[1].html';
    return;
  }

  // Populate weather data
  document.getElementById('weatherIcon').src = "https:" + data.current.condition.icon;
  document.getElementById('Temperature').innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
  document.getElementById('day').innerHTML = data.current.condition.text;
  document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity}%`;
  document.getElementById('wind').innerText = `Wind: ${data.current.wind_kph} kph`;
  document.getElementById('date_time').textContent = data.location.localtime;

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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temps,
          backgroundColor: 'rgba(4,7,54)',


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
              color: 'white', // ✅ Make label white
              font: {
                size: 16,      // ✅ Increase font size
                weight: 'bold'
              }

            }
          },



          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
              color: 'white', // ✅ Make label white
              font: {
                size: 16,      // ✅ Increase font size
                weight: 'bold'
              }
            }
          }
        }
      }
    });
  } else {
    console.error("Hourly forecast data is missing.");
  }
});





//=================================shubham kumar========================
//==========================================
//  let tem_grp = data.forecast.forecastday[0]
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     // labels: [
//     //   '0000', '0100', '0200', '0300', '0400', '0500',
//     //   '0600', '0700', '0800', '0900', '1000', '1100',
//     //   '1200', '1300', '1400', '1500', '1600', '1700',
//     //   '1800', '1900', '2000', '2100', '2200', '2300'
//     // ],
//     labels: tem_grp.hour.map((_, index) => index.toString().padStart(2, '0') + ':00'),
//     // labels: ['0000', '0100', '0200', '0300', '0400', '0500','0600','0700'],
//     datasets: [{
//       label: 'Hourly Temperature (°C)',
//       data: tem_grp.hour.map(hourData => hourData.temp_c),
//       // data: [data.forecast.forecastday[0].hour[0].temp_c, data.forecast.forecastday[0].hour[1].temp_c,
//       // data.forecast.forecastday[0].hour[2].temp_c, data.forecast.forecastday[0].hour[3].temp_c,
//       // data.forecast.forecastday[0].hour[4].temp_c, data.forecast.forecastday[0].hour[5].temp_c,
//       // data.forecast.forecastday[0].hour[6].temp_c, data.forecast.forecastday[0].hour[7].temp_c,
//       // data.forecast.forecastday[0].hour[8].temp_c, data.forecast.forecastday[0].hour[9].temp_c,
//       // data.forecast.forecastday[0].hour[10].temp_c, data.forecast.forecastday[0].hour[11].temp_c,
//       // data.forecast.forecastday[0].hour[12].temp_c, data.forecast.forecastday[0].hour[13].temp_c,
//       // data.forecast.forecastday[0].hour[14].temp_c, data.forecast.forecastday[0].hour[15].temp_c,
//       // data.forecast.forecastday[0].hour[16].temp_c, data.forecast.forecastday[0].hour[17].temp_c,
//       // data.forecast.forecastday[0].hour[18].temp_c, data.forecast.forecastday[0].hour[19].temp_c,
//       // data.forecast.forecastday[0].hour[20].temp_c, data.forecast.forecastday[0].hour[21].temp_c,
//       // data.forecast.forecastday[0].hour[22].temp_c, data.forecast.forecastday[0].hour[23].temp_c,],
//       backgroundColor: Array(24).fill('rgba(234, 234, 155, 0.5)'),
//       borderColor: Array(24).fill('rgb(74, 64, 64)'),
//       fill: true,
//       tension: 0.3,
//       pointRadius: 3,
//       pointHoverRadius: 6,

//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: false,
//         title: {
//           display: true,
//           text: 'Temperature (°C)',
//           color: 'white', // change the colour of the text temp
//           font:{
//             size:18,
//             weight:'bold'
//           }
//         }
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Hour of Day',
//           color:'white',
//           font:{
//             size:16,
//             weight:'bold'
//           }
//         }
//       }
//     },
//     animation: {
//       duration: 1500,
//       easing: 'easeInOutQuad'
//     }

//   }

// });
