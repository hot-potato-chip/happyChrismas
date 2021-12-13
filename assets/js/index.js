const START_SCROLL_DISTANCE = 100
const END_SCROLL_DISTANCE = 4500
const SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
const ROTATE_DEG = 120
const START_TRANS_RATIO = 0.5
const TRANS_DISTANCE = 10

let open = false
const envelope = document.querySelector('.envelope')

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
  const envelopeTop = document.querySelector('.envelopeTop')
  let scrollRatio = ((envelope.offsetTop - START_SCROLL_DISTANCE) / SCROLL_DISTANCE)
  envelopeTop.style.setProperty('--rotatedeg', Math.ceil(scrollRatio * ROTATE_DEG) + 'deg')
  if (scrollRatio >= START_TRANS_RATIO) {
    envelope.style.setProperty('--translateYDistance', Math.ceil(((scrollRatio - START_TRANS_RATIO) / START_TRANS_RATIO) * TRANS_DISTANCE) + 'rem')
  }
})

