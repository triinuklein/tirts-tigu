// Highlight active nav link
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    nav.classList.toggle("open");
  });
}

// Galleries
const galleries = {
  gallery1: [
    "assets/forest/forest.jpg",
    "assets/forest/deer.jpg",
    "assets/forest/owl.jpg"
  ],
  gallery2: [
    "assets/projects/raba.jpg",
    "assets/projects/moth.jpg"
  ]
};

const galleryStates = {};

function updateGallery(id) {
  const img = document.getElementById(id);
  if (!img || !galleries[id]) return;
  img.src = galleries[id][galleryStates[id]];
}

function nextImage(id) {
  if (!galleries[id]) return;
  galleryStates[id] = (galleryStates[id] + 1) % galleries[id].length;
  updateGallery(id);
}

function prevImage(id) {
  if (!galleries[id]) return;
  galleryStates[id] =
    (galleryStates[id] - 1 + galleries[id].length) % galleries[id].length;
  updateGallery(id);
}

window.addEventListener("DOMContentLoaded", () => {
  // Initialize galleries
  for (let id in galleries) {
    galleryStates[id] = 0;
    updateGallery(id);
  }

  // Contact form success message (front-end simulation)
  const contactForm = document.querySelector(".contact-form");
  const successMessage = document.querySelector(".form-success");

  if (contactForm && successMessage) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      successMessage.style.display = "block";
      contactForm.reset();
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 4000);
    });
  }

  // PDF Modal Logic
  const pdfModal = document.getElementById("pdf-modal");
  const pdfFrame = document.getElementById("pdf-frame");
  const pdfClose = document.querySelector(".pdf-close");

  if (pdfModal && pdfFrame && pdfClose) {
    document.querySelectorAll(".pdf-open").forEach(btn => {
      btn.addEventListener("click", () => {
        const pdf = btn.dataset.pdf;
        pdfFrame.src = pdf;
        pdfModal.classList.add("open");
      });
    });

    const closeModal = () => {
      pdfModal.classList.remove("open");
      pdfFrame.src = "";
    };

    pdfClose.addEventListener("click", closeModal);

    pdfModal.addEventListener("click", e => {
      if (e.target === pdfModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }
});
