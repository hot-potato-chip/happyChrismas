const START_SCROLL_DISTANCE = 0
let END_SCROLL_DISTANCE = 5 * window.innerHeight
let SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
const ROTATE_DEG = 120

const ENVELOPE_START_TRANS_RATIO = 0.5
const ENVELOPE_TRANS_DISTANCE = 10

const PAGE_START_TRANS_RATIO = 0.8
const PAGE_TRANS_DISTANCE = 10

let open = false
const envelope = document.querySelector('#envelope')
const page = document.querySelector('#page')

envelope.addEventListener("click", e => {
  open = true
  envelope.style.setProperty('cursor', 'initial')
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
  let rotatedeg = Math.ceil(scrollRatio * ROTATE_DEG)
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
}

window.addEventListener('resize', () => {
  END_SCROLL_DISTANCE = 5 * window.innerHeight
  SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
  adjustEnvelope()
})
document.addEventListener('scroll', adjustEnvelope)