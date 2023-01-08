<script setup lang="ts">
import { ref, type Ref, watch } from "vue";
import SolarSystem from './components/SolarSystem.vue'
import { Moon, type Interval, CalculateTimestamp, CalculateDifference, MoonIntervals } from "./functions/Moon";

const HOUR_MIN = 0;
const HOUR_MAX = 24;
const MINUTE_MIN = 0;
const MINUTE_MAX = 99;

const phobosRiseHours = ref(HOUR_MIN)
const phobosRiseMinutes = ref(MINUTE_MIN)
const phobosSetHours = ref(HOUR_MIN)
const phobosSetMinutes = ref(MINUTE_MIN)
const deimosRiseHours = ref(HOUR_MIN)
const deimosRiseMinutes = ref(MINUTE_MIN)
const deimosSetHours = ref(HOUR_MIN)
const deimosSetMinutes = ref(MINUTE_MIN)
const moonMinutes = ref(0)
const moonInterval = ref<Array<Interval>>([])

watch(phobosRiseHours, (newValue) => {addWatcherHours(phobosRiseHours, newValue)})
watch(phobosSetHours, (newValue) => {addWatcherHours(phobosSetHours, newValue)})
watch(deimosRiseHours, (newValue) => {addWatcherHours(deimosRiseHours, newValue)})
watch(deimosSetHours, (newValue) => {addWatcherHours(deimosSetHours, newValue)})

watch(phobosRiseMinutes, (newValue) => {addWatcherMinutes(phobosRiseMinutes, newValue)})
watch(phobosSetMinutes, (newValue) => {addWatcherMinutes(phobosSetMinutes, newValue)})
watch(deimosRiseMinutes, (newValue) => {addWatcherMinutes(deimosRiseMinutes, newValue)})
watch(deimosSetMinutes, (newValue) => {addWatcherMinutes(deimosSetMinutes, newValue)})

function addWatcherHours(reference: Ref<number>, value: number){
  reference.value = value;
  if(value > HOUR_MAX){ reference.value = HOUR_MAX}
  if(value < HOUR_MIN){ reference.value = HOUR_MIN }
  if(value == HOUR_MAX + 1){ reference.value = HOUR_MIN }
  if(value == HOUR_MIN - 1){ reference.value = HOUR_MAX }
  if(isNaN(value)){ reference.value = HOUR_MIN }
}

function addWatcherMinutes(reference: Ref<number>, value: number){
  reference.value = value;
  if(value > MINUTE_MAX){ reference.value = MINUTE_MAX}
  if(value < MINUTE_MIN){ reference.value = MINUTE_MIN }
  if(value == MINUTE_MAX + 1){ reference.value = MINUTE_MIN }
  if(value == MINUTE_MIN - 1){ reference.value = MINUTE_MAX }
  if(isNaN(value)){ reference.value = MINUTE_MIN }
}

function calculateOverlappingMoonMinutes(): void {
  moonInterval.value = MoonIntervals(
    phobosRiseHours.value, phobosRiseMinutes.value,
    phobosSetHours.value, phobosSetMinutes.value,
    deimosRiseHours.value, deimosRiseMinutes.value,
    deimosSetHours.value, deimosSetMinutes.value
  )

  moonMinutes.value = Moon(
    phobosRiseHours.value, phobosRiseMinutes.value,
    phobosSetHours.value, phobosSetMinutes.value,
    deimosRiseHours.value, deimosRiseMinutes.value,
    deimosSetHours.value, deimosSetMinutes.value
  )

  // runTest()
}

function addLeadingZeros(num: number){
  return ('0000'+num).slice(-4);
}

function runTest(){
  console.log(Moon(2,56,13,48,6,11,22,84));
  console.log(Moon(6,87,18,3,1,34,12,8));
  console.log(Moon(4,85,22,42,8,68,14,24));
  console.log(Moon(11,28,16,28,5,79,22,25));
  console.log(Moon(2,0,5,0,5,0,14,0));
  console.log(Moon(9,0,12,0,3,0,9,0));
  console.log(Moon(7,60,18,32,20,8,16,2));
  console.log(Moon(20,30,6,24,14,88,23,17));
  console.log(Moon(19,44,3,99,14,93,12,59));
  console.log(Moon(14,18,8,78,22,61,4,7));
  console.log(Moon(19,77,14,74,16,94,10,51));
  console.log(Moon(19,44,8,51,15,40,1,2));
  console.log(Moon(23,71,16,64,14,15,5,4));
  console.log(Moon(10,93,7,44,20,95,13,58));
  console.log(Moon(1,39,8,5,12,39,18,91));
}
</script>

<template>
  <main class="container my-10 max-w-screen-lg px-10 lg:mx-auto">
    <h1 class="text-6xl font-mono mb-6">Mars Moons</h1>

    <div class="flex items-center justify-center flex-col lg:flex-row">
      <div class="w-full">
      <div class="mb-6">
        <h2 class="text-2xl font-mono w-full mb-2 underline decoration-indigo-400">Phobos</h2>

        <div class="flex justify-between mb-2">
          <div>
            <span class="font-mono mr-3">Phobos Rise</span>
          </div>

          <div>
            <div class="inline-block">
              <input v-model="(phobosRiseHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="HOUR_MIN - 1" :max="HOUR_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(phobosRiseMinutes)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="MINUTE_MIN - 1" :max="MINUTE_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">min</span>
            </div>
          </div>
        </div>

        <div class="flex justify-between mb-2">
          <div>
            <span class="font-mono mr-3">Phobos Set</span>
          </div>

          <div>
            <div class="inline-block">
              <input v-model="(phobosSetHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="HOUR_MIN - 1" :max="HOUR_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(phobosSetMinutes)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="MINUTE_MIN - 1" :max="MINUTE_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">min</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-mono w-full mb-2 underline decoration-amber-400">Deimos</h2>

        <div class="flex justify-between mb-2">
          <div>
            <span class="font-mono mr-3">Deimos Rise</span>
          </div>

          <div>
            <div class="inline-block">
              <input v-model="(deimosRiseHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="HOUR_MIN - 1" :max="HOUR_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(deimosRiseMinutes)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="MINUTE_MIN - 1" :max="MINUTE_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">min</span>
            </div>
          </div>
        </div>

        <div class="flex justify-between mb-2">
          <div>
            <span class="font-mono mr-3">Deimos Set</span>
          </div>

          <div>
            <div class="inline-block">
              <input v-model="(deimosSetHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="HOUR_MIN - 1" :max="HOUR_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(deimosSetMinutes)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" :min="MINUTE_MIN - 1" :max="MINUTE_MAX + 1">
              <span class="font-mono px-1 inline-block bg-inherit">min</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="font-mono font-semibold mb-2">Biggest Interval: {{moonMinutes}} min</div>
        <div class="font-mono text-xs">
          Intervals found:
          <div v-for="interval in moonInterval">
            Interval from {{addLeadingZeros(interval.start)}} to {{addLeadingZeros(interval.end)}}: {{CalculateDifference(interval.start, interval.end)}} min
          </div>
        </div>
      </div>

      </div>
      <div class="w-full">
        <SolarSystem 
          :deimos-rise="CalculateTimestamp(deimosRiseHours, deimosRiseMinutes)"
          :deimos-set="CalculateTimestamp(deimosSetHours, deimosSetMinutes)"
          :phobos-rise="CalculateTimestamp(phobosRiseHours, phobosRiseMinutes)"
          :phobos-set="CalculateTimestamp(phobosSetHours, phobosSetMinutes)"
          :moonInterval="moonInterval"
       />
      </div>
    </div>
  </main>
</template>
