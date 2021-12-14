const START_SCROLL_DISTANCE = 0
const END_SCROLL_DISTANCE_NUM = 4.8
let END_SCROLL_DISTANCE = END_SCROLL_DISTANCE_NUM * window.innerHeight
let SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
const ROTATE_DEG = 160

const ENVELOPE_START_TRANS_RATIO = 0.4
const ENVELOPE_TRANS_DISTANCE = 10

const PAGE_START_TRANS_RATIO = 0.6
const PAGE_TRANS_DISTANCE = 10

const ENVELOPE_DISAPPEAR_RATIO = 0.9

const OPACITY_DISTANCE_NUM = 1
let OPACITY_DISTANCE = OPACITY_DISTANCE_NUM * window.innerHeight

let open = false
const OPENED_DEG = 30

const envelopeContainer = document.querySelector('.envelopeContainer')
const envelope = document.querySelector('#envelope')
const clickHint = document.querySelector('#clickHint')
const page = document.querySelector('#page')
const content = document.querySelector('#content')

window.onload = () => {
  envelopeContainer.style.setProperty('background-size','100%')
  envelope.style.setProperty('--translateYDistance','0rem')
  clickHint.style.setProperty('opacity','1')
  clickHint.style.setProperty('animation','upDown infinite 1s alternate')

  const lis = document.querySelectorAll('#galleryList li')
  for (let li of lis) {
    li.style.backgroundImage= `url(${li.dataset.img})`
  }

  const ul = document.querySelector('#galleryList')
  const galleryImg = document.querySelector('#galleryImg')
  ul.addEventListener('click',e => {
    if (e.target.tagName === 'LI') {
      lis.forEach(li => li.classList.remove('active'))
      e.target.classList.add('active')
      galleryImg.style.backgroundImage = `url(${e.target.dataset.img})`
    }
  })
}

envelope.addEventListener("click", e => {
  open = true
  clickHint.style.setProperty('opacity','0')
  envelopeContainer.style.setProperty('background-size','120%')
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
  if (rotatedeg > 90) {
    envelope.style.setProperty('--translateZDistance', '100rem')
  } else {
    envelope.style.setProperty('--translateZDistance', '0rem')
  }
  if (scrollRatio >= ENVELOPE_START_TRANS_RATIO) {
    envelope.style.setProperty('--translateYDistance',
    zeroToOne((scrollRatio - ENVELOPE_START_TRANS_RATIO) / (1 - ENVELOPE_START_TRANS_RATIO)) * ENVELOPE_TRANS_DISTANCE + 'rem')
  }
  if (scrollRatio >= PAGE_START_TRANS_RATIO) {
    page.style.setProperty('--translateYDistance',
    -zeroToOne((scrollRatio - PAGE_START_TRANS_RATIO) / (1 - PAGE_START_TRANS_RATIO)) * PAGE_TRANS_DISTANCE + 'rem')
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
  let scrollRatio = Math.min(content.offsetTop/ OPACITY_DISTANCE, 1)
  content.style.setProperty('--opacity',scrollRatio)
  content.style.top = `calc(50vh - ${Math.ceil(scrollRatio * 20)}vw)`
}

window.addEventListener('resize', () => {
  END_SCROLL_DISTANCE = END_SCROLL_DISTANCE_NUM * window.innerHeight
  SCROLL_DISTANCE = END_SCROLL_DISTANCE - START_SCROLL_DISTANCE
  OPACITY_DISTANCE = OPACITY_DISTANCE_NUM * window.innerHeight
  adjustEnvelope()
  adjustContent()
})
document.addEventListener('scroll', () => {
  adjustEnvelope()
  adjustContent()
})