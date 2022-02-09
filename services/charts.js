const chartConfig = (labels, values) => {

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    return config
}

// module.exports = { funct1, funct2 }
module.exports = { chartConfig }