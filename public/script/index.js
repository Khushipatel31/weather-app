function validateForm() {
    let city = document.getElementById("city");
    let errorMsg = document.getElementById("error");
    if (city.value.trim() === '') {
        errorMsg.style.display = 'block';
        return false;
    }
    errorMsg.style.display = 'none';
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    var forecastDataContainer = document.getElementById('forecastDataContainer');
    if (forecastDataContainer) {
        var forecasts = JSON.parse(forecastDataContainer.getAttribute('data-forecasts'));
        console.log("Forecasts data in index.js:", forecasts); 

        if (forecasts.length > 0 && forecasts[0].hasOwnProperty('maxTemp') && forecasts[0].hasOwnProperty('dayOfWeek')) {
            var options = {
                chart: {
                    height: 380,
                    width: "100%",
                    type: "area",
                    animations: {
                        initialAnimation: {
                            enabled: false
                        }
                    }
                },
                series: [
                    {
                        name: "Max Temperature",
                        data: forecasts.map(f => ({
                            x: f.formattedDate,
                            y: f.maxTemp
                        }))
                    },
                    {
                        name: "Min Temperature",
                        data: forecasts.map(f => ({
                            x: f.formattedDate,
                            y: f.minTemp
                        }))
                    }
                ],
                xaxis: {
                    type: "datetime"
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        } else {
            console.error("Forecasts data is not in the expected format:", forecasts);
        }
    } else {
        console.error("Forecasts data container is not found.");
    }
});
