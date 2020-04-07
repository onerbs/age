class Seconds {
    value: number
    constructor(seconds: number) {
        this.value = seconds
    }
    add = (other: Seconds) => { this.value += other.value }
    toSeconds = () => this.value
    toMinutes = () => Math.floor(this.value / 60)
    toHours   = () => Math.floor(this.value / 3600)
    toDays    = () => Math.floor(this.value / 86400)
    toWeeks   = () => Math.floor(this.value / 604800)
    toMonths  = () => Math.floor(this.value / 2629746)
    toYears   = () => Math.floor(this.value / 31556952)
    static fromMinutes = (qu: number) => new Seconds(qu * 60)
    static fromHours   = (qu: number) => new Seconds(qu * 3600)
    static fromDays    = (qu: number) => new Seconds(qu * 86400)
    static fromWeeks   = (qu: number) => new Seconds(qu * 604800)
    static fromMonths  = (qu: number) => new Seconds(qu * 2629746)
    static fromYears   = (qu: number) => new Seconds(qu * 31556952)
    static fromDiff    = (some: Date, other: Date) => {
        let a: Date = some
        let b: Date = other
        if (some < other) { a = other; b = some }
        let res = new Seconds(a.getSeconds() - b.getSeconds())
        res.add(Seconds.fromMinutes (a.getMinutes()  - b.getMinutes()))
        res.add(Seconds.fromHours   (a.getHours()    - b.getHours()))
        res.add(Seconds.fromDays    (a.getDate()     - b.getDate()))
        res.add(Seconds.fromMonths ((a.getMonth()+1) -(b.getMonth()+1)))
        res.add(Seconds.fromYears   (a.getFullYear() - b.getFullYear()))
        return res
    }
}

class TimeFmt {
    years:   number
    months:  number
    weeks:   number
    days:    number
    hours:   number
    minutes: number
    seconds: number
    constructor(s: Seconds) {
        this.years   = s.toYears()
        s.add(Seconds.fromYears(-this.years))

        this.months  = s.toMonths()
        s.add(Seconds.fromMonths(-this.months))

        this.weeks   = s.toWeeks()
        s.add(Seconds.fromWeeks(-this.weeks))

        this.days    = s.toDays()
        s.add(Seconds.fromDays(-this.days))

        this.hours   = s.toHours()
        s.add(Seconds.fromHours(-this.hours))

        this.minutes = s.toMinutes()
        s.add(Seconds.fromMinutes(-this.minutes))

        this.seconds = s.toSeconds()
    }
}

class UI {
    seconds: HTMLDivElement
    minutes: HTMLDivElement
    hours:   HTMLDivElement
    days:    HTMLDivElement
    weeks:   HTMLDivElement
    months:  HTMLDivElement
    years:   HTMLDivElement
    constructor(parent: HTMLElement) {
        this.years   = document.createElement('div')
        this.months  = document.createElement('div')
        this.weeks   = document.createElement('div')
        this.days    = document.createElement('div')
        this.hours   = document.createElement('div')
        this.minutes = document.createElement('div')
        this.seconds = document.createElement('div')
        parent.append(
            this.years, this.months, this.weeks, this.days,
            this.hours, this.minutes, this.seconds        )
    }
    fill = (seconds: Seconds) => {
        let fmt = new TimeFmt(seconds)
        this.years.textContent   = `${fmt.years} years`
        this.months.textContent  = `${fmt.months} months`
        this.weeks.textContent   = `${fmt.weeks} weeks`
        this.days.textContent    = `${fmt.days} days`
        this.hours.textContent   = `${fmt.hours} hours`
        this.minutes.textContent = `${fmt.minutes} minutes`
        this.seconds.textContent = `${fmt.seconds} seconds`
    }
}

(function() {
    const main = document.createElement('main')
    const info = document.createElement('div')
    document.body.append(main, info)
    const jsDateFromHash = (what: string) => {
        let
        yy: number, mm: number, dd: number, 
        HH: number = 0, MM: number = 0, SS: number = 0, 
        [date, time] = what.split('_');
        [yy, mm, dd] = date.split('-').map(e => parseInt(e))
        if (time !== undefined) [HH, MM, SS] = time.split(':').map(e => parseInt(e))
        return new Date(yy, mm-1, dd, HH, MM || 0, SS || 0, 0)
    }
    let hash = window.location.hash.substr(1) || '2020-01-01'
    let [date, now] = [jsDateFromHash(hash), new Date()]

    info.textContent = `${date > now ? 'to' : 'since'} ${date.toLocaleString()}`
    
    let ui = new UI(main)
        ui.fill(Seconds.fromDiff(now, date))
}())
