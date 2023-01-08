export type Interval = {
    end: number;
    start: number;
}

const DAY_MIN = 0;
const DAY_MAX = 2500;

export function MoonIntervals(phobosRiseHour: number, phobosRiseMinute: number, phobosSetHour: number, phobosSetMinute: number, deimosRiseHour: number, deimosRiseMinute: number, deimosSetHour: number, deimosSetMinute: number): Array<Interval>{

    var deimosIntervals = [{
        start: CalculateTimestamp(deimosRiseHour, deimosRiseMinute),
        end: CalculateTimestamp(deimosSetHour, deimosSetMinute)
    }]

    var phobosIntervals = [{
        start: CalculateTimestamp(phobosRiseHour, phobosRiseMinute),
        end: CalculateTimestamp(phobosSetHour, phobosSetMinute)
    }]

    var MoonIntervals: Array<Interval> = [];

    //Check if Twilight Rule applies
    if(deimosIntervals[0].start == phobosIntervals[0].end){MoonIntervals.push({start: deimosIntervals[0].start, end: deimosIntervals[0].start+1})}
    if(phobosIntervals[0].start == deimosIntervals[0].end){ MoonIntervals.push({start: phobosIntervals[0].start, end: phobosIntervals[0].start+1})}


    //add second intervals if moons set is on next day
    if(phobosIntervals[0].start > phobosIntervals[0].end){
        phobosIntervals.push({start: DAY_MIN, end: phobosIntervals[0].end})
        phobosIntervals[0].end = DAY_MAX
    }
    if(deimosIntervals[0].start > deimosIntervals[0].end){
        deimosIntervals.push({start: DAY_MIN, end: deimosIntervals[0].end})
        deimosIntervals[0].end = DAY_MAX
    }

    //get all intervals
    phobosIntervals.forEach(phobosInterval => {
        deimosIntervals.forEach(deimosInterval => {
            var interval = CalculateIntervalOverlap(phobosInterval, deimosInterval)
            if(interval != null) MoonIntervals.push(interval)
        });
    });

    //Merge the two intervals on the day border if exist
    const indexStart = MoonIntervals.findIndex(intervals => intervals.end === DAY_MAX);
    const indexEnd = MoonIntervals.findIndex(intervals => intervals.start === DAY_MIN);

    if(indexStart != -1 && indexEnd != -1){
        MoonIntervals[indexStart].end = MoonIntervals[indexEnd].end
        MoonIntervals.splice(indexEnd, 1);
    }

    return MoonIntervals
}

export function Moon(phobosRiseHour: number, phobosRiseMinute: number, phobosSetHour: number, phobosSetMinute: number, deimosRiseHour: number, deimosRiseMinute: number, deimosSetHour: number, deimosSetMinute: number): number{

    var moonIntervals = MoonIntervals(
        phobosRiseHour, phobosRiseMinute,
        phobosSetHour, phobosSetMinute,
        deimosRiseHour, deimosRiseMinute,
        deimosSetHour, deimosSetMinute
    )

    return moonIntervals.reduce((maxMinutes, interval) => {
        const difference = CalculateDifference(interval.start, interval.end);
        return Math.max(maxMinutes, difference);
    }, 0);
}


function CalculateIntervalOverlap(Interval1: Interval, Interval2: Interval){
    var start = Math.max(Interval1.start, Interval2.start)
    var end = Math.min(Interval1.end, Interval2.end)
    if (start - end < 0) return {start: start, end: end};
    return null;
}

export function CalculateTimestamp(hours: number, minutes: number): number{
    return hours * 100 + minutes
}

export function CalculateDifference (start: number, end: number){
    if(end < start) end += DAY_MAX
    return Math.abs(start - end)
}
