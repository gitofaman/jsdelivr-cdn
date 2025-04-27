//navbar animation script
// alert("WORKIN")
$(document).ready(function(){
    if ($(window).width() < 991) {
        var navOpen = false;

        var openNav = () => {
            navOpen = true;
            // play nav animation
            var navTl = gsap.timeline()
            $('.nav-menu').css('display', 'block')
            navTl.to('.navburger', {
                rotation: 360,
                opacity: 0
            }).to('.navcloser', {
                rotation: 360,
                opacity: 1
            }, 0)
            navTl.fromTo('.nav-menu', {
                opacity: 0,
                height: 0,
            }, {
                opacity: 1,
                height: 'auto',
            }, 0)
        }
        var closeNav = () => {
            navOpen = false;
            var navTl = gsap.timeline()
            navTl.to('.navburger', {
                rotation: 0,
                opacity: 1
            }).to('.navcloser', {
                rotation: 0,
                opacity: 0
            }, 0)
            navTl.to('.nav-menu', {
                opacity: 0,
                height: 0,
            }, 0).then(function(){
                $('.nav-menu').css('display', 'none')
            })
        }
        
        $('.nav-toggle').on('click', function(){
            if(!navOpen) {
                openNav()
            } else {
                closeNav()
            }
        })
        closeNav()
    }
})

$(document).ready(function(){
    //animate number script
    var animateNumber = (stat) => {
        var valueToUse = stat.value;
        console.log(valueToUse)
        anime({
            targets: stat,
            value: [0, valueToUse],
            round: 1,
            easing: 'easeInOutExpo',
            duration: 1500,
            complete: function() {
                stat.value = stat.getAttribute('finalval')
                console.log('animation completed')
            }
        });
    }
    function customParseInt(str) {
        // Extract digits using a regular expression
        const match = str.match(/\d+/);
        
        // If there's a match, return the parsed integer, otherwise return NaN
        return match ? parseInt(match[0]) : NaN;
      }

    $('.text-stat').css('display', 'none')
    $('input.text-stat').css('display', 'block').attr('disabled', '').css('cursor', 'default')
    $('.sd--stats').each(function(){
        var mainText = $(this).find('div.text-stat').text()
        var mainVal = customParseInt($(this).find('div.text-stat').text())
        $(this).find('input.text-stat').val(mainVal).attr('finalval', mainText)
    })

    $('.text-stat.is-input').each(function(){
        // console.log('all okay')
        var main = $(this)
        gsap.from(main, {
            opacity: 1,
            scrollTrigger: {
                trigger: main,
                start: "top bottom",
            },
            duration: 0.1,
            onComplete: function() {
                animateNumber(main[0])
                // console.log('animation complete')
            }
        })
    })
})

$(document).ready(function(){
    // version 1
var loopDivs = document.querySelectorAll('.loop-div')
function isHidden(el) {
    return (el.offsetParent === null)
}
//making sure loop div covers whole width of window

loopDivs.forEach(loopParentDiv=>{
    if(!isHidden(loopParentDiv)) {
        var loopDiv = loopParentDiv.firstChild
        var loopDivWidth = loopDiv.offsetWidth
        var loopDivCopyTimes = Math.round(window.innerWidth * 2/loopDivWidth)
        for(i=0;i<=loopDivCopyTimes;i++) {
            var copiedDiv = loopDiv.cloneNode(true)
            loopParentDiv.appendChild(copiedDiv)
        }
    }
})

loopDivs.forEach(loopParentDiv=>{
    if(!isHidden(loopParentDiv)) {
        var moveDistance = 0;
        var isPaused = false;
        var timeToMove1000px = parseInt(loopParentDiv.getAttribute('move-1000-time')) || 10000
        var timeToMove = Math.round(timeToMove1000px/1000)
        var moveFrom = 'right'
        var moveSum = '+'
        if(!!loopParentDiv.getAttribute('move-from')) {
            moveFrom = loopParentDiv.getAttribute('move-from');
        }
        if(moveFrom==='left') {
            loopParentDiv.style.justifyContent = 'flex-end'
            moveSum = ''
        } else {
            loopParentDiv.style.justifyContent = 'flex-start'
            moveSum = '-'
        }
        console.log(moveFrom)
        //justify content right and left
        setInterval(()=>{
            if(!isPaused) {
                loopParentDiv.style.transform = `translateX(${moveSum}${moveDistance}px)`
                var distanceBetween = loopParentDiv.childNodes[1].getBoundingClientRect().x - loopParentDiv.childNodes[0].getBoundingClientRect().x
                moveDistance++;
                if(moveDistance>=distanceBetween) {
                    moveDistance = 0;
                }   
            }
        }, timeToMove)
        loopParentDiv.addEventListener('mouseover', ()=>{
            isPaused = true;
        })
        loopParentDiv.addEventListener('mouseout', ()=>{
            isPaused = false;
        })
    }
})
})

$(document).ready(function() {
    var swipers = {};
    $('.swiper-slider').each(function () {
      const baseConfig = {
        slidesPerView: 'auto',
        speed: 500,
        keyboard: true,
        mousewheel: { forceToAxis: true },
        pagination: {
          el: $(this).find('.swiper-bullet-wrapper')[0],
          bulletActiveClass: 'is-active',
          bulletClass: 'swiper-bullet',
          clickable: true,
        },
        navigation: {
          nextEl: $(this).find('.swiper-next')[0],
          prevEl: $(this).find('.swiper-prev')[0],
          disabledClass: 'is-disabled',
        },
        scrollbar: {
          el: $(this).find('.swiper-drag-wrapper')[0],
          draggable: true,
          dragClass: 'swiper-drag',
          snapOnRelease: true,
        },
        slideToClickedSlide: true,
        spaceBetween: 20
      };
    
      // Extract the extras-json attribute
      const extrasJsonKey = $(this).attr('extras-json');
      let extrasConfig = {};
    
      if (extrasJsonKey && window[extrasJsonKey]) {
        try {
          extrasConfig = window[extrasJsonKey];
        } catch (error) {
          console.error(`Invalid extras-json reference: ${extrasJsonKey}`, error);
        }
      }
    
      console.log(extrasConfig);
    
      // Ensure Swiper element exists
      const swiperElement = $(this).find('.swiper')[0];
      if (!swiperElement) {
        console.warn('Swiper element not found in:', this);
        return;
      }
    
      const swiper = new Swiper(swiperElement, { ...baseConfig, ...extrasConfig });
    
      var swiperName = $(this).attr('swiper-name');
      if (swiperName) {
        if (swipers[swiperName]) {
          console.warn(`Duplicate swiper-name detected: ${swiperName}`);
        }
        swipers[swiperName] = swiper;
      }
    });
    
})
