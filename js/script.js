/**
 * SITE INTERATIVO - JAVASCRIPT COMPLETO
 * Contém todos os efeitos especiais, modos e interações
 */

// =============================================
// CONFIGURAÇÕES INICIAIS
// =============================================

// Detecção de dispositivo móvel
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// =============================================
// SISTEMA DE MODOS ESPECIAIS
// =============================================

// Definição dos modos disponíveis
const modes = {
  NORMAL: null,
  SHAKE: "shake-mode",
  RAINBOW: "rainbow-mode",
  KONAMI: "konami-mode",
  CRAZY_CURSOR: "crazy-cursor",
  DISCO: "disco-mode",
  FUN: "fun-mode",
};

let currentMode = modes.NORMAL;
let modeTimeout = null;

// Ativa/desativa modos
function toggleMode(mode, duration = null) {
  // Se já está no modo solicitado, desativa
  if (currentMode === mode) {
    deactivateMode(mode);
    return;
  }

  // Desativa o modo atual
  if (currentMode !== modes.NORMAL) {
    deactivateMode(currentMode);
  }

  // Ativa o novo modo
  activateMode(mode, duration);
}

function activateMode(mode, duration = null) {
  document.body.classList.add(mode);
  currentMode = mode;

  showMessage(`Modo ${getModeName(mode)} ativado!`);

  // Configura timeout para modos temporários
  if (duration) {
    clearTimeout(modeTimeout);
    modeTimeout = setTimeout(() => {
      if (currentMode === mode) {
        deactivateMode(mode);
      }
    }, duration);
  }
}

function deactivateMode(mode) {
  document.body.classList.remove(mode);
  currentMode = modes.NORMAL;
  showMessage(`Modo ${getModeName(mode)} desativado`);
  clearTimeout(modeTimeout);
}

function getModeName(mode) {
  const names = {
    [modes.SHAKE]: "Dançante 🕺",
    [modes.RAINBOW]: "Arco-Íris 🌈",
    [modes.KONAMI]: "Konami Code 🎮",
    [modes.CRAZY_CURSOR]: "Cursor Louco 🐇",
    [modes.DISCO]: "Disco 🪩",
    [modes.FUN]: "Divertido 😄",
  };
  return names[mode] || "Normal";
}

// =============================================
// IMPLEMENTAÇÃO DOS MODOS ESPECIAIS
// =============================================

// 1. MODO SHAKE (Dispositivos móveis)
let lastShakeTime = 0;
let shakeCount = 0;

function handleShake(e) {
  if (!isMobile) return;

  const acceleration = e.accelerationIncludingGravity;
  const shakeIntensity =
    Math.abs(acceleration.x) +
    Math.abs(acceleration.y) +
    Math.abs(acceleration.z);
  const currentTime = Date.now();

  if (shakeIntensity > 25 && currentTime - lastShakeTime > 800) {
    lastShakeTime = currentTime;
    shakeCount++;

    if (shakeCount >= 3) {
      toggleMode(modes.SHAKE);
      shakeCount = 0;
    }
  }
}

// 2. MODO RAINBOW (Toque triplo em mobile)
let lastTapTime = 0;
let tapCount = 0;

function handleTripleTap(e) {
  if (!isMobile) return;

  const currentTime = new Date().getTime();
  const tapInterval = currentTime - lastTapTime;

  if (tapInterval < 300 && tapInterval > 0) {
    tapCount++;
    if (tapCount >= 2) {
      createTapEffect(e.touches[0].clientX, e.touches[0].clientY);
      toggleMode(modes.RAINBOW, 5000);
      tapCount = 0;
    }
  } else {
    tapCount = 0;
  }
  lastTapTime = currentTime;
}

// 3. KONAMI CODE (↑↑↓↓←→←→BA)
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

function handleKonamiCode(e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      toggleMode(modes.KONAMI);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
}

// 4. CURSOR LOUCO (Duplo clique)
function handleDoubleClick() {
  toggleMode(modes.CRAZY_CURSOR);
}

// 5. MODO DISCO (Tecla 'd')
function handleDiscoMode(e) {
  if (e.key === "d" || e.key === "D") {
    toggleMode(modes.DISCO);
  }
}

// 6. MODO DIVERTIDO (Easter egg)
function setupFunModeEasterEgg() {
  const easterEgg = document.getElementById("easter-egg");
  if (easterEgg) {
    easterEgg.addEventListener("click", () => {
      toggleMode(modes.FUN);
    });
  }
}

// =============================================
// EFEITOS VISUAIS E ANIMAÇÕES
// =============================================

// Efeito de toque na tela
function createTapEffect(x, y) {
  const colors = ["#ff5c8a", "#4cc9f0", "#9d4edd", "#ffd166"];
  const effect = document.createElement("div");
  effect.className = "tap-effect";
  effect.style.left = `${x - 30}px`;
  effect.style.top = `${y - 30}px`;
  effect.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 600);
}

