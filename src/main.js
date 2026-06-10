import "./style.css";
import heroImg from "./assets/bertoni-hero.png";
import lineupImg from "./assets/bertoni-lineup-pose.png";

// src/main.js

/**
 * Sistema de Telemetria e Incrementação Dinâmica (Bertoni Performance Pro)
 * Desenvolvido por PEPA.DEV
 */
const initLiveStats = () => {
  const counters = document.querySelectorAll(".counter-up");
  const progressBars = document.querySelectorAll(".progress-fill");

  // Se não achar os elementos na tela, avisa no console para debug e sai safely
  if (!counters.length && !progressBars.length) {
    console.warn(
      "[Telemetria] Elementos de estatísticas não encontrados no DOM.",
    );
    return;
  }

  const startCounting = (element) => {
    const target = +element.getAttribute("data-target");
    const isFloat = element.getAttribute("data-float") === "true";
    const duration = 1500; // Tempo da animação em ms
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Amortecimento suave (Ease Out Cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      if (isFloat) {
        element.innerText = currentVal.toFixed(1);
      } else {
        element.innerText = Math.floor(currentVal);
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.innerText = isFloat ? target.toFixed(1) : target;
      }
    };

    requestAnimationFrame(updateNumber);
  };

  // Configuração do Observer com zona de ativação cirúrgica
  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Se for um contador numérico
          if (el.classList.contains("counter-up")) {
            startCounting(el);
          }

          // Se for uma barra de força physiological
          if (el.classList.contains("progress-fill")) {
            const width = el.getAttribute("data-width");
            el.style.width = width;
          }

          // Para de observar o elemento para não re-disparar ao rolar de volta
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }, // Dispara quando 15% do elemento brotar na tela
  );

  // Vincula os elementos ao observer
  counters.forEach((counter) => statsObserver.observe(counter));
  progressBars.forEach((bar) => statsObserver.observe(bar));
};

