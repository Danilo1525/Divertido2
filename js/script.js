const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Easter Egg do Shake (Melhorado)
let lastShakeTime = 0;
let shakeCount = 0;

function handleShake(e) {
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
      activateShakeMode();
      shakeCount = 0;
    }
  }
}

function activateShakeMode() {
  document.body.classList.toggle("shake-mode");
  showMobileMessage(
    document.body.classList.contains("shake-mode")
      ? "🎉 Modo Dançante Ativado!"
      : "Modo Dançante Desligado"
  );
}

// Easter Egg do Toque Triplo (Melhorado)
let lastTapTime = 0;
let tapCount = 0;

function handleTripleTap(e) {
  const currentTime = new Date().getTime();
  const tapInterval = currentTime - lastTapTime;

  if (tapInterval < 300 && tapInterval > 0) {
    tapCount++;

    if (tapCount >= 2) {
      // Triplo toque
      createTapEffect(e.touches[0].clientX, e.touches[0].clientY);
      activateRainbowMode();
      tapCount = 0;
    }
  } else {
    tapCount = 0;
  }

  lastTapTime = currentTime;
}

function createTapEffect(x, y) {
  const colors = ["#ff5c8a", "#4cc9f0", "#9d4edd", "#ffd166"];
  const effect = document.createElement("div");
  effect.className = "tap-effect";
  effect.style.left = `${x - 30}px`;
  effect.style.top = `${y - 30}px`;
  effect.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 600);
}

function activateRainbowMode() {
  document.body.classList.add("rainbow-mode");
  showMobileMessage("🌈 Cores Malucas Ativadas!");
  setTimeout(() => {
    document.body.classList.remove("rainbow-mode");
  }, 5000);
}

