document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  navLinksItems.forEach((link) => {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
});

// View More About Section
document
  .getElementById("view-more-about")
  .addEventListener("click", function () {
    const hiddenContent = document.getElementById("more-content");
    const btnText = this.querySelector(".btn-text");
    const btnIcon = this.querySelector("i");
    const gallerySection = document.querySelector("#gallery");

    if (hiddenContent.style.display === "none") {
      // View More clicked - just expand content
      hiddenContent.style.display = "block";
      hiddenContent.classList.add("show");
      btnText.textContent = "View Less";
      btnIcon.classList.remove("fa-chevron-down");
      btnIcon.classList.add("fa-chevron-up");
    } else {
      // View Less clicked - collapse and scroll to gallery
      hiddenContent.style.display = "none";
      hiddenContent.classList.remove("show");
      btnText.textContent = "View More";
      btnIcon.classList.remove("fa-chevron-up");
      btnIcon.classList.add("fa-chevron-down");

      // Scroll to gallery after content collapses
      setTimeout(() => {
        gallerySection.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  });

// View Full Image Functionality
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {});
});

function toggleBodyScroll(disable) {
  document.body.style.overflow = disable ? "hidden" : "";
}

function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  let currentSlide = 0;

  slides[0].classList.add("active");

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  setInterval(nextSlide, 5000);
}

document.addEventListener("DOMContentLoaded", initCarousel);

// Gallery modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".modal-close");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentImageIndex = 0;
  let galleryImages = [];

  // Collect all gallery images
  function updateGalleryImages() {
    galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
  }
  updateGalleryImages();

  document
    .querySelector(".gallery-grid")
    .addEventListener("click", function (e) {
      const clickedImg = e.target.closest("img");
      if (clickedImg) {
        openModal(clickedImg);
      }
    });

  // Open modal with clicked image
  function openModal(clickedImg) {
    modal.style.display = "block";
    modalImg.src = clickedImg.src;
    modalImg.alt = clickedImg.alt;
    document.body.style.overflow = "hidden";
    currentImageIndex = galleryImages.indexOf(clickedImg);
    updateNavigationButtons();
  }

  // Close modal
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);

  // Navigation functions
  function showPreviousImage() {
    currentImageIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentImageIndex].src;
    modalImg.alt = galleryImages[currentImageIndex].alt;
    updateNavigationButtons();
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentImageIndex].src;
    modalImg.alt = galleryImages[currentImageIndex].alt;
    updateNavigationButtons();
  }

  function updateNavigationButtons() {
    prevBtn.style.display = galleryImages.length > 1 ? "block" : "none";
    nextBtn.style.display = galleryImages.length > 1 ? "block" : "none";
  }

  // Navigation button events
  prevBtn.addEventListener("click", showPreviousImage);
  nextBtn.addEventListener("click", showNextImage);

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") showPreviousImage();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "Escape") closeModal();
    }
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Update gallery images when more are loaded
  document
    .querySelectorAll(".view-more-btn, #desktop-view-more")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        setTimeout(updateGalleryImages, 300); // Update after animation
      });
    });

  // Add click event listener to modal gallery items
  document.addEventListener("click", function (e) {
    // Check if clicked element is an image inside a modal-gallery-item
    const clickedImg = e.target.closest(".modal-gallery-item img");
    if (clickedImg) {
      // Update modal image with clicked image
      modalImg.src = clickedImg.src;
      modalImg.alt = clickedImg.alt;

      // Show the full image modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  });

  // Close modal functions
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);

  // Close on outside click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const imgSrc = this.querySelector("img").src;
    document.getElementById("modal-image").src = imgSrc;
    document.getElementById("gallery-modal").style.display = "block";
  });
});

document.querySelector(".modal-close").addEventListener("click", function () {
  document.getElementById("gallery-modal").style.display = "none";
});

document
  .getElementById("gallery-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  });

document.querySelector(".scroll-down").addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector("#about").scrollIntoView({
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollProgress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;

    scrollProgress.style.width = `${progress}%`;
  });
});

// Blog View More Functionality
document.addEventListener("DOMContentLoaded", function () {
  const viewMoreBtn = document.querySelector(".view-more-btn");
  const hiddenBlogs = document.querySelectorAll(".hidden-blog");

  // Initially hide blogs on mobile
  if (window.innerWidth <= 768) {
    hiddenBlogs.forEach((blog) => {
      blog.style.display = "none";
    });
  }

  viewMoreBtn.addEventListener("click", function () {
    const isHidden = hiddenBlogs[0].style.display === "none";

    hiddenBlogs.forEach((blog) => {
      blog.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        blog.style.animation = "fadeIn 0.5s ease forwards";
      }
    });

    // Update button text
    this.innerHTML = isHidden
      ? 'View Less <i class="fas fa-chevron-up"></i>'
      : 'View More <i class="fas fa-chevron-down"></i>';
  });
});

// Add CSS animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Gallery View More Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const viewMoreGalleryBtn = document.getElementById("view-more-gallery");

  function createModal() {
    const modal = document.createElement("div");
    modal.className = "gallery-modal";

    const modalContent = document.createElement("div");
    modalContent.className = "gallery-modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "gallery-modal-close";
    closeBtn.innerHTML = "&times;";

    const modalGrid = document.createElement("div");
    modalGrid.className = "gallery-modal-grid";

    const hiddenImages = document.querySelectorAll(".hidden-gallery");
    hiddenImages.forEach((item) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "modal-gallery-item";

      const imgClone = item.querySelector("img").cloneNode(true);
      const overlayClone = item
        .querySelector(".gallery-overlay")
        .cloneNode(true);

      galleryItem.appendChild(imgClone);
      galleryItem.appendChild(overlayClone);
      modalGrid.appendChild(galleryItem);
    });

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalGrid);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
  }

  const modal = createModal();
  const closeBtn = modal.querySelector(".gallery-modal-close");

  viewMoreGalleryBtn.addEventListener("click", function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});

// Gallery View More Functionality (Desktop and Mobile)
document.addEventListener("DOMContentLoaded", function () {
  const viewMoreGalleryBtn = document.getElementById("view-more-gallery");
  const desktopViewMoreBtn = document.getElementById("desktop-view-more");

  function createDesktopModal() {
    const modal = document.createElement("div");
    modal.className = "gallery-modal desktop-gallery-modal";
    modal.innerHTML = `
      <div class="gallery-modal-content">
        <span class="gallery-modal-close">&times;</span>
        <div class="gallery-modal-grid">
          ${Array.from(document.querySelectorAll(".desktop-gallery"))
            .map(
              (item) => `
                <div class="modal-gallery-item">
                  ${item.innerHTML}
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  if (desktopViewMoreBtn) {
    const desktopModal = createDesktopModal();
    const closeBtn = desktopModal.querySelector(".gallery-modal-close");

    desktopViewMoreBtn.addEventListener("click", function () {
      if (window.innerWidth > 768) {
        desktopModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });

    function closeDesktopModal() {
      desktopModal.style.display = "none";
      document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeDesktopModal);

    window.addEventListener("click", function (event) {
      if (event.target === desktopModal) {
        closeDesktopModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && desktopModal.style.display === "block") {
        closeDesktopModal();
      }
    });
  }
});

const scrollToTopBtn = document.getElementById("scroll-to-top");

// Show button when scrolling down
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// Smooth scroll to top when clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
