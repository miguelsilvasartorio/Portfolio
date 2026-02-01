// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // Initialize Scroll Animations
  initScrollReveal();

  // Initialize Smooth Scroll for Anchor Links
  initSmoothScroll();

  // Initialize Navbar Behavior
  initNavbar();

  // Initialize Hero Parallax Effect
  initHeroParallax();
});

// Hero Parallax Effect
function initHeroParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        // Fade out hero as you scroll
        if (scrolled < heroHeight) {
          const opacity = 1 - (scrolled / heroHeight) * 0.8;
          hero.style.opacity = opacity;

          // Parallax effect on background elements
          const blobs = hero.querySelectorAll(".animate-blob");
          blobs.forEach((blob, index) => {
            const speed = 0.5 + index * 0.2;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
          });
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

// Scroll Reveal Animation using Intersection Observer
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  revealElements.forEach((el, index) => {
    // Add staggered delay based on index if not already set
    if (
      !el.classList.contains("delay-100") &&
      !el.classList.contains("delay-150") &&
      !el.classList.contains("delay-200") &&
      !el.classList.contains("delay-300")
    ) {
      // Only add delay if it's not the first element
      if (index > 0) {
        const delayClass = `delay-${Math.min(index * 50, 300)}`;
        el.classList.add(delayClass);
      }
    }
    observer.observe(el);
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight =
          document.querySelector("apple-nav")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Navbar Show/Hide on Scroll
function initNavbar() {
  let lastScroll = 0;
  const nav = document.querySelector("apple-nav");

  if (!nav) return;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Show nav after scrolling past hero section (approx 100vh)
    if (currentScroll > window.innerHeight * 0.8) {
      nav.classList.add("nav-visible");
    } else {
      nav.classList.remove("nav-visible");
    }

    lastScroll = currentScroll;
  });
}

// Parallax Effect for Hero Section (Subtle)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector("section:first-of-type");

  if (hero && scrolled < window.innerHeight) {
    const rate = scrolled * 0.3;
    const content = hero.querySelector("div > div");
    if (content) {
      content.style.transform = `translateY(${rate}px)`;
      content.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
    }
  }
});

// Form Handling (if contact form is added later)
document.addEventListener("submit", (e) => {
  if (e.target.matches("form")) {
    e.preventDefault();
    // Add form handling logic here
    console.log("Form submitted");
  }
});

// Lazy Loading Images (if any are added dynamically)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
// Project Carousel functionality
let currentSlide = 0;
let cardsPerView = 3;

// Project data for modal
const projectsData = {
  1: {
    title: "Análise Preditiva de Churn",
    description:
      "Análise preditiva para identificação de clientes em risco de cancelamento.",
    details: [
      "Desenvolvimento de modelos de machine learning para predição de churn com 75% de acurácia",
      "Envio das informações para Excel e Outlook para ações de retenção",
      "Integração de múltiplas fontes de dados via ETL automatizado",
      "Redução de 30% na taxa de cancelamento através de ações preventivas",
    ],
    technologies: ["Python", "Excel", "SQL", "Machine Learning", "Pandas"],
    metrics: {
      "Acurácia do Modelo": "75%",
      "Redução de Churn": "30%",
      "Dados Processados": "500K+ registros",
    },
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
  },
  2: {
    title: "Automação de Fechamento Financeiro",
    description:
      "Solução automatizada para processo de extração de dados financeiros mensais, eliminando trabalho manual repetitivo.",
    details: [
      "Automação completa do processo de extração e consolidação de dados financeiros mensais",
      "Extração e envio automático de mais de 100 relatórios",
      "Redução de 80% no tempo de processamento",
      "Eliminação de erros manuais e inconsistências nos dados",
    ],
    technologies: [
      "Power Automate",
      "Python",
      "Excel",
      "SharePoint",
      "Outlook",
    ],
    metrics: {
      "Tempo Economizado": "80%",
      "Relatórios Automáticos": "100+",
      "Erros Eliminados": "95%",
    },
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
  },
  3: {
    title: "Alertas de Suporte Personalizados",
    description:
      "Envio de alertas personalizados para equipes de suporte com base em métricas definidas.",
    details: [
      "Leitura e interpretação dos dados de atendimento ao cliente",
      "Criação de alertas personalizados de acordo com as métricas definidas",
      "Envio automático via Teams e E-mail dos alertas gerados",
    ],
    technologies: ["Python", "Power Automate", "Teams", "Outlook"],
    metrics: {
      "Dados Processados": "2K+ registros",
      Uptime: "99.8%",
    },
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=600&fit=crop",
  },
  4: {
    title: "Leitor de Documentos Técnicos",
    description:
      "Ferramenta de OCR e processamento de arquivos (pdf, jpg) para análise automatizada de documentos.",
    details: [
      "Processamento automático de documentos técnicos usando OCR e bibliotecas de leitura de arquivos",
      "Extração inteligente de informações relevantes",
      "Redução de 80% no tempo de análise manual",
      "Geração de resultados da análise em formatos estruturados",
    ],
    technologies: ["Python", "OCR", "Excel", "SQL"],
    metrics: {
      "Tempo Economizado": "80%",
      "Documentos Processados Diariamente": "200+",
      Precisão: "89%",
    },
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
  },
  5: {
    title: "Dashboard Integrado de Atividades",
    description:
      "Dashboard integrado para monitoramento das atividades de todas as empresas do grupo.",
    details: [
      "Dashboard interativo com histórico e acompanhamento de todas as atividades",
      "Acompanhamento de mais de 10 KPIs",
      "Alertas automáticos para prazos críticos",
      "Relatórios executivos automatizados semanais",
    ],
    technologies: ["Power BI", "SQL", "Excel", "Python"],
    metrics: {
      "KPIs Monitorados": "10+",
      "Usuários Ativos": "15+",
      Atualização: "5 vezes ao dia",
    },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  },
};

