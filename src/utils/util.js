export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? 'Good morning!' : hour <= 11 ? 'Good morning!' : hour <= 13 ? 'Good afternoon!' : hour < 20 ? 'Good afternoon!' : 'Good evening!'
}

export function welcome () {
  const arr = ['Take a break', 'What are you going to eat?', 'Do you want to hit a DOTA', 'I guess you might be tired']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {
  }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * generate uuid randomly
 */
export function randomUUID () {
  const chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  return randomString(32, chats)
}

/**
 * randomly generated strings
 */
export function randomString (length, chats) {
  let str = ''
  for (let i = 0; i < length; i++) {
    const num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * randomly generated numbers
 */
export function randomNumber () {
  // generate a random number from the minimum to the maximum
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    const [length] = arguments
    // generate a random number of a specified length, the first digit must not be 0
    const nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    const [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}
