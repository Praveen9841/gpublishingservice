'use strict';

function initCustomScripts() {
  // 1. Slogan Typewriter
  var text = "Craft. Visualize. Deliver.";
  var el = document.querySelector('.typing-container-js');
  if (el) {
    var i = 0;
    var style = document.createElement('style');
    style.innerHTML = '\n      .typing-container-js {\n        animation: blink-caret-js 1s step-end infinite;\n        white-space: nowrap;\n      }\n      @keyframes blink-caret-js {\n        from, to { border-color: transparent }\n        50% { border-color: #2e2e2e; }\n      }\n    ';
    document.head.appendChild(style);

    function typeWriter() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 100 + 50);
      } else {
        setTimeout(function () {
          el.innerHTML = '';
          i = 0;
          typeWriter();
        }, 10000);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // 2. Advanced image slideshow with varied transition effects
  var effects = [
    ['fx-fade', 'exit-fade'],
    ['fx-fly-left', 'exit-fly-right'],
    ['fx-fly-right', 'exit-fly-left'],
    ['fx-fly-up', 'exit-fly-down'],
    ['fx-zoom-rotate', 'exit-zoom-out'],
    ['fx-flip', 'exit-flip'],
    ['fx-blur-scale', 'exit-blur'],
    ['fx-fly-down', 'exit-fly-up']
  ];

  var allFxClasses = [];
  effects.forEach(function (pair) {
    allFxClasses.push(pair[0], pair[1]);
  });

  document.querySelectorAll('.img-slideshow[data-slideshow]').forEach(function (slideshow, idx) {
    var slides = slideshow.querySelectorAll('.slide-item');
    if (slides.length <= 1) return;
    var current = 0;
    var effectIndex = idx % effects.length;

    setInterval(function () {
      var currentSlide = slides[current];
      var next = (current + 1) % slides.length;
      var nextSlide = slides[next];
      var effect = effects[effectIndex];

      slides.forEach(function (s) {
        allFxClasses.forEach(function (cls) { s.classList.remove(cls); });
      });

      nextSlide.classList.add(effect[0]);
      void nextSlide.offsetWidth;

      currentSlide.classList.remove('active');
      currentSlide.classList.add(effect[1]);
      nextSlide.classList.remove(effect[0]);
      nextSlide.classList.add('active');

      current = next;
      effectIndex = (effectIndex + 1) % effects.length;
    }, 3500);
  });

  // 3. Scroll-triggered 3D reveal animations & 3D mouse tilt
  var revealElements = document.querySelectorAll('.anim-reveal, .service-card');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.anim-3d-tilt').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -8;
      var rotateY = ((x - centerX) / centerX) * 8;
      el.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initCustomScripts();
} else {
  document.addEventListener('DOMContentLoaded', initCustomScripts);
}

