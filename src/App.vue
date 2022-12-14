<script setup lang="ts">
import { computed, onMounted, ref, type Ref, watch } from "vue";
import SolarSystem from './components/SolarSystem.vue'

const phobosRiseHours = ref(0)
const phobosRiseMinuets = ref(0)
const phobosSetHours = ref(0)
const phobosSetMinutes = ref(0)
const deimosRiseHours = ref(0)
const deimosRiseMinuets = ref(0)
const deimosSetHours = ref(0)
const deimosSetMinutes = ref(0)
const moonMinutes = ref(1)
const moonsStart = ref(0)
const moonsEnd = ref(0)
const errorMessage = ref("")

watch(phobosRiseHours, (newValue) => {
  //TODO ooooder er rechnet automatisch modulo, hmmmmmm
  if(newValue > 24){
    phobosRiseHours.value = 24
  }
  if(newValue < 0){
    phobosRiseHours.value = 0
  }
  if(!isNaN(newValue)){
    phobosRiseHours.value = 0
  }
})


function calculateOverlappingMoonMinutes(): void {
  var phobosRise = CalculateTimestamp(phobosRiseHours.value, phobosRiseMinuets.value)
  var phobosSet = CalculateTimestamp(phobosSetHours.value, phobosSetMinutes.value)
  var deimosRise = CalculateTimestamp(deimosRiseHours.value, deimosRiseMinuets.value)
  var deimosSet = CalculateTimestamp(deimosSetHours.value, deimosSetMinutes.value)

  moonsStart.value = 0
  moonsEnd.value = 0

  //adapt day border
  if(phobosRise > phobosSet) phobosSet += 2500
  if(deimosRise > deimosSet) deimosSet += 2500

  //Twiligh
  if(phobosRise == deimosSet || phobosSet == deimosRise){
    moonMinutes.value = 1
    return
  }


  var set = Math.min(phobosSet, deimosSet)
  var rise = Math.max(phobosRise, deimosRise)

  if(rise > set){
    moonMinutes.value = 0
    return
  }

  moonsStart.value = rise
  moonsEnd.value = set

  //TODO 2 intervalls
  //thought process: rechne die rise zeiten auch nochmal hoch und schau check wether they are before the set jeweils mit anderen planets
  //TODO number input check
  if(set == deimosSet && rise == phobosRise){
    deimosRise += 2500

    if(deimosRise < phobosSet)
      console.log('second intervall')
  }



  moonMinutes.value = set - rise
}

function CalculateTimestamp(hours: number, minutes: number): number{
  return hours * 100 + minutes
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
              <input v-model="(phobosRiseHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="24">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(phobosRiseMinuets)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="99">
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
              <input v-model="(phobosSetHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="24">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(phobosSetMinutes)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="99">
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
              <input v-model="(deimosRiseHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="24">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(deimosRiseMinuets)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="99">
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
              <input v-model="(deimosSetHours)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="24">
              <span class="font-mono px-1 inline-block bg-inherit">h</span>
            </div>

            <div class="inline-block ml-2">
              <input v-model="(deimosSetMinutes)"  v-on:change="calculateOverlappingMoonMinutes" class="text-right inline-block border border-white rounded bg-white bg-opacity-10 pl-2" type="number" step="1" min="0" max="99">
              <span class="font-mono px-1 inline-block bg-inherit">min</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="font-mono font-semibold">Result: {{moonMinutes}} min</div>
        <div v-if="errorMessage" class="font-mono font-semibold text-red-500">Error: {{errorMessage}}</div>
      </div>

      </div>
      <div class="w-full">
        <SolarSystem 
          :deimos-rise="CalculateTimestamp(deimosRiseHours, deimosRiseMinuets)"
          :deimos-set="CalculateTimestamp(deimosSetHours, deimosSetMinutes)"
          :phobos-rise="CalculateTimestamp(phobosRiseHours, phobosRiseMinuets)"
          :phobos-set="CalculateTimestamp(phobosSetHours, phobosSetMinutes)"
          :moons-end="moonsEnd"
          :moons-start="moonsStart"
       />
      </div>
    </div>
  </main>
</template>
