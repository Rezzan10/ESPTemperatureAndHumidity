User
<script>
    import Chart from 'chart.js/auto'
    import {onMount} from 'svelte';

    /**
     * @type {number[]}
     */
    let chartValues = [];
    /**
     * @type {any[]}
     */
    let chartLabels = [];
    let ctx;
    /**
     * @type {HTMLCanvasElement}
     */
    let chartCanvas;

    async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/api/temperatures');
        const data = await response.json();

        chartLabels = data.data.map((/** @type {{ date: Date, time: string }} */ entry) => `${entry.date} ${entry.time}`)
        chartValues = data.data.map((/** @type {{ temperature: any; }} */ entry) => entry.temperature);
    }

    onMount(async () => {
        await fetchData();
        ctx = chartCanvas.getContext('2d');

        // @ts-ignore
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Temperatur',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: chartValues
                    }
                ]
            }
        });
    });
</script>

<main>
    <div>
        <h1 style="display: flex; justify-content: center">Temperatur und Feuchtigkeit</h1>
        <br> <br>
        <label for="startDate">Startdatum:</label>
        <input type="datetime-local"
               min="2018-06-07T00:00"
               max="2018-06-14T00:00"
               id="startDate">
        <label for="EndDate">EndDatum:</label>
        <input type="datetime-local"
               min="2018-06-07T00:00"
               max="2018-06-14T00:00"
               id="EndDate">
    </div>
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
</main>

<style>

</style>