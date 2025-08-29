<template>
  <div style="padding:20px; font-family:sans-serif;">
    <h1>📊 Stratosfy Dashboard</h1>

    <div v-if="allReadings.length">
      <table border="1" cellpadding="8" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Device</th>
            <th>Air Temp (°C)</th>
            <th>Surface Temp (°C)</th>
            <th>Battery (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reading, index) in allReadings" :key="index">
            <td>{{ new Date(reading.timestamp).toLocaleString() }}</td>
            <td>{{ reading.deviceId }}</td>
            <td>{{ reading.airTemperature }}</td>
            <td>{{ reading.surfaceTemperature }}</td>
            <td>{{ reading.batteryPer }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>No data found. Add some device readings first.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchReadings } from "./lib/api";

const allReadings = ref([]);

onMounted(async () => {
  allReadings.value = await fetchReadings();
});
</script>
