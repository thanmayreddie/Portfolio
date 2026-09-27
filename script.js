const progress = document.querySelector("#progress");
const cursorGlow = document.querySelector(".cursor-glow");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const topButton = document.querySelector(".to-top");

// Scroll progress + back-to-top
function handleScroll() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  topButton.classList.toggle("show", scrollTop > 600);
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Cursor glow on pointer devices
window.addEventListener("pointermove", event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

console.log("Thanmay's portfolio is running 🚀");