// Easter Egg da Letra Y (Mobile Adaptado)
function setupLetterYEasterEgg() {
  const letterY = document.querySelector(".special-letter");
  if (!letterY) return;

  let tapCount = 0;
  let lastTap = 0;

  letterY.addEventListener(
    "touchstart",
    function (e) {
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
      e.preventDefault(); // Evita zoom indesejado
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

    // Efeito de confete
    createConfettiEffect(yContainer);
  }
}

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

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Feedback Visual para Mobile
function showMobileMessage(text) {
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

// Inicialização dos Easter Eggs mobile
if (isMobile) {
  // Remove cursor em mobile
  const cursor = document.querySelector(".cursor");
  if (cursor) cursor.style.display = "none";

  // Ativa detecção de shake
  window.addEventListener("devicemotion", handleShake, { passive: true });

  // Configura toque triplo
  document.addEventListener("touchstart", handleTripleTap, { passive: false });

  // Configura Easter Egg da letra Y
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(setupLetterYEasterEgg, 2000);
  });
}
// Cursor Personalizado
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");

  // Movimento do cursor (com verificação de existência)
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Efeitos de hover melhorados
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

  // Animação de texto na página inicial (com fallback)
  if (document.querySelector(".home-page")) {
    const textLines = document.querySelectorAll(".text-line");

    textLines.forEach((line, index) => {
      // Salva o texto original como atributo para fallback
      if (!line.hasAttribute("data-original-text")) {
        line.setAttribute("data-original-text", line.textContent);
      }

      const text = line.getAttribute("data-original-text");
      line.textContent = "";

      for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        span.style.animation = `fadeIn 0.5s ${
          i * 0.05 + index * 0.2
        }s forwards`;
        line.appendChild(span);
      }
    });
  }

  // Lógica do Quiz melhorada
  if (document.querySelector(".quiz-page")) {
    const options = document.querySelectorAll(".option");
    const quizResult = document.getElementById("quiz-result");

    options.forEach((option) => {
      option.addEventListener("click", function () {
        // Adiciona feedback visual
        this.classList.add("selected");

        // Animação melhorada
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          if (quizResult) {
            quizResult.classList.remove("hidden");
            document.getElementById("quiz-question")?.classList.add("hidden");

            // Easter egg aleatório
            if (Math.random() < 0.1) {
              // 10% de chance
              quizResult.innerHTML += `<p class="mini-easter-egg">(Psst... clique 10x na letra Y mais tarde!)</p>`;
            }
          }
        }, 300);
      });
    });
  }

  // Animação das Letras com Easter Egg
  if (document.querySelector(".letters-page")) {
    const letterMeanings = [
      { letter: "J", meaning: "Jovem de luz" },
      { letter: "A", meaning: "Autêntica de verdade" },
      { letter: "M", meaning: "Misteriosa (como esse site 👀)" },
      { letter: "I", meaning: "Iluminada" },
      { letter: "L", meaning: "Linda, mas isso você já sabia" },
      { letter: "Y", meaning: "You're amazing", special: true },
    ];

    const container = document.getElementById("letter-animation");
    const continueBtn = document.getElementById("continue-btn");

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

        if (container) {
          container.appendChild(letterDiv);

          // Easter Egg na letra Y (5 cliques)
          if (item.letter === "Y") {
            let clickCount = 0;
            let lastClickTime = 0;
            const CLICK_DELAY = 1000; // 1 segundo para contar múltiplos cliques

            const handleClick = () => {
              const now = Date.now();

              // Se passou muito tempo desde o último clique, reinicia a contagem
              if (now - lastClickTime > CLICK_DELAY) {
                clickCount = 0;
              }

              clickCount++;
              lastClickTime = now;

              console.log(`Clique ${clickCount} no Y`);

              // Se atingiu 5 cliques dentro do período
              if (clickCount === 5) {
                const existingMessage =
                  letterDiv.querySelector(".secret-message");
                if (!existingMessage) {
                  const message = document.createElement("div");
                  message.className = "secret-message";
                  message.innerHTML =
                    "🎊 <strong>Você é persistente mesmo!</strong> 🎊<br>" +
                    "Jamily significa J.O.V.E.M incrível!";

                  // Estilos para a mensagem
                  message.style.marginTop = "15px";
                  message.style.padding = "10px";
                  message.style.borderRadius = "8px";
                  message.style.background = "rgba(0,0,0,0.7)";
                  message.style.animation = "fadeIn 0.5s forwards";

                  letterDiv.appendChild(message);
                  createConfettiEffect(letterDiv);
                  showMobileMessage("🎉 Você descobriu o segredo do Y!");
                }
                clickCount = 0; // Reseta após mostrar a mensagem
              }

              // Reseta a contagem se não completar em 1 segundo
              setTimeout(() => {
                if (Date.now() - lastClickTime >= CLICK_DELAY) {
                  clickCount = 0;
                }
              }, CLICK_DELAY);
            };

            // Adiciona o evento de clique
            letterDiv.addEventListener(
              isMobile ? "touchstart" : "click",
              handleClick
            );
          }

          // Animação da letra
          setTimeout(() => {
            letterDiv.style.opacity = "1";
            letterDiv.style.transform = "translateY(0)";
          }, 50);
        }

        // Mostrar botão continuar
        if (index === letterMeanings.length - 1 && continueBtn) {
          setTimeout(() => {
            continueBtn.classList.remove("hidden");
          }, 1000);
        }
      }, index * 800); // Intervalo entre letras
    });
  }

  // Efeito de Digitação com Easter Egg
  if (document.querySelector(".final-page")) {
    const text =
      "Oi de novo, Jamily.\nResolvi transformar seu nome num site.Pode parecer estranho?\nPode. Mas também ficou legal.\nE eu espero que você tenha gostado!";
    const element = document.getElementById("typed-text");
    const finalBtn = document.getElementById("final-btn");
    let i = 0;

    function typeWriter() {
      if (element && i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 50 + 30);
      } else if (element) {
        element
          .querySelector(".typewriter-cursor")
          ?.style.removeProperty("display");
        if (finalBtn) {
          setTimeout(() => {
            finalBtn.classList.remove("hidden");
          }, 500);
        }
      }
    }

    setTimeout(typeWriter, 1000);

    // Easter Egg - Mensagem secreta
    setTimeout(() => {
      const easterEgg = document.getElementById("easter-egg");
      if (easterEgg) {
        easterEgg.classList.remove("hidden");
        easterEgg.style.animation = "fadeIn 1s forwards";

        // Easter Egg extra - clique para mudar tema
        easterEgg.addEventListener("click", function () {
          document.body.classList.toggle("fun-mode");
          this.textContent = this.textContent.includes("TÁ ZOANDO")
            ? "Se quiser zoar esse site depois, tudo bem também 😅"
            : "TÁ ZOANDO QUE MUDOU O TEMA? 🤯";
        });
      }
    }, 15000);
  }
  const easterEggKeys = [];
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

  document.addEventListener("keydown", (e) => {
    easterEggKeys.push(e.key);
    if (easterEggKeys.length > konamiCode.length) {
      easterEggKeys.shift();
    }

    if (JSON.stringify(easterEggKeys) === JSON.stringify(konamiCode)) {
      document.body.classList.add("konami-mode");
      setTimeout(() => {
        alert("🎉 Código Konami ativado! Modo Dançante habilitado! 🕺");
      }, 500);
    }
  });

  // Easter Egg do Disco
  let discoMode = false;
  document.addEventListener("keypress", (e) => {
    if (e.key === "d") {
      discoMode = !discoMode;
      document.body.classList.toggle("disco-mode");
      if (discoMode) {
        alert("🪩 Modo Disco Ativado! Vamos dançar!");
      }
    }
  });
});