// 1. INJETA O HTML PRIMEIRO
document.querySelector("#app").innerHTML = `
<section class="relative min-h-screen flex items-center overflow-hidden bg-slate-950 font-inter">
    <div class="absolute inset-0 z-0">
        <div class="w-full h-full bg-cover bg-position-[75%_center] md:bg-top transform scale-105 animate-hero-bg" style="background-image: url('${heroImg}');"></div>
        <div class="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent hidden lg:block"></div>
        <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-slate-950/20 lg:hidden"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-6 space-y-6 max-w-xl animate-fade-in-up">
            <span class="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all hover:bg-amber-500/20">
                // DUBAI BOUND 2026
            </span>
            <h1 class="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-2xl">
                BERTONI
            </h1>
            <p class="text-lg text-slate-300 leading-relaxed font-light">
                A força bruta encontra a precisão. Terceira Linha de Elite, pronto para dominar os gramados internacionais.
            </p>
            <div class="pt-4">
                <a href="#contato" class="inline-block bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-sm px-10 py-5 rounded transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:translate-y-0 shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] bg-linear-to-r hover:from-amber-400 hover:to-amber-500">
                    Fale com o Atleta
                </a>
            </div>
        </div>
    </div>
</section>

<section class="bg-slate-950 text-slate-100 py-24 border-t border-slate-900/50 overflow-hidden scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div class="lg:col-span-5 flex justify-center">
                <div class="relative w-full max-w-md aspect-3/4 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500 shadow-2xl transition-all duration-500 group cursor-pointer hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]">
                    <div class="w-full h-full bg-cover bg-center filter brightness-105 contrast-110 saturate-[0.7] group-hover:saturate-110 transition-all duration-700 ease-out group-hover:scale-108" style="background-image: url('${lineupImg}');"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div class="absolute bottom-6 left-6 font-mono text-xs text-amber-500/60 uppercase tracking-widest transition-all group-hover:text-amber-400 group-hover:translate-x-1">
                        [ OFFICIAL PRO CARD / ID-2026 ]
                    </div>
                </div>
            </div>

            <div class="lg:col-span-7 space-y-8">
                <div class="space-y-2">
                    <span class="text-xs font-mono tracking-widest text-amber-500 uppercase">// REGISTRO DE SELEÇÃO</span>
                    <h2 class="text-4xl font-black uppercase tracking-tight">Estatísticas Operacionais</h2>
                    <p class="text-slate-400 text-sm">Dados físicos validados para a temporada do circuito de Dublin.</p>
                </div>

                <div class="grid grid-cols-2 gap-y-6 gap-x-8 border-t border-b border-slate-900 py-8">
                    <div class="space-y-1 group cursor-default p-2 rounded-lg transition-all duration-300 hover:bg-slate-900/40">
                        <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-500">Posição Principal</p>
                        <p class="text-xl font-bold text-slate-200 uppercase transition-all group-hover:translate-x-1 group-hover:text-white">Terceira Linha / Flanker</p>
                    </div>
                    <div class="space-y-1 group cursor-default p-2 rounded-lg transition-all duration-300 hover:bg-slate-900/40">
                        <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-500">Massa Corporal</p>
                        <p class="text-xl font-bold text-slate-200 uppercase transition-all group-hover:translate-x-1 group-hover:text-white">108 kg (Massa Magra)</p>
                    </div>
                    <div class="space-y-1 group cursor-default p-2 rounded-lg transition-all duration-300 hover:bg-slate-900/40">
                        <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-500">Nacionalidade</p>
                        <p class="text-xl font-bold text-slate-200 uppercase transition-all group-hover:translate-x-1 group-hover:text-white">Brasileiro (Janela Europeia)</p>
                    </div>
                    <div class="space-y-1 group cursor-default p-2 rounded-lg transition-all duration-300 hover:bg-slate-900/40">
                        <p class="text-slate-500 font-mono text-xs uppercase tracking-wider text-amber-500">Eficiência de Tackle</p>
                        <p class="text-xl font-bold text-amber-500 uppercase transition-all group-hover:translate-x-1 shadow-amber-500">94.2% Concluídos</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400">// ÍNDICES DE FORÇA FISIOLÓGICA</h4>
                    <div class="space-y-4">
                        <div class="space-y-1 group">
                            <div class="flex justify-between text-xs font-mono">
                                <span class="text-slate-300 group-hover:text-white transition-colors">Impacto e Quebra de Linha de Ganho</span>
                                <span class="text-amber-500 font-bold transform group-hover:scale-110 transition-transform">
                                    <span class="counter-up" data-target="96" data-float="false">0</span>%
                                </span>
                            </div>
                            <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 transition-colors group-hover:border-slate-700">
                                <div class="progress-fill bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-1000 ease-out" style="width: 0%" data-width="96%"></div>
                            </div>
                        </div>
                        <div class="space-y-1 group">
                            <div class="flex justify-between text-xs font-mono">
                                <span class="text-slate-300 group-hover:text-white transition-colors">Recuperação e Carga Aeróbica (Work Rate)</span>
                                <span class="text-amber-500 font-bold transform group-hover:scale-110 transition-transform">
                                    <span class="counter-up" data-target="89" data-float="false">0</span>%
                                </span>
                            </div>
                            <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 transition-colors group-hover:border-slate-700">
                                <div class="progress-fill bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-1000 ease-out" style="width: 0%" data-width="89%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<section class="bg-slate-950 text-slate-100 py-24 border-t border-slate-900/50 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5 space-y-6">
                <span class="text-xs font-mono tracking-widest text-amber-500 uppercase">// PERFIL E POSICIONAMENTO</span>
                <h2 class="text-4xl lg:text-5xl font-black tracking-tight uppercase font-sans">
                    A Evolução do <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600">Terceira Linha</span>
                </h2>
                <p class="text-slate-400 leading-relaxed text-lg">
                    Surgido nos gramados mais físicos e disputados, Bertoni consolidou sua reputação através de uma mentalidade implacável de impacto e resiliência. Atuando na terceira linha, ele combina a velocidade de um back com a força bruta necessária para ditar o ritmo do scrum.
                </p>
            </div>
            
            <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-slate-900/30 border border-slate-900 p-8 rounded-xl backdrop-blur-sm space-y-4 transform transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/80 hover:border-amber-500/40 group cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div class="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 font-mono font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]">01</div>
                    <h3 class="text-xl font-bold uppercase tracking-tight group-hover:text-amber-400 transition-colors">Presença de Ruck Cega</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Velocidade de reação superior para garantir turnovers e estabilizar a posse sob extrema pressão física.</p>
                </div>
                <div class="bg-slate-900/30 border border-slate-900 p-8 rounded-xl backdrop-blur-sm space-y-4 transform transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/80 hover:border-amber-500/40 group cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div class="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 font-mono font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]">02</div>
                    <h3 class="text-xl font-bold uppercase tracking-tight group-hover:text-amber-400 transition-colors">Metros Avançados</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Capacidade explosiva de quebrar a primeira linha de tackle e continuar gerando momentum positivo em campo.</p>
                </div>
                <div class="bg-slate-900/30 border border-slate-900 p-8 rounded-xl backdrop-blur-sm space-y-4 transform transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/80 hover:border-amber-500/40 group cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div class="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 font-mono font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]">03</div>
                    <h3 class="text-xl font-bold uppercase tracking-tight group-hover:text-amber-400 transition-colors">Liderança de Pack</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Voz ativa na coordenação defensiva e na engrenagem dos forwards, ditando agressividade com inteligência tática.</p>
                </div>
                <div class="bg-slate-900/30 border border-slate-900 p-8 rounded-xl backdrop-blur-sm space-y-4 transform transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/80 hover:border-amber-500/40 group cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div class="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 font-mono font-bold transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]">04</div>
                    <h3 class="text-xl font-bold uppercase tracking-tight group-hover:text-amber-400 transition-colors">Dossier de Cobertura</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Leitura de jogo apurada para cobrir o campo profundo e neutralizar chutes táticos adversários.</p>
                </div>
            </div>
        </div>
    </div>
</section>
    
<section class="bg-slate-950 text-slate-100 py-24 border-t border-slate-900/50 scroll-reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="text-xs font-mono tracking-widest text-amber-500 uppercase">// MÉTRICAS EXPANDIDAS</span>
            <h2 class="text-4xl font-black uppercase tracking-tight">Performance e Volume de Jogo</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="border-l-2 border-slate-800 hover:border-amber-500 pl-6 space-y-2 transition-all duration-300 group cursor-default hover:bg-slate-900/20 py-2 rounded-r-lg">
                <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-400">Tackles Dominantes</p>
                <p class="text-5xl font-black tracking-tight transform transition-transform duration-300 group-hover:translate-x-1 text-slate-300 group-hover:text-white">
                    <span class="counter-up" data-target="4.2" data-float="true">0.0</span><span class="text-amber-500 text-2xl transition-all group-hover:ml-1">/g</span>
                </p>
            </div>
            <div class="border-l-2 border-slate-800 hover:border-amber-500 pl-6 space-y-2 transition-all duration-300 group cursor-default hover:bg-slate-900/20 py-2 rounded-r-lg">
                <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-400">Offloads de Sucesso</p>
                <p class="text-5xl font-black tracking-tight transform transition-transform duration-300 group-hover:translate-x-1 text-slate-300 group-hover:text-white">
                    <span class="counter-up" data-target="89" data-float="false">0</span><span class="text-amber-500 text-2xl transition-all group-hover:ml-1">%</span>
                </p>
            </div>
            <div class="border-l-2 border-slate-800 hover:border-amber-500 pl-6 space-y-2 transition-all duration-300 group cursor-default hover:bg-slate-900/20 py-2 rounded-r-lg">
                <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-400">Turnovers Conquistados</p>
                <p class="text-5xl font-black tracking-tight transform transition-transform duration-300 group-hover:translate-x-1 text-slate-300 group-hover:text-white">
                    <span class="counter-up" data-target="1.8" data-float="true">0.0</span><span class="text-amber-500 text-2xl transition-all group-hover:ml-1">/g</span>
                </p>
            </div>
            <div class="border-l-2 border-slate-800 hover:border-amber-500 pl-6 space-y-2 transition-all duration-300 group cursor-default hover:bg-slate-900/20 py-2 rounded-r-lg">
                <p class="text-slate-500 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-amber-400">Minutos Jogados</p>
                <p class="text-5xl font-black tracking-tight transform transition-transform duration-300 group-hover:translate-x-1 text-slate-300 group-hover:text-white">
                    <span class="counter-up" data-target="78" data-float="false">0</span><span class="text-amber-500 text-2xl transition-all group-hover:ml-1">min</span>
                </p>
            </div>
        </div>
    </div>
</section>

<section class="bg-slate-950 text-slate-100 py-24 border-t border-slate-900/50 scroll-reveal">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div class="space-y-4">
            <span class="text-xs font-mono tracking-widest text-amber-500 uppercase">// CALENDÁRIO OPERACIONAL</span>
            <h2 class="text-4xl font-black uppercase tracking-tight">Planejamento Estratégico 2026</h2>
        </div>

        <div class="relative border-l border-slate-900 ml-4 md:ml-32 space-y-12 scroll-timeline-line">
            <div class="relative pl-8 md:pl-12 group cursor-default">
                <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-800 ring-4 ring-slate-950 group-hover:bg-amber-500 group-hover:ring-amber-500/30 transition-all duration-300 group-hover:scale-125"></div>
                <div class="absolute -left-32 top-1 hidden md:block text-right w-24 font-mono text-sm text-slate-500 group-hover:text-amber-500 transition-colors duration-300">Q1 - 2026</div>
                <div class="space-y-2 transform transition-all duration-300 group-hover:translate-x-2">
                    <h3 class="text-xl font-bold uppercase text-slate-200 group-hover:text-white">Aclimatração e Camp de Elite</h3>
                    <p class="text-slate-400 text-sm max-w-2xl leading-relaxed">Integração aos centros de treinamento de alta performance na Irlanda. Foco em otimização metabólica e força reativa para suportar o clima europeu.</p>
                </div>
            </div>
            <div class="relative pl-8 md:pl-12 group cursor-default">
                <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-800 ring-4 ring-slate-950 group-hover:bg-amber-500 group-hover:ring-amber-500/30 transition-all duration-300 group-hover:scale-125"></div>
                <div class="absolute -left-32 top-1 hidden md:block text-right w-24 font-mono text-sm text-slate-500 group-hover:text-amber-500 transition-colors duration-300">Q2 - 2026</div>
                <div class="space-y-2 transform transition-all duration-300 group-hover:translate-x-2">
                    <h3 class="text-xl font-bold uppercase text-slate-200 group-hover:text-white">Janela de Matchplay Internacional</h3>
                    <p class="text-slate-400 text-sm max-w-2xl leading-relaxed">Inserção nos principais torneios regionais e amistosos de exibição de alto nível. Teste de carga e entrosamento tático no circuito de Dublin.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 py-24 border-t border-slate-900/50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 class="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
            Pronto para Investimento <br>e Parcerias de Elite
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Conecte sua marca ao topo do desempenho esportivo. Estamos abrindo cotas exclusivas de patrocínio corporativo para a jornada em Dublin.
        </p>
        <div class="pt-4 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <a href="#" class="w-full sm:w-auto px-8 py-4 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-sm rounded transform transition-all duration-300 hover:bg-amber-400 hover:-translate-y-1 hover:scale-105 active:translate-y-0 shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                Solicitar Media Kit Completo
            </a>
        </div>
    </div>
</section>

<section class="bg-slate-950 text-slate-100 py-24 border-t border-slate-900/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div class="space-y-2">
                <div class="flex flex-wrap items-center gap-3">
                    <span class="text-xs font-mono tracking-widest text-amber-500 uppercase">// VISUAL DOSSIER</span>
                    <span class="text-slate-600 font-mono text-[10px] tracking-wider uppercase">
                        / ACOMPANHE NO INSTAGRAM 
                        <a href="https://instagram.com/bertoni_elgenerico" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-amber-500 transition-colors duration-300 ml-1">@bertoni_elgenerico</a>
                    </span>
                </div>
                <h2 class="text-4xl font-black uppercase tracking-tight">Recursos de Imprensa e Mídia</h2>
            </div>
            <p class="font-mono text-[11px] text-slate-500 max-w-xs md:text-right">
                [ DISTRIBUIÇÃO DE ARQUIVOS EM ALTA DENSIDADE. CLIQUE PARA ABRIR A FOTOGRAFIA CINEMATOGRÁFICA ORIGINAL. ]
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <a href="${heroImg}" target="_blank" class="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-900 hover:border-amber-500/50 transition-all duration-500 block shadow-2xl">
                <div class="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" style="background-image: url('${heroImg}');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
                
                <div class="absolute top-4 left-4 font-mono text-[9px] bg-slate-950/80 text-slate-400 border border-slate-800 px-2 py-0.5 rounded tracking-widest uppercase">
                    ASSET_01 // RAW
                </div>

                <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span class="font-mono text-[10px] text-amber-400 tracking-wider">[ OPEN FULL RES JPG ]</span>
                    <span class="text-white text-xs font-bold font-mono">↓ DOWNLOAD</span>
                </div>
            </a>

            <a href="${heroImg}" target="_blank" class="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-900 hover:border-amber-500/50 transition-all duration-500 block shadow-2xl">
                <div class="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" style="background-image: url('${heroImg}');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
                
                <div class="absolute top-4 left-4 font-mono text-[9px] bg-slate-950/80 text-slate-400 border border-slate-800 px-2 py-0.5 rounded tracking-widest uppercase">
                    ASSET_02 // RAW
                </div>

                <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span class="font-mono text-[10px] text-amber-400 tracking-wider">[ OPEN FULL RES JPG ]</span>
                    <span class="text-white text-xs font-bold font-mono">↓ DOWNLOAD</span>
                </div>
            </a>

            <a href="${heroImg}" target="_blank" class="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-900 hover:border-amber-500/50 transition-all duration-500 block shadow-2xl">
                <div class="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" style="background-image: url('${heroImg}');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
                
                <div class="absolute top-4 left-4 font-mono text-[9px] bg-slate-950/80 text-slate-400 border border-slate-800 px-2 py-0.5 rounded tracking-widest uppercase">
                    ASSET_03 // RAW
                </div>

                <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span class="font-mono text-[10px] text-amber-400 tracking-wider">[ OPEN FULL RES JPG ]</span>
                    <span class="text-white text-xs font-bold font-mono">↓ DOWNLOAD</span>
                </div>
            </a>

            <a href="${heroImg}" target="_blank" class="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-900 hover:border-amber-500/50 transition-all duration-500 block shadow-2xl">
                <div class="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out" style="background-image: url('${heroImg}');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
                
                <div class="absolute top-4 left-4 font-mono text-[9px] bg-slate-950/80 text-slate-400 border border-slate-800 px-2 py-0.5 rounded tracking-widest uppercase">
                    ASSET_04 // RAW
                </div>

                <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span class="font-mono text-[10px] text-amber-400 tracking-wider">[ OPEN FULL RES JPG ]</span>
                    <span class="text-white text-xs font-bold font-mono">↓ DOWNLOAD</span>
                </div>
            </a>

        </div>
    </div>
</section>

<footer class="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left">
            <span class="text-lg font-black text-slate-200 font-sans tracking-widest uppercase">BERTONI</span>
            <p class="text-xs mt-1 font-mono">// ATHLETE BRAND INFRASTRUCTURE</p>
        </div>
        <div class="flex gap-6 text-sm font-mono">
            <a href="#" class="hover:text-amber-500 transition-colors duration-300">STATS</a>
            <a href="#" class="hover:text-amber-500 transition-colors duration-300">TIMELINE</a>
            <a href="#" class="hover:text-amber-500 transition-colors duration-300">MEDIA KIT</a>
        </div>
        <div class="text-xs font-mono text-center md:text-right">
            <p>&copy; 2026 BERTONI PROJECT. TODOS OS DIREITOS RESERVADOS.</p>
            <p class="text-slate-700 mt-0.5">DESIGNED FOR HIGH-DENSITY PERFORMANCE PAGES.</p>
        </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex items-center gap-2 tracking-widest uppercase text-[10px] font-mono">
        <span>CHASSIS DESIGNED BY</span>
        <a href="https://pepa.dev.br/" target="_blank" rel="noopener noreferrer" class="relative group font-black text-amber-500 hover:text-white transition-colors duration-300 px-2 py-1 rounded bg-amber-500/5 border border-amber-500/10 hover:border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span class="relative z-10">[ PEPA.DEV.br ]</span>
            <span class="absolute inset-0 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-sm -z-0"></span>
        </a>
    </div>
</footer>
`;

// 2. DISPARA A INICIALIZAÇÃO DA TELEMETRIA DEPOIS QUE O HTML JÁ ESTÁ MONTADO NO DOM
initLiveStats();
