// TYPEWRITER EFFECT FOR HERO TEXT
const phrases = [
  "clean portfolio websites.",
  "interactive user interfaces.",
  "smooth, modern web experiences."
];

let currentPhrase = 0;
let currentChar = 0;
const typingElement = document.getElementById("hero-typing");
let isDeleting = false;

function typeLoop() {
  const phrase = phrases[currentPhrase];

  if (!isDeleting) {
    typingElement.textContent = phrase.slice(0, currentChar + 1);
    currentChar++;

    if (currentChar === phrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1400); // pause at end
      return;
    }
  } else {
    typingElement.textContent = phrase.slice(0, currentChar - 1);
    currentChar--;

    if (currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeLoop, speed);
}

typeLoop();

// THEME SWITCHER LOGIC
const themeButtons = document.querySelectorAll(".theme-btn");

function setTheme(themeName) {
  document.body.classList.remove("theme-default", "theme-sunset", "theme-neon", "theme-dark");
  document.body.classList.add(`theme-${themeName}`);
}

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme");
    setTheme(theme);

    themeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// SET INITIAL THEME
setTheme("default");

// OPTIONAL: SMOOTH SCROLL FOR NAV LINKS
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth"
      });
    }
  });
});