// Efeito de confete
function createConfettiEffect(element) {
  const colors = ["#ff5c8a", "#4cc9f0", "#9d4edd", "#ffd166"];
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top;

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${centerX}px`;
    confetti.style.top = `${centerY}px`;
    confetti.style.backgroundColor = colors[i % colors.length];
    confetti.style.setProperty("--random-x", Math.random() * 200 - 100);
    confetti.style.setProperty("--random-y", Math.random() * 100 + 50);
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

// Mensagem flutuante
function showMessage(text) {
  const existing = document.querySelector(".mobile-message");
  if (existing) existing.remove();

  const message = document.createElement("div");
  message.className = "mobile-message";
  message.textContent = text;
  document.body.appendChild(message);

  setTimeout(() => {
    message.style.opacity = "0";
    setTimeout(() => message.remove(), 500);
  }, 2000);
}

// =============================================
// COMPONENTES INTERATIVOS
// =============================================

// Cursor personalizado
function setupCustomCursor() {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .clickable, [data-hover]"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.backgroundColor =
        el.dataset.hoverColor || "rgba(255, 215, 0, 0.7)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "rgba(255, 92, 138, 0.7)";
    });
  });
}

// Easter Egg da Letra Y
function setupLetterYEasterEgg() {
  const letterY = document.querySelector(".special-letter");
  if (!letterY) return;

  let tapCount = 0;
  let lastTap = 0;

  const handler = isMobile ? "touchstart" : "click";

  letterY.addEventListener(
    handler,
    function (e) {
      if (isMobile) e.preventDefault();

      const now = Date.now();
      if (now - lastTap < 300) {
        tapCount++;
        if (tapCount >= 5) {
          revealYSecret();
          tapCount = 0;
        }
      } else {
        tapCount = 1;
      }
      lastTap = now;
    },
    { passive: false }
  );
}

function revealYSecret() {
  const yContainer = document.querySelector(".special-letter");
  if (yContainer && !yContainer.querySelector(".secret-message")) {
    const message = document.createElement("div");
    message.className = "secret-message";
    message.innerHTML =
      "🎊 <strong>Você é persistente!</strong> 🎊<br>Jamily significa J.O.V.E.M incrível!";
    yContainer.appendChild(message);
    createConfettiEffect(yContainer);
  }
}

// Animação de digitação
function setupTypewriterEffect() {
  const element = document.getElementById("typed-text");
  if (!element) return;

  const text =
    element.getAttribute("data-text") ||
    "Prazer em te conhecer, Jamily.\nEsse site foi feito especialmente com seu nome... por alguém que acha você incrível e divertida.";
  let i = 0;

  element.innerHTML = "";
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "|";
  element.appendChild(cursor);

  function typeWriter() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(typeWriter, Math.random() * 50 + 30);
    } else {
      cursor.style.display = "none";
      const finalBtn = document.getElementById("final-btn");
      if (finalBtn) finalBtn.classList.remove("hidden");
    }
  }

  setTimeout(typeWriter, 1000);
}

// Animação das letras
function setupLetterAnimations() {
  const container = document.getElementById("letter-animation");
  if (!container) return;

  const letterMeanings = [
    { letter: "J", meaning: "Jovem de luz" },
    { letter: "A", meaning: "Autêntica de verdade" },
    { letter: "M", meaning: "Misteriosa (como esse site 👀)" },
    { letter: "I", meaning: "Iluminada" },
    { letter: "L", meaning: "Linda, mas isso você já sabia" },
    { letter: "Y", meaning: "You're amazing", special: true },
  ];

  letterMeanings.forEach((item, index) => {
    setTimeout(() => {
      const letterDiv = document.createElement("div");
      letterDiv.className = `letter-card ${
        item.special ? "special-letter" : ""
      }`;
      letterDiv.innerHTML = `
        <div class="letter-char">${item.letter}</div>
        <div class="letter-meaning">→ ${item.meaning}</div>
      `;
      container.appendChild(letterDiv);

      setTimeout(() => {
        letterDiv.style.opacity = "1";
        letterDiv.style.transform = "translateY(0)";
      }, 50);

      if (index === letterMeanings.length - 1) {
        const continueBtn = document.getElementById("continue-btn");
        if (continueBtn) continueBtn.classList.remove("hidden");
      }
    }, index * 300);
  });
}

// Sistema de Quiz
function setupQuiz() {
  const options = document.querySelectorAll(".option");
  if (options.length === 0) return;

  options.forEach((option) => {
    option.addEventListener("click", function () {
      this.classList.add("selected");
      this.style.transform = "scale(0.95)";

      setTimeout(() => {
        const quizResult = document.getElementById("quiz-result");
        if (quizResult) {
          quizResult.classList.remove("hidden");
          document.getElementById("quiz-question")?.classList.add("hidden");

          if (Math.random() < 0.1) {
            quizResult.innerHTML += `<p class="mini-easter-egg">(Psst... clique 5x na letra Y mais tarde!)</p>`;
          }
        }
      }, 300);
    });
  });
}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  // Configurações específicas para mobile
  if (isMobile) {
    const cursor = document.querySelector(".cursor");
    if (cursor) cursor.style.display = "none";

    window.addEventListener("devicemotion", handleShake, { passive: true });
    document.addEventListener("touchstart", handleTripleTap, {
      passive: false,
    });
  } else {
    setupCustomCursor();
  }

  // Configura todos os eventos de teclado/mouse
  document.addEventListener("keydown", handleKonamiCode);
  document.addEventListener("keypress", handleDiscoMode);
  document.addEventListener("dblclick", handleDoubleClick);

  // Configura easter eggs e interações
  setupFunModeEasterEgg();
  setupLetterYEasterEgg();

  // Configura animações e componentes
  setupTypewriterEffect();
  setupLetterAnimations();
  setupQuiz();
});