var theme = {
  init: function () {
    theme.subMenu();
    theme.offCanvas();
    theme.spyScroll();
    theme.anchorSmoothScroll();
    theme.scrollCue();
    theme.swiperSlider();
    theme.progressBar();
    theme.pageProgress();
  },
  subMenu: () => {
    (function($bs) {
      const CLASS_NAME = 'has-child-dropdown-show';
      $bs.Dropdown.prototype.toggle = function(_original) {
          return function() {
              document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                  e.classList.remove(CLASS_NAME);
              });
              let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
              for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                  dd.classList.add(CLASS_NAME);
              }
              return _original.call(this);
          }
      }($bs.Dropdown.prototype.toggle);
      document.querySelectorAll('.dropdown').forEach(function(dd) {
          dd.addEventListener('hide.bs.dropdown', function(e) {
              if (this.classList.contains(CLASS_NAME)) {
                  this.classList.remove(CLASS_NAME);
                  e.preventDefault();
              }
              e.stopPropagation();
          });
      });
    })(bootstrap);
  },
  offCanvas: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
    const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav');
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, {scroll: true});
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
    navOffCanvasBtn.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.show();
      })
    });
    scrollLink.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.hide();
      })
    });
  },
  spyScroll: () => {
    let section = document.querySelectorAll('section[id]');
    let navLinks = document.querySelectorAll('.nav-link.scroll');
    window.onscroll = () => {
      section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 0;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          navLinks.forEach(links => {
            links.classList.remove('active');
            let matchingLink = document.querySelector(`.nav-link.scroll[href*=${id}]`);
            if (matchingLink) {
              matchingLink.classList.add('active');
            }
          });
        }
      });
    }
  },
  anchorSmoothScroll: () => {
    const links = document.querySelectorAll(".scroll");
    for(const link of links) {
      link.addEventListener("click", clickHandler);
    }
    function clickHandler(e) {
      e.preventDefault();
      this.blur();
      const href = this.getAttribute("href");
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        scroll({
          top: offsetTop - 75,
          behavior: "smooth"
        });
      }
    }
  },
  scrollCue: () => {
    if (typeof scrollCue !== 'undefined') {
      scrollCue.init({
        interval: -400,
        duration: 700,
        percentage: 0.8
      });
      scrollCue.update();
    }
  },
  swiperSlider: function() {
    if (typeof Swiper === 'undefined') return;
    var carousel = document.querySelectorAll('.swiper-container');
    for(var i = 0; i < carousel.length; i++) {
      var slider1 = carousel[i];
      slider1.classList.add('swiper-container-' + i);
      var controls = document.createElement('div');
      controls.className = "swiper-controls";
      var pagi = document.createElement('div');
      pagi.className = "swiper-pagination";
      var navi = document.createElement('div');
      navi.className = "swiper-navigation";
      var prev = document.createElement('div');
      prev.className = "swiper-button swiper-button-prev";
      var next = document.createElement('div');
      next.className = "swiper-button swiper-button-next";
      slider1.appendChild(controls);
      controls.appendChild(navi);
      navi.appendChild(prev);
      navi.appendChild(next);
      controls.appendChild(pagi);
      var sliderEffect = slider1.getAttribute('data-effect') ? slider1.getAttribute('data-effect') : 'slide';
      
      var sliderItems = slider1.getAttribute('data-items') ? slider1.getAttribute('data-items') : 3;
      var sliderItemsXs = slider1.getAttribute('data-items-xs') ? slider1.getAttribute('data-items-xs') : 1;
      var sliderItemsSm = slider1.getAttribute('data-items-sm') ? slider1.getAttribute('data-items-sm') : Number(sliderItemsXs);
      var sliderItemsMd = slider1.getAttribute('data-items-md') ? slider1.getAttribute('data-items-md') : Number(sliderItemsSm);
      var sliderItemsLg = slider1.getAttribute('data-items-lg') ? slider1.getAttribute('data-items-lg') : Number(sliderItemsMd);
      var sliderItemsXl = slider1.getAttribute('data-items-xl') ? slider1.getAttribute('data-items-xl') : Number(sliderItemsLg);
      var sliderItemsXxl = slider1.getAttribute('data-items-xxl') ? slider1.getAttribute('data-items-xxl') : Number(sliderItemsXl);
      var slidesPerViewInit = sliderItems;
      var breakpointsInit = {
        0: { slidesPerView: Number(sliderItemsXs) },
        576: { slidesPerView: Number(sliderItemsSm) },
        768: { slidesPerView: Number(sliderItemsMd) },
        992: { slidesPerView: Number(sliderItemsLg) },
        1200: { slidesPerView: Number(sliderItemsXl) },
        1400: { slidesPerView: Number(sliderItemsXxl) }
      };

      var sliderSpeed = slider1.getAttribute('data-speed') ? slider1.getAttribute('data-speed') : 500;
      var sliderAutoPlay = slider1.getAttribute('data-autoplay') !== 'false';
      var sliderAutoPlayTime = slider1.getAttribute('data-autoplaytime') ? slider1.getAttribute('data-autoplaytime') : 5000;
      var sliderAutoHeight = slider1.getAttribute('data-autoheight') === 'true';
      var sliderResizeUpdate = slider1.getAttribute('data-resizeupdate') !== 'false';
      var sliderAllowTouchMove = slider1.getAttribute('data-drag') !== 'false';
      var sliderReverseDirection = slider1.getAttribute('data-reverse') === 'true';
      var sliderMargin = slider1.getAttribute('data-margin') ? slider1.getAttribute('data-margin') : 30;
      var sliderLoop = slider1.getAttribute('data-loop') === 'true';
      var sliderCentered = slider1.getAttribute('data-centered') === 'true';
      var swiper = slider1.querySelector('.swiper');

      var slider = new Swiper(swiper, {
        on: {
          beforeInit: function() {
            if(slider1.getAttribute('data-nav') !== 'true' && slider1.getAttribute('data-dots') !== 'true') {
              controls.remove();
            }
            if(slider1.getAttribute('data-dots') !== 'true') {
              pagi.remove();
            }
            if(slider1.getAttribute('data-nav') !== 'true') {
              navi.remove();
            }
          },
          init: function() {
            if(slider1.getAttribute('data-autoplay') !== 'true') {
              this.autoplay.stop();
            }
            this.update();
          }
        },
        autoplay: {
          delay: sliderAutoPlayTime,
          disableOnInteraction: false,
          reverseDirection: sliderReverseDirection,
          pauseOnMouseEnter: false
        },
        allowTouchMove: sliderAllowTouchMove,
        speed: parseInt(sliderSpeed),
        slidesPerView: slidesPerViewInit,
        loop: sliderLoop,
        centeredSlides: sliderCentered,
        spaceBetween: Number(sliderMargin),
        effect: sliderEffect,
        autoHeight: sliderAutoHeight,
        grabCursor: true,
        resizeObserver: false,
        updateOnWindowResize: sliderResizeUpdate,
        breakpoints: breakpointsInit,
        pagination: {
          el: carousel[i].querySelector('.swiper-pagination'),
          clickable: true
        },
        navigation: {
          prevEl: slider1.querySelector('.swiper-button-prev'),
          nextEl: slider1.querySelector('.swiper-button-next'),
        }
      });
    }
  },
  progressBar: () => {
    if (typeof ProgressBar === 'undefined' || typeof Waypoint === 'undefined') return;
    const pline = document.querySelectorAll(".progressbar.line");
    const pcircle = document.querySelectorAll(".progressbar.semi-circle");
    pline.forEach(e => {
      var line = new ProgressBar.Line(e, {
        strokeWidth: 6,
        trailWidth: 6,
        duration: 3000,
        easing: 'easeInOut',
        text: {
          style: {
            color: 'inherit',
            position: 'absolute',
            right: '0',
            top: '-30px',
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        step: (state, line) => {
          line.setText(Math.round(line.value() * 100) + ' %');
        }
      });
      var value = e.getAttribute('data-value') / 100;
      new Waypoint({
        element: e,
        handler: function() {
          line.animate(value);
        },
        offset: 'bottom-in-view',
      })
    });
    pcircle.forEach(e => {
      var circle = new ProgressBar.SemiCircle(e, {
        strokeWidth: 6,
        trailWidth: 6,
        duration: 2000,
        easing: 'easeInOut',
        step: (state, circle) => {
          circle.setText(Math.round(circle.value() * 100));
        }
      });
      var value = e.getAttribute('data-value') / 100;
      new Waypoint({
        element: e,
        handler: function() {
          circle.animate(value);
        },
        offset: 'bottom-in-view',
      })
    });
  },
  pageProgress: () => {
    var progressWrap = document.querySelector('.progress-wrap');
    if(progressWrap != null) {
      var progressPath = document.querySelector('.progress-wrap path');
      var pathLength = progressPath.getTotalLength();
      var offset = 50;
      progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
      window.addEventListener("scroll", function(event) {
        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
        var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollElementPos >= offset) {
          progressWrap.classList.add("active-progress")
        } else {
          progressWrap.classList.remove("active-progress")
        }
      });
      progressWrap.addEventListener('click', function(e) {
        e.preventDefault();
        window.scroll({
          top: 0, 
          left: 0,
          behavior: 'smooth'
        });
      });
    }
  }
};
theme.init();