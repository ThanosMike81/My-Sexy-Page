// =====================
// INIT / DEBUG
// =====================

console.log("script loaded");


// =====================
// SELECTORS
// =====================

const thumbnails = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

console.log(thumbnails);


// =====================
// STATE
// =====================

let currentIndex = 0;


// =====================
// FUNCTIONS
// =====================

// --- Open Lightbox
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'flex';
  showImage(index);
}


// --- Close Lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxImage.src = '';
  console.log("closed");
}


// --- Show Image (with fade)
function showImage(index) {
  lightboxImage.style.opacity = 0;

  setTimeout(() => {
    lightboxImage.src = thumbnails[index].src;
    lightboxImage.style.opacity = 1;
  }, 150);
    prevBtn.classList.toggle("hidden", index === 0);
    nextBtn.classList.toggle("hidden", index === thumbnails.length - 1);
}


// --- Navigation
function goNext() {
  if (currentIndex < thumbnails.length - 1) {
    currentIndex++;
    showImage(currentIndex);
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    showImage(currentIndex);
  }
}


// =====================
// EVENT LISTENERS
// =====================

// --- Thumbnail Clicks
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    openLightbox(index);
  });
});


// --- Close Button
lightboxClose.addEventListener('click', closeLightbox);


// --- Keyboard Controls
document.addEventListener('keydown', (event) => {
  if (lightbox.style.display !== 'flex') return;

  if (event.key === 'ArrowRight') goNext();
  if (event.key === 'ArrowLeft') goPrev();
  if (event.key === 'Escape') closeLightbox();
});


// --- On-Screen Arrows
nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);