
  //  the papyrus video  





/* ===========================================================================
   main.js  –  multilingual papyrus‑video + Typed.js logic
   ---------------------------------------------------------------------------
   • Handles in‑page translation of all elements that carry a data‑i18n attr
   • Plays the video once it scrolls into view
   • Runs a language‑aware Typed.js animation on top of the papyrus background
   • Exposes setLanguage('en' | 'ar' | 'pt') globally for your dropdown
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.getElementById('about');
  const papyrusVideo = aboutSection.querySelector('.papyrus-video');
  const achievementsContainer = aboutSection.querySelector('.achievements-container');
  const typedContainer = document.getElementById('typed-paragraphs-container');

  const paragraphsByLang = {
    en: [
      "I’m a UK-based consultant surgeon offering affordable, high-quality bariatric surgery in premiere hospitals in Egypt, in affiliation with a trusted experienced Egyptian surgical team.",
      "Unlike many overseas options, you won’t be left without support. Your safety and long‑term success are my top priorities.",
      "This is a full journey — not just an operation. I provide comprehensive care from pre‑operative assessment in the UK, to surgery abroad, and full follow‑up back home."
    ],
    ar: [
      "أنا جراح استشاري مقيم في المملكة المتحدة أقدم جراحات السمنة عالية الجودة وبأسعار معقولة في مستشفيات مرموقة في مصر بالتعاون مع فريق جراحي مصري موثوق.",
      "على عكس العديد من الخيارات الخارجية، لن تُترك بدون دعم. سلامتُك ونجاحُك على المدى الطويل هما أولويتي القصوى.",
      "هذه رحلة كاملة – ليست مجرد عملية. أُقدم رعاية شاملة من التقييم قبل الجراحة في المملكة المتحدة إلى الجراحة في الخارج، والمتابعة الكاملة في بلدك."
    ],
    pt: [
      "Sou um cirurgião consultor sediado no Reino Unido que oferece cirurgias bariátricas acessíveis e de alta qualidade em hospitais de destaque no Egito, em parceria com uma equipe cirúrgica egípcia experiente.",
      "Ao contrário de muitas opções internacionais, você não ficará sem suporte. Sua segurança e sucesso a longo prazo são minhas maiores prioridades.",
      "Esta é uma jornada completa — não apenas uma operação. Ofereço cuidados abrangentes desde a avaliação pré‑operatória no Reino Unido até a cirurgia no exterior e o acompanhamento completo em casa."
    ]
  };

  let currentLang = 'en';
  let paragraphIndex = 0;
  let hasVideoPlayed = false;
  let currentTypedInstance = null;

  function typeNextParagraph() {
    const paragraphs = paragraphsByLang[currentLang];
    if (!paragraphs || paragraphIndex >= paragraphs.length) return;

    const span = document.createElement('span');
    span.id = `typed-paragraph-${paragraphIndex}`;
    typedContainer.appendChild(span);

    currentTypedInstance = new Typed(span, {
      strings: [paragraphs[paragraphIndex]],
      typeSpeed: 30,
      backSpeed: 0,
      showCursor: true,
      cursorChar: '|',
      loop: false,
      onComplete: (self) => {
        self.cursor.remove();
        paragraphIndex++;
        setTimeout(typeNextParagraph, 800);
      }
    });
  }

  function startTyping() {
    paragraphIndex = 0;
    typedContainer.innerHTML = '';
    if (currentTypedInstance) currentTypedInstance.destroy();
    typeNextParagraph();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasVideoPlayed) {
        const play = () => {
          papyrusVideo.play();
          hasVideoPlayed = true;
        };
        if (papyrusVideo.readyState >= 1) {
          play();
        } else {
          papyrusVideo.addEventListener('canplaythrough', play, { once: true });
        }
      }
    });
  }, { threshold: 0.1 });

  observer.observe(aboutSection);

  papyrusVideo.addEventListener('play', () => {
    achievementsContainer.classList.add('is-visible');
    startTyping();
  }, { once: true });

  papyrusVideo.onerror = () => {
    console.error("Papyrus video failed. Showing static content.");
    achievementsContainer.classList.add('is-visible');
    typedContainer.innerHTML = (paragraphsByLang[currentLang] || []).map(p => `<span>${p}</span>`).join('');
  };

  // 💡 Global function you call from your language switch
 window.updateAboutLanguage = function (lang, externalParagraphs = null) {
  currentLang = lang;

  // If passed manually (from JSON), override the paragraph list
  if (externalParagraphs) {
    paragraphsByLang[lang] = externalParagraphs;
  }

  if (hasVideoPlayed) {
    paragraphIndex = 0;
    typedContainer.innerHTML = '';
    if (currentTypedInstance) currentTypedInstance.destroy();
    typeNextParagraph();
  }
};

});








    
    
 // swiperJs slider 

    const swiper = new Swiper(".mySwiper", {
      loop: true,
  
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "fade", // You can also try "slide", "cube", "coverflow", etc.
      speed: 800,
    });













const navLinks = document.querySelectorAll('.nav-link');

// Add click event listener to each nav link
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Observe each section and update nav based on scroll
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').replace('#', '') === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  {
    root: null,
    threshold: 0.6, // Section is 60% in view
  }
);

// Attach observer to each section
sections.forEach(section => observer.observe(section));















    // Observe the about section
    observer.observe(document.querySelector('#about'));
    let currentIndex = 0;
    const slides = document.getElementById('slideContainer');
    const totalSlides = slides.children.length;



    document.addEventListener("DOMContentLoaded", () => {
      const lines = document.querySelectorAll(".uk-egypt .letters");
  
      lines.forEach((line, lineIndex) => {
        const text = line.textContent.trim();
        line.innerHTML = ''; // Clear content
  
        [...text].forEach((char, charIndex) => {
          const span = document.createElement("span");
          span.textContent = char;
  
          // Only make the first letter of each line gold
          if (charIndex === 0 || char === '-') {
            span.style.color = 'gold';
          }
  
          // Animation delay per letter + line
          span.style.animationDelay = `${(lineIndex * 1.2 + charIndex * 0.1)}s`;
  
          line.appendChild(span);
        });
      });
    });














    // start of the multipule languages 
   function setLanguage(lang) {
  fetch(`./lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      // Update other translated elements
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) {
          el.innerHTML = data[key]; // ✅ Supports <br> and rich text
        }
      });

      // ✅ Update Papyrus typed paragraphs
      if (data.about_paragraphs && Array.isArray(data.about_paragraphs)) {
        window.updateAboutLanguage(lang, data.about_paragraphs);
      }

      // ✅ Handle text direction for Arabic
      if (lang === "ar") {
        // document.body.setAttribute("dir", "rtl");
        document.body.style.textAlign = "right";
      } else {
        document.body.setAttribute("dir", "ltr");
        document.body.style.textAlign = "left";
      }
    })
    .catch(error => {
      console.error(`Error loading ${lang}.json:`, error);
    });
}

    
   
    











    // end of multi language 