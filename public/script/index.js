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

function createChart(data) {
    console.log(data)
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
                name: "Series 1",
                data: [
                ]
            }
        ],
        xaxis: {
            type: "datetime"
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
}