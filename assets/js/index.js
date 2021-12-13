const START_SCROLL_DISTANCE = 0
const END_SCROLL_DISTANCE = 4520
const SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
const ROTATE_DEG = 120
const OPEN_DEG = 100

const ENVELOPE_START_TRANS_RATIO = 0.5
const ENVELOPE_TRANS_DISTANCE = 10

const PAGE_START_TRANS_RATIO = 0.8
const PAGE_TRANS_DISTANCE = 15

let open = false
const envelope = document.querySelector('#envelope')
const page = document.querySelector('#page')

envelope.addEventListener("click",e=>{
  open=true
  envelope.style.setProperty('cursor','initial')
})

document.addEventListener('scroll', e => {
  if (!open){
    e.preventDefault
    scrollTo(0,0)
    return false
  }
  const envelopeTop = document.querySelector('#envelopeTop')
  let scrollRatio = ((envelope.offsetTop - START_SCROLL_DISTANCE) / SCROLL_DISTANCE)
  let rotatedeg = Math.ceil(scrollRatio * ROTATE_DEG)
  envelope.style.setProperty('--rotatedeg',rotatedeg + 'deg')
  if (rotatedeg >= OPEN_DEG) {

  }
  if (scrollRatio >= ENVELOPE_START_TRANS_RATIO) {
    envelope.style.setProperty('--translateYDistance', Math.ceil(((scrollRatio - ENVELOPE_START_TRANS_RATIO) / (1 - ENVELOPE_START_TRANS_RATIO)) * ENVELOPE_TRANS_DISTANCE) + 'rem')
  }
  if (scrollRatio >= PAGE_START_TRANS_RATIO) {
    envelope.style.setProperty('--translateZDistance','100rem')
    page.style.setProperty('--translateYDistance',-Math.ceil((scrollRatio-PAGE_START_TRANS_RATIO)/(1-PAGE_START_TRANS_RATIO) * PAGE_TRANS_DISTANCE)+'rem')
  } else {
    envelope.style.setProperty('--translateZDistance','0rem')
  }
})

