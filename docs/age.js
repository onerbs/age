'use strict'
const div = (id) => {
  const tmp = document.getElementById(id)
  return (tmp === null)
    ? document.createElement('div')
    : tmp
}
const E = {
  date: div('date'),
  years: div('years'),
  months: div('months'),
  weeks: div('weeks'),
  days: div('days'),
  hours: div('hours'),
  minutes: div('minutes'),
  seconds: div('seconds')
}
E.date.textContent = window.location.hash
  ? window.location.hash.replace('#', '').replace(/-/g, '/')
  : '1986/03/22'
// some way less verbose? no? tsss...
class AmountOfTime {
  constructor ({ Y, M, D, W, H, N, S }) {
    this.compare = (other = AmountOfTime.untilNow()) => new AmountOfTime({
      Y: other.years - this.years,
      M: other.months - this.months,
      D: other.days - this.days,
      W: other.weeks - this.weeks,
      H: other.hours - this.hours,
      N: other.minutes - this.minutes,
      S: other.seconds - this.seconds
    })
    this.years = Y
    this.months = M
    this.days = D
    this.weeks = W
    this.hours = H
    this.minutes = N
    this.seconds = S
  }
}
AmountOfTime.fromDate = (ref) => {
  const Y = ref.getFullYear() - 1; const M = Y * 12 + ref.getMonth(); const D = Y * 365 + M * 30 + ref.getDate() - 1; const W = Math.floor(D / 7); const H = D * 24 + ref.getHours(); const N = H * 60 + ref.getMinutes(); const S = N * 60 + ref.getSeconds()
  return new AmountOfTime({ Y, M, D, W, H, N, S })
}
AmountOfTime.untilNow = () => AmountOfTime.fromDate(new Date())
const reference = AmountOfTime.untilNow()
const draw = () => {
  const comparation = reference.compare()
  E.years.textContent = `${comparation.years} years`
  E.months.textContent = `${comparation.months} months`
  E.weeks.textContent = `${comparation.weeks} weeks`
  E.days.textContent = `${comparation.days} days`
  E.hours.textContent = `${comparation.hours} hours`
  E.minutes.textContent = `${comparation.minutes} minutes`
  E.seconds.textContent = `${comparation.seconds} seconds`
}
const update = () => {
  setInterval(draw, 1000)
  window.requestAnimationFrame(update)
}
const main = () => {
  draw()
  update()
}
document.addEventListener('DOMContentLoaded', main)
