const f = {
  year: 31556952,
  month: 2629746,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
}

export function compare(A: Date, B: Date): number {
  return Math.floor(Math.abs((A.getTime() - B.getTime()) / 1000))
}

export function parse(time: number): diff {
  let years   = Math.floor(time / f.year);   time -= years   * f.year
  let months  = Math.floor(time / f.month);  time -= months  * f.month
  let weeks   = Math.floor(time / f.week);   time -= weeks   * f.week
  let days    = Math.floor(time / f.day);    time -= days    * f.day
  let hours   = Math.floor(time / f.hour);   time -= hours   * f.hour
  let minutes = Math.floor(time / f.minute); time -= minutes * f.minute
  return { years, months, weeks, days, hours, minutes, seconds: time }
}

export type diff = {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}
