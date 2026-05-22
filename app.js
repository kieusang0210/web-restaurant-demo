/* ==========================================================================
   AURA GASTRONOMY - LUXURY MODERN CULINARY INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. PRELOADER DISMISSAL ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 600); // Elegant short delay for smooth fade
    });
    
    // Safety timeout in case load event takes too long
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 3000);
  }

  // --- 2. STICKY HEADER & SCROLL ACTIVE LINK ---
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Sticky navigation bar behavior
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll active link highlight
    let current = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- 3. MOBILE HAMBURGER MENU ---
  const hamburger = document.querySelector('.hamburger');
  const navLinksMenu = document.querySelector('.nav-links');
  const menuLinks = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinksMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('remove');
        navLinksMenu.classList.remove('active');
      });
    });
  }

  // --- 4. HERO SLIDESHOW (AUTOPLAY PARALLAX BACKGROUND) ---
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000); // 6 seconds slide duration
  }

  // --- 5. INTERACTIVE FOOD MENU TABS & DYNAMIC SHOWCASE ---
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuGrids = document.querySelectorAll('.menu-items-grid');
  const showcaseImg = document.querySelector('.menu-showcase-img');
  const showcaseTitle = document.querySelector('.showcase-title');
  const showcaseDesc = document.querySelector('.showcase-desc');

  // Interactive details for food categories (Showcase panel)
  const menuShowcaseDetails = {
    appetizers: {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      title: 'Truffle Salmon Carpaccio',
      desc: 'Thinly sliced wild-caught salmon, yuzu zest, shaved white truffles, and house-infused microgreens.'
    },
    mains: {
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      title: 'A5 Miyazaki Wagyu Ribeye',
      desc: 'Pan-seared premium Miyazaki A5 Wagyu, smoked sea salt flakes, red wine reduction, and charred asparagus.'
    },
    desserts: {
      image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=800',
      title: 'Deconstructed Matcha Soufflé',
      desc: 'Liquid gold matcha center, white chocolate dust, edible gold leaf, and Madagascar vanilla bean gelée.'
    },
    mixology: {
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      title: 'The Golden Eclipse',
      desc: 'Saffron-infused gin, elderflower liqueur, activated charcoal syrup, fresh lemon, smoke bubble garnish.'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-tab');
      
      // Update active button state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Swap active menu grid content with elegant fade transitions
      menuGrids.forEach(grid => {
        grid.style.opacity = '0';
        setTimeout(() => {
          grid.style.display = 'none';
          if (grid.getAttribute('id') === category) {
            grid.style.display = 'flex';
            setTimeout(() => {
              grid.style.opacity = '1';
            }, 50);
          }
        }, 300);
      });

      // Update active showcase panels
      if (showcaseImg && menuShowcaseDetails[category]) {
        showcaseImg.style.opacity = '0.2';
        showcaseImg.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          showcaseImg.src = menuShowcaseDetails[category].image;
          showcaseTitle.textContent = menuShowcaseDetails[category].title;
          showcaseDesc.textContent = menuShowcaseDetails[category].desc;
          
          showcaseImg.style.opacity = '1';
          showcaseImg.style.transform = 'scale(1)';
        }, 400);
      }
    });
  });

  // --- 6. TESTIMONIALS SLIDER AUTOMATIC & MANUAL ---
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewDots = document.querySelectorAll('.review-dot');
  let currentReview = 0;
  let reviewInterval;

  function showReview(index) {
    reviewCards.forEach(card => card.classList.remove('active'));
    reviewDots.forEach(dot => dot.classList.remove('active'));
    
    reviewCards[index].classList.add('active');
    reviewDots[index].classList.add('active');
    currentReview = index;
  }

  function startReviewSlider() {
    reviewInterval = setInterval(() => {
      let nextIndex = (currentReview + 1) % reviewCards.length;
      showReview(nextIndex);
    }, 8000); // Rotate reviews every 8 seconds
  }

  reviewDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(reviewInterval);
      showReview(idx);
      startReviewSlider(); // Restart automatic loop
    });
  });

  if (reviewCards.length > 0) {
    startReviewSlider();
  }

  // --- 7. MULTI-STEP RESERVATION POPUP FORM ---
  const openModalBtns = document.querySelectorAll('.trigger-booking');
  const modalOverlay = document.getElementById('bookingModal');
  const closeModalBtn = document.querySelector('.modal-close-btn');
  const modalForm = document.getElementById('reservationForm');
  const steps = document.querySelectorAll('.booking-step');
  const stepDots = document.querySelectorAll('.step-dot');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  const successScreen = document.querySelector('.success-screen');
  
  let activeStep = 1;

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resetFormState();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Block scroll
    });
  });

  // Close Modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Multi-step Form Navigation Controllers
  function updateStep(stepNum) {
    steps.forEach(step => step.classList.remove('active'));
    stepDots.forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step'));
      dot.classList.remove('active', 'completed');
      if (dotStep === stepNum) {
        dot.classList.add('active');
      } else if (dotStep < stepNum) {
        dot.classList.add('completed');
      }
    });

    document.getElementById(`step${stepNum}`).classList.add('active');
    activeStep = stepNum;
  }

  // Validate Fields in Current Step
  function validateCurrentStep(stepNum) {
    const activeStepContainer = document.getElementById(`step${stepNum}`);
    const requiredInputs = activeStepContainer.querySelectorAll('[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#e57373'; // Highlight invalid
        input.addEventListener('input', function clearHighlight() {
          input.style.borderColor = '';
          input.removeEventListener('input', clearHighlight);
        });
      } else {
        input.style.borderColor = '';
      }
    });

    return isValid;
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateCurrentStep(activeStep)) {
        updateStep(activeStep + 1);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateStep(activeStep - 1);
    });
  });

  // Reset form status when opening
  function resetFormState() {
    activeStep = 1;
    modalForm.style.display = 'block';
    successScreen.style.display = 'none';
    modalForm.reset();
    
    // Set default date to today
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.min = today;
    }

    updateStep(1);
  }

  // Submit Reservation & Trigger Success State
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateCurrentStep(activeStep)) {
        // Collect form data details for the reservation
        const name = document.getElementById('bookName').value;
        const date = document.getElementById('bookDate').value;
        const time = document.getElementById('bookTime').value;
        const guests = document.getElementById('bookGuests').value;

        // Dynamic success update
        document.getElementById('confirmName').textContent = name;
        document.getElementById('confirmDetails').textContent = `${guests} guests on ${date} at ${time}`;

        // Fade out form and reveal gold success screen
        modalForm.style.display = 'none';
        successScreen.style.display = 'block';
        
        // Finalize completed indicator
        stepDots.forEach(dot => dot.classList.add('completed'));
      }
    });
  }

  // --- 8. SMOOTH SCROLL REVEAL (INTERSECTION OBSERVER) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
