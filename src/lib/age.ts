const f = { year: 31556952, month: 2629746, week: 604800, day: 86400, hour: 3600, minute: 60, }

export const compare = (A: Date, B: Date) => {
  const a: Date = A > B ? A : B
  const b: Date = A > B ? B : A; let
  R  = (a.getSeconds()  - b.getSeconds())
  R += (a.getMinutes()  - b.getMinutes())  * f.minute
  R += (a.getHours()    - b.getHours())    * f.hour
  R += (a.getDate()     - b.getDate())     * f.day
  R += (a.getMonth()    - b.getMonth())    * f.week
  R += (a.getFullYear() - b.getFullYear()) * f.month
  return R
}

export const parse = (time: number): diff => {
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
