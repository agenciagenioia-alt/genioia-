import { createIcons, BrainCircuit, Contact, ChevronRight, Instagram, ChevronDown } from 'lucide';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Inicialización de Lenis (Smooth Scroll) ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Bloquear scroll inicial
lenis.stop();

// --- Lógica del Loader y Entrada ---
document.addEventListener("DOMContentLoaded", () => {
  const loaderBar = document.querySelector('.loader-bar');
  const loaderStatus = document.querySelector('.loader-status');
  const loader = document.getElementById('loader');
  const app = document.getElementById('app');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;

    loaderBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      loaderStatus.innerText = "[ ENCLAVE 3D LISTO - ACCEDIENDO ]";

      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        app.style.opacity = '1';

        // Iniciar partículas de fondo (electricidad)
        iniciarParticulas();

        // Iniciar animaciones y scroll
        setTimeout(() => {
          lenis.start();
          heroTl.play();
        }, 500);
      }, 600);
    }
  }, 120);
});

// --- Animaciones GSAP (Hero Parallax 2D) ---
const heroTl = gsap.timeline({ paused: true });

// --- Configuración tsParticles (Fondo Eléctrico mediante CDN) ---
async function iniciarParticulas() {
  if (window.tsParticles) {
    await window.tsParticles.load({
      id: "tsparticles",
      options: {
        autoPlay: true,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Los links interactúan con el cursor
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1,
                color: "#00F2FF"
              }
            }
          },
        },
        particles: {
          color: {
            value: "#00F2FF", // Cian eléctrico
          },
          links: {
            color: "#0062FF", // Azul eléctrico
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            outModes: {
              default: "out",
            },
          },
          number: {
            density: {
              enable: true,
              width: 800,
              height: 800
            },
            value: 80, // Cantidad de nodos
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }
    });
  } else {
    console.warn("tsParticles no está cargado, verifica el CDN en index.html");
  }
}

// Animación de entrada del Hero
heroTl.from('.hero-title', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
})
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.6")
  .from('.hero-description', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.6")
  .from('.hero-cta-group', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.6")
  .from('.ia-brain-container', {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)'
  }, "-=1.2");

// Parallax en Hero Visual eliminado para mantener position fixed
// gsap.to('.hero-visual', { ... });

// --- Crear Iconos Lunice ---
createIcons({
  icons: {
    BrainCircuit,
    Contact,
    ChevronRight,
    Instagram,
    ChevronDown
  }
});

// --- Animaciones Scroll Pinned (Bento Grid) ---
const bentoCards = gsap.utils.toArray('.bento-card');
const authoritySection = document.querySelector('.authority-section');

// Establecer perspectiva 3D al contenedor grid
gsap.set('.bento-grid', { perspective: 1500 });

// Definir timeline atada al scroll
const authorityTl = gsap.timeline({
  scrollTrigger: {
    trigger: authoritySection,
    start: 'top top', // Empieza cuando la sección cubre completamente la pantalla
    end: '+=300%', // El usuario tiene que hacer bastante scroll para revelar todas las tarjetas
    pin: true, // Fija la sección en pantalla
    scrub: 1, // Suaviza la animación atada a la rueda del mouse
  }
});

// Animar las tarjetas una por una (stagger) mientras se hace scrub
authorityTl.fromTo(bentoCards,
  {
    y: window.innerHeight * 0.4, // Empieza desde abajo
    opacity: 0,
    scale: 0.8,
    rotationX: 25, // Inclinación espectacular inicial
    transformOrigin: "bottom center"
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    rotationX: 0,
    duration: 1,
    stagger: 0.8, // Cada tarjeta espera a la anterior
    ease: "power2.out"
  }
);

// --- Efecto Texto Cibernético en los Títulos ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

document.querySelectorAll('.authority-section .section-title').forEach(title => {
  const originalText = title.innerText;

  gsap.fromTo(title,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: authoritySection,
        start: 'top 70%', // Comienza cuando empieza a asomarse
        toggleActions: 'play none none reverse'
      },
      onUpdate: function () {
        const progress = this.progress();
        const revealCount = Math.floor(progress * originalText.length);

        let newText = "";
        for (let i = 0; i < originalText.length; i++) {
          if (i < revealCount) {
            newText += originalText[i];
          } else if (originalText[i] === " " || originalText[i] === "\n") {
            newText += originalText[i];
          } else {
            newText += letters[Math.floor(Math.random() * letters.length)];
          }
        }
        title.innerText = newText;
      },
      onComplete: () => {
        title.innerText = originalText;
        // Restaurar el atributo data-text para el efecto glitch de hover
        title.setAttribute('data-text', originalText);
      }
    }
  );
});

// --- Lógica Carrusel de Testimonios (Terminal) ---
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showNextTestimonial() {
  testimonials[currentTestimonial].classList.remove('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
}

// Cambiar testimonio cada 6 segundos
if (testimonials.length > 0) {
  setInterval(showNextTestimonial, 6000);
}

// --- Animación Precios (Evolución) ---
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: '.pricing-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.2)',
    delay: index * 0.15
  });
});

// --- Manejo del Formulario de Evaluación (Integración WhatsApp) ---
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturar valores
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();

    // Número objetivo (WhatsApp de la Agencia)
    const waNumber = '573116165784';

    // Construcción del mensaje personalizado
    const customMessage = `🚀 Hola GenioIA, solicito una Evaluación Personalizada para mi negocio.\n\n👤 *Nombre:* ${name}\n📱 *Teléfono:* ${phone}\n📍 *Ciudad:* ${city}\n\nMe gustaría conocer cómo puedo escalar mis ventas con infraestructura digital 2D/3D. Quedo atento.`;

    // Codificar URL
    const encodedMessage = encodeURIComponent(customMessage);
    const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    const btn = leadForm.querySelector('button');
    const originalText = btn.innerText;

    // Efecto visual antes de redirigir
    btn.innerHTML = `<span class="glitch-effect" data-text="ENLAZANDO WHATSAPP...">ENLAZANDO WHATSAPP...</span>`;
    btn.classList.remove('glow-bg');
    btn.style.background = 'var(--primary-glow)';
    btn.style.color = '#000';

    setTimeout(() => {
      // Redirigir a WhatsApp en nueva pestaña
      window.open(waURL, '_blank');

      // Reiniciar formulario visualmente
      leadForm.reset();
      btn.innerHTML = originalText;
      btn.classList.add('glow-bg');
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  });
}

// --- Lógica de Botones de Compra (Planes de Evolución) ---
const planButtons = document.querySelectorAll('.btn-buy-plan');
planButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const planName = btn.getAttribute('data-plan');
    const waNumber = '573116165784';

    // Construcción del mensaje personalizado según el plan
    const customMessage = `🚀 Hola GenioIA, estoy muy interesado en adquirir el nivel de infraestructura: *${planName}*.\n\nMe gustaría recibir más información sobre los siguientes pasos para empezar a escalar mi negocio.`;

    // Codificar URL y Redirigir
    const encodedMessage = encodeURIComponent(customMessage);
    const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    window.open(waURL, '_blank');
  });
});

// --- Lógica del FAQ (Acordeón) ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Cerrar los otros
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      }
    });

    // Toggle actual
    item.classList.toggle('active');
    const answer = item.querySelector('.faq-answer');
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});
