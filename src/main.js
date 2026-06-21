import "@/src/style.css"; // Aponta direto para o style.css na raiz, independente de onde o main.js estiver!
import heroImg from "@/src/assets/bertoni-hero.webp";
import lineupImg from "@/src/assets/bertoni-lineup-pose.webp";


document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const isBr = window.location.pathname.startsWith('/br');

  if (isBr) {
    localStorage.setItem('user-lang', 'en');
    window.location.pathname = '/';
  } else {
    localStorage.setItem('user-lang', 'br');
    window.location.pathname = '/br/';
  }
});


/**
 * Sistema de Performance Base e Telemetria (Bertoni Performance Pro)
 * Desenvolvido por PEPA.DEV
 * - Animação de contadores e barras de progresso ativada ao entrar na viewport
 * - Fácil de usar: basta adicionar classes e data-attributes nos elementos HTML
 * - Suporte para números inteiros e decimais, com easing suave
 * - Observação eficiente usando IntersectionObserver para ativar animações apenas quando necessário
 * - Recomendado para estatísticas, métricas de desempenho, ou qualquer número que precise de destaque visual
 * - Personalizável via CSS para se adequar ao estilo do seu site
 * - Exemplo de uso:
 *   <div class="counter-up" data-target="1500" data-float="false">0</div>
 *   <div class="progress-fill" data-width="80%"></div>
 */
const initLiveStats = () => {
  const counters = document.querySelectorAll(".counter-up");
  const progressBars = document.querySelectorAll(".progress-fill");

  if (!counters.length && !progressBars.length) {
    console.warn("[Telemetria] Elementos de estatísticas não encontrados.");
    return;
  }

  const startCounting = (element) => {
    const target = +element.getAttribute("data-target");
    const isFloat = element.getAttribute("data-float") === "true";
    const duration = 1500;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      element.innerText = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.innerText = isFloat ? target.toFixed(1) : target;
      }
    };
    requestAnimationFrame(updateNumber);
  };

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.classList.contains("counter-up")) startCounting(el);
          if (el.classList.contains("progress-fill")) el.style.width = el.getAttribute("data-width");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 },
  );

  counters.forEach((counter) => statsObserver.observe(counter));
  progressBars.forEach((bar) => statsObserver.observe(bar));
};

/**
 * Injeção de Assets e Imagens com Hash do Vite
 */
const injectDynamicAssets = () => {
  const heroBg = document.getElementById("hero-bg-target");
  const lineupBg = document.getElementById("lineup-bg-target");
  const mediaGrid = document.querySelector(".data-media-grid");

  if (heroBg) heroBg.style.backgroundImage = `url('${heroImg}')`;
  if (lineupBg) lineupBg.style.backgroundImage = `url('${lineupImg}')`;

  // Renderiza o grid de mídia preservando as referências corretas
  if (mediaGrid) {
    let gridHTML = "";
    for (let i = 1; i <= 4; i++) {
      gridHTML += `
        <a href="${heroImg}" target="_blank" class="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-900 hover:border-amber-500/50 transition-all duration-500 block shadow-2xl">
            <div class="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" style="background-image: url('${heroImg}');"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
            <div class="absolute top-4 left-4 font-mono text-[9px] bg-slate-950/80 text-slate-400 border border-slate-800 px-2 py-0.5 rounded tracking-widest uppercase">
                ASSET_0${i} // RAW
            </div>
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span class="font-mono text-[10px] text-amber-400 tracking-wider">[ OPEN FULL RES PHOTO ]</span>
                <span class="text-white text-xs font-bold font-mono">↓ DOWNLOAD</span>
            </div>
        </a>`;
    }
    mediaGrid.innerHTML = gridHTML;
  }
};

// Inicialização segura no carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  injectDynamicAssets();
  initLiveStats();
});