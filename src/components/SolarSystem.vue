<script setup lang="ts">import type { Interval } from '@/functions/Moon';

defineProps({
  phobosRise: {type: Number, default: 0},
  phobosSet: {type: Number, default: 0},
  deimosRise: {type: Number, default: 0},
  deimosSet: {type: Number, default: 0},
  moonInterval: {type: Array<Interval>, default: []},
})


function CalculateCoordinates(radius: number, timestamp: number, offset: number){
  var x = CalculateXCoordinate(radius, ToRadians(CalculateDegrees(timestamp) - 90), offset)
  var y = CalculateYCoordinate(radius, ToRadians(CalculateDegrees(timestamp) - 90), offset)
  return ` ${x} ${y} `
}

function ToRadians (angle: number) : number {
  return angle * (Math.PI / 180);
}

function CalculateDegrees(timestamp: number): number{
  return timestamp/2500 * 360
}

function CalculateYCoordinate(radius: number, angle: number, offset: number){
  return 500+ radius * Math.sin(angle) + offset
}

function CalculateXCoordinate(radius: number, angle: number, offset: number){
  return 500+ radius * Math.cos(angle) + offset
}

function CalculatePathParameter(rise: number, set: number): string{
  if(rise < set)
    return Math.abs(set-rise) < 1250 ? "0 1" : "1 1"

  return Math.abs(set-rise) < 1250 ? "1 1" : "0 1"
}

function TransformMoon(radius: number, timestamp: number, offset: number){
  var x = CalculateXCoordinate(radius, ToRadians(CalculateDegrees(timestamp) - 90), offset)
  var y = CalculateYCoordinate(radius, ToRadians(CalculateDegrees(timestamp) - 90), offset)
  return `transform: translate(${x}px, ${y}px); `
}
</script>

<template>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1252 1252">
  <g v-for="interval in moonInterval">
    <path :d="'M625 625'+CalculateCoordinates(500, interval.start, 125)+'A500 500 0 '+ CalculatePathParameter(interval.start, interval.end) +''+CalculateCoordinates(500, interval.end, 125)+'Z'" fill="#fffbeb" opacity=".15" />
  </g>

  <g id="Demios-Path">
    <circle opacity=".5" cx="626" cy="626" r="500" fill="none" stroke="#fffbeb" stroke-dasharray="0 0 10 10"
            stroke-miterlimit="10" stroke-width="4" />
    <path :d="'M '+CalculateCoordinates(500, deimosRise, 125)+' A 500 500 0 '+ CalculatePathParameter(deimosRise, deimosSet) +' '+CalculateCoordinates(500, deimosSet, 125)" stroke="#FBBF24" fill="none" stroke-width="16"
            stroke-linecap="round" />
  </g>

  <g id="Phobos-Path">
    <circle opacity=".5" cx="626" cy="626" r="375" fill="none" stroke="#fffbeb" stroke-dasharray="0 0 10 10"
            stroke-miterlimit="10" stroke-width="4" />
    <path :d="'M '+CalculateCoordinates(375, phobosRise, 125)+' A 375 375 0 '+ CalculatePathParameter(phobosRise, phobosSet) +' '+CalculateCoordinates(375, phobosSet, 125)" stroke="#818CF8" fill="none" stroke-width="16"
            stroke-linecap="round" />
  </g>

  <g id="Mars">
    <circle class="shadow-outer" style="transform-origin:625px 625px;" id="Mars-Shadow-outer" cx="626" cy="626" r="210" fill="#ef4444" opacity=".1" />
    <circle class="shadow-inner" style="transform-origin:625px 625px;" id="Mars-Shadow-inner" cx="624.49" cy="627.51" r="168.56" fill="#ef4444" opacity=".25" />
    <g id="Mars-Planet" class="planet">
      <circle cx="625.3" cy="626.7" r="123.71" fill="#dc2626" />

      <path
            d="M566.23,617.01c-25.11-1.77-47.82,39.45-19.13,50.21,25.73,4.21,10.76-17.36,25.73-23.91,16.12-6.6,22.09-26.92-6.6-26.3Z"
            fill="#b91c1c" />
      <path d="M601.52,538.11c-11.95,5.4,2.96,18.51,7.79,7.17,1.77-4.78-3.59-8.37-7.79-7.17Z" fill="#b91c1c" />
      <path d="M601.52,572.2c-2.96-10.76-23.91-13.15-25.73-.57-30.46,20.9,35.29,32.85,25.73,.57Z" fill="#b91c1c" />
      <path d="M617.63,557.24c-4.78,0-4.78,7.17,0,7.17s4.78-7.17,0-7.17Z" fill="#b91c1c" />
      <path
            d="M732.4,619.4c-2.96-44.23-59.77-26.87-25.11,8.99,4.16,13.15-35.86,34.67-1.82,38.26,19.75-4.78,26.87-29.31,26.87-47.25h.05Z"
            fill="#b91c1c" />
      <path d="M692.95,628.39c-3.59-7.17-14.35-1.77-11.95,5.4,2.96,8.37,15.54,1.77,11.95-5.4Z" fill="#b91c1c" />
      <path d="M683.96,675.59c-4.78,0-4.78,7.17,0,7.17,4.78,.57,4.78-7.17,0-7.17Z" fill="#b91c1c" />
      <path d="M566.8,672.62c-4.78,0-4.78,7.17,0,7.17s4.78-7.17,0-7.17Z" fill="#b91c1c" />

      </g>
  </g>
  <g id="Phobos" :style="TransformMoon(375, phobosSet, 125)">
    <circle class="shadow-outer" style="transform-origin:0 0;"  id="Phobos_Shadow_outer" r="50" fill="#e0e7ff" opacity=".1" />
    <circle class="shadow-inner" style="transform-origin:0 0;"  id="Phobos_Shadow_inner" r="38.38" fill="#e0e7ff" opacity=".2" />
    <circle  r="25.62" fill="#c7d2fe" />
  </g>
  <g id="Demios" :style="TransformMoon(500, deimosSet, 125)">
    <circle class="shadow-outer" style="transform-origin:0 0;" id="Demios_Shadow_outer" r="50" fill="#fef3c7" opacity=".1" />
    <circle class="shadow-inner" style="transform-origin:0 0;" id="Demios_Shadow_inner" r="38.37" fill="#fef3c7" opacity=".2" />
    <circle  r="25.62" fill="#fde68a" />
  </g>
</svg>
</template>

<style>
  @keyframes Pulsing {
	0% {
		transform: scale(1);
		opacity: 0.2;

	}
	50% {
		transform: scale(1.05);
		opacity: 0.25;

	}
	100% {
		transform: scale(1);
		opacity: 0.2;

	}
}

@keyframes PulsingReverse {
	0% {
		transform: scale(1.05);
		opacity: 0.15;

	}
	50% {
		transform: scale(1);
		opacity: 0.1;

	}
	100% {
		transform: scale(1.05);
		opacity: 0.15;

	}
}


@keyframes Rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.planet {
    transform-origin:625px 625px;
		animation: 8s linear infinite Rotation;
	}

	.shadow-inner {
    /* transform-origin:625px 625px; */
		animation: 3s linear infinite Pulsing;
	}
	.shadow-outer {
    /* transform-origin:625px 625px; */

		animation: 3s linear infinite PulsingReverse;
	}

</style>
