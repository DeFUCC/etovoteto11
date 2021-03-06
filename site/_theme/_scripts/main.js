import VanillaScrollSpy from 'vanillajs-scrollspy'
import { generateWords } from './use/randomWords'

//<![CDATA[
var owa_baseUrl = 'http://stats.frkt.ru/'
var owa_cmds = owa_cmds || []
owa_cmds.push(['setSiteId', '8fa0a5261e72031dfa4fe8e24981255e'])
owa_cmds.push(['trackPageView'])
owa_cmds.push(['trackClicks'])
;(function () {
  var _owa = document.createElement('script')
  _owa.type = 'text/javascript'
  _owa.async = true
  owa_baseUrl =
    'https:' == document.location.protocol
      ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:')
      : owa_baseUrl
  _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js'
  var _owa_s = document.getElementsByTagName('script')[0]
  _owa_s.parentNode.insertBefore(_owa, _owa_s)
})()
//]]>

document.addEventListener('DOMContentLoaded', () => {
  scrollSpy()
  generator()
})

function generator() {
  const gen = document.getElementById('generator')
  const card = gen.children[0]
  const text = card.children[0]
  const generate = document.getElementById('generate')
  function newWord() {
    card.style.opacity = 0

    setTimeout(() => {
      let word = generateWords()
      word = word[0].toUpperCase() + word.slice(1)
      text.innerText = word
      card.style.opacity = 1
    }, 300)
  }
  newWord()
  generate.addEventListener('click', () => {
    newWord()
  })
}

function scrollSpy() {
  const targets = document.querySelectorAll('main > article'),
    options = {
      threshold: 0.2,
    }
  // check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    ;(() => {
      const inView = (target) => {
        const interSecObs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const elem = entry.target
            let currentNav = document.querySelector(`a[href='/#${elem.id}']`)

            if (currentNav) {
              entry.isIntersecting
                ? currentNav.classList.add('active')
                : currentNav.classList.remove('active')
            }
          })
        }, options)
        interSecObs.observe(target)
      }
      targets.forEach(inView)
    })()
  }
}
