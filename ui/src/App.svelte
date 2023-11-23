<script>
  import Chart from 'chart.js/auto'
  import { onMount } from 'svelte';

  /**
     * @type {any[]}
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

    chartLabels = data.data.map((/** @type {{ date: any; }} */ entry) => entry.date);
    chartValues = data.data.map((/** @type {{ temperature: any; }} */ entry) => entry.temperature);
  }

  onMount(async () => {
    await fetchData();
    ctx = chartCanvas.getContext('2d');

    // @ts-ignore
    var chart = new Chart(ctx, {
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

<canvas bind:this={chartCanvas} id="myChart"></canvas>