function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");
  const cards = document.querySelectorAll(".project-card");

  if (!track || !prevBtn || !nextBtn) return;

  // Calculate cards per view based on screen size
  function updateCardsPerView() {
    if (window.innerWidth < 768) {
      cardsPerView = 1;
    } else if (window.innerWidth < 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
    updateCarousel();
    createDots();
  }

  // Create navigation dots
  function createDots() {
    dotsContainer.innerHTML = "";
    const totalSlides = Math.ceil(cards.length / cardsPerView);

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem
    const offset = -(currentSlide * (cardWidth + gap) * cardsPerView);
    track.style.transform = `translateX(${offset}px)`;

    // Update dots
    document.querySelectorAll("#dotsContainer .dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // Remove button state changes for infinite carousel
    const totalSlides = Math.ceil(cards.length / cardsPerView);
  }

  function goToSlide(index) {
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
    updateCarousel();
  }

  prevBtn.addEventListener("click", () => {
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1; // Volta para o último
    }
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0; // Volta para o primeiro
    }
    updateCarousel();
  });

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      nextBtn.click();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right
      prevBtn.click();
    }
  }

  // Initialize
  updateCardsPerView();
  window.addEventListener("resize", updateCardsPerView);

  // Project card click handlers
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-project");
      openProjectModal(projectId);
    });
  });
}

// Project Modal functionality
function openProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const project = projectsData[projectId];

  if (!project) return;

  modalTitle.textContent = project.title;

  modalContent.innerHTML = `
        <div class="space-y-8">
            <img src="${project.image}" alt="${project.title}" class="w-full h-80 object-cover rounded-2xl">
            
            <div>
                <h4 class="text-lg font-semibold text-neutral-900 mb-3">Sobre o Projeto</h4>
                <p class="text-neutral-600 leading-relaxed">${project.description}</p>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-neutral-900 mb-4">Destaques</h4>
                <ul class="space-y-3">
                    ${project.details
                      .map(
                        (detail) => `
                        <li class="flex items-start gap-3">
                            <span class="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg class="w-3 h-3 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                            <span class="text-neutral-700">${detail}</span>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-neutral-900 mb-4">Tecnologias Utilizadas</h4>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies
                      .map(
                        (tech) => `
                        <span class="px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-full">
                            ${tech}
                        </span>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-neutral-900 mb-4">Resultados</h4>
                <div class="grid md:grid-cols-3 gap-6">
                    ${Object.entries(project.metrics)
                      .map(
                        ([key, value]) => `
                        <div class="bg-neutral-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                            <div class="text-3xl font-bold text-neutral-900 mb-2">${value}</div>
                            <div class="text-sm text-neutral-600">${key}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  // Re-initialize feather icons in modal
  setTimeout(() => feather.replace(), 100);
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

// Initialize modal close handlers
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeModal");
  const modal = document.getElementById("projectModal");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });

  // Initialize carousel
  initCarousel();
});
