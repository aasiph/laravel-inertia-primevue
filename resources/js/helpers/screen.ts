import {reactive} from 'vue'

const screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
}

const sm = (val: number) => val >= screens.sm && val <= screens.md
const md = (val: number) => val >= screens.md && val <= screens.lg
const lg = (val: number) => val >= screens.lg && val <= screens.xl
const xl = (val: number) => val >= screens.xl

const getBreakpoint = (w: number) => {
    if (sm(w)) return 'sm'
    else if (md(w)) return 'md'
    else if (lg(w)) return 'lg'
    else if (xl(w)) return 'xl'
    else return 'all'
}
const debounce = function (func: any, wait: number) {
    let timeout: number | unknown
    return () => {
        const later = function () {
            timeout = null
        }
        const callNow = !timeout
        clearTimeout(timeout as number)
        timeout = setTimeout(later, wait)
        if (callNow) func()
    }
}

const breakpoints = reactive({
    w: window.innerWidth,
    h: window.innerHeight,
    is: getBreakpoint(window.innerWidth)
})

window.addEventListener(
    'resize',
    debounce(() => {
        breakpoints.w = window.innerWidth
        breakpoints.h = window.innerHeight
        breakpoints.is = getBreakpoint(window.innerWidth)
    }, 200),
    false
)

export {breakpoints}
