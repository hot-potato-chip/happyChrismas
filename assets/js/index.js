const START_SCROLL_DISTANCE = 0
let END_SCROLL_DISTANCE = 5.2 * window.innerHeight
let SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
const ROTATE_DEG = 160

const ENVELOPE_START_TRANS_RATIO = 0.4
const ENVELOPE_TRANS_DISTANCE = 10

const PAGE_START_TRANS_RATIO = 0.6
const PAGE_TRANS_DISTANCE = 10

const ENVELOPE_DISAPPEAR_RATIO = 0.9

let OPACITY_DISTANCE = 2 * window.innerHeight

let open = false
const OPENED_DEG = 30

const envelope = document.querySelector('#envelope')
const page = document.querySelector('#page')
const content = document.querySelector('#content')

envelope.addEventListener("click", e => {
  open = true
  envelope.style.setProperty('cursor', 'initial')
  envelope.style.setProperty('--rotatedeg',OPENED_DEG+'deg')
  envelope.classList.remove('big')
})

const zeroToOne = (num) => {
  if (num < 0) return 0
  if (num > 1) return 1
  return num
}

const adjustEnvelope = () => {

  if (!open) {
    scrollTo(0, 0)
    return false
  }
  let scrollRatio = Math.min((envelope.offsetTop - START_SCROLL_DISTANCE) / SCROLL_DISTANCE, 1)
  let rotatedeg = Math.ceil(scrollRatio * ROTATE_DEG) + OPENED_DEG
  envelope.style.setProperty('--rotatedeg', rotatedeg + 'deg')
  if (scrollRatio >= ENVELOPE_START_TRANS_RATIO) {
    envelope.style.setProperty('--translateYDistance',
    zeroToOne((scrollRatio - ENVELOPE_START_TRANS_RATIO) / (1 - ENVELOPE_START_TRANS_RATIO)) * ENVELOPE_TRANS_DISTANCE + 'rem')
  }
  if (scrollRatio >= PAGE_START_TRANS_RATIO) {
    envelope.style.setProperty('--translateZDistance', '100rem')
    page.style.setProperty('--translateYDistance',
    -zeroToOne((scrollRatio - PAGE_START_TRANS_RATIO) / (1 - PAGE_START_TRANS_RATIO)) * PAGE_TRANS_DISTANCE + 'rem')
  } else {
    envelope.style.setProperty('--translateZDistance', '0rem')
  }
  if (scrollRatio >= ENVELOPE_DISAPPEAR_RATIO) {
    let opacity = 1 - (scrollRatio - ENVELOPE_DISAPPEAR_RATIO)/(1 - ENVELOPE_DISAPPEAR_RATIO)
    envelope.style.setProperty('--opacity',opacity)
    envelope.classList.remove('boxShadow')
  }
  else {
    envelope.style.setProperty('--opacity',1)
    envelope.classList.add('boxShadow')
  }
  if (scrollRatio >= 1) {
    page.style.width = '50vw'
    page.style.height = '30vw'
  } else {
    page.style.width = '48vw'
    page.style.height = '28vw'
  }
}

const adjustContent = () => {
  let scrollRatio = Math.min((content.offsetTop - END_SCROLL_DISTANCE) / OPACITY_DISTANCE, 1)
  content.style.setProperty('--opacity',scrollRatio)
}

window.addEventListener('resize', () => {
  END_SCROLL_DISTANCE = 6 * window.innerHeight
  SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
  OPACITY_DISTANCE = 2 * window.innerHeight
  adjustEnvelope()
  adjustContent()
})
document.addEventListener('scroll', () => {
  adjustEnvelope()
  adjustContent()
})