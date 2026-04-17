const galleryRoot = document.querySelector('#gallery');
const heroCollage = document.querySelector('#hero-collage');
const totalPhotos = document.querySelector('[data-total-photos]');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxIndex = document.querySelector('#lightbox-index');
const closeButton = document.querySelector('#lightbox-close');
const prevButton = document.querySelector('#prev-photo');
const nextButton = document.querySelector('#next-photo');

const heroNotes = [
  '老师与孩子的温柔合影',
  '操场上最灿烂的一次拥抱',
  '把全班的笑容定格在毕业日',
];

let photos = [];
let activeIndex = 0;

const renderHero = () => {
  const pickIndexes = [0, Math.floor((photos.length - 1) * 0.5), photos.length - 1];
  const picks = pickIndexes.map((index, idx) => ({ ...photos[index], note: heroNotes[idx] }));

  heroCollage.innerHTML = picks
    .map(
      (photo, index) => `
        <article class="hero-polaroid" style="--rotation:${['-8deg', '6deg', '-4deg'][index]}; --delay:${index * 1.2}s;">
          <img src="./${photo.src}" alt="${photo.alt}" loading="eager" />
          <span>${photo.note}</span>
        </article>
      `,
    )
    .join('');
};

const createCard = (photo, index) => `
  <article class="photo-card ${photo.featured ? 'featured' : ''}" data-index="${index}" tabindex="0" role="button" aria-label="查看第 ${index + 1} 张照片">
    <div class="photo-frame">
      <img src="./${photo.src}" alt="${photo.alt}" loading="lazy" />
    </div>
    <div class="photo-meta">
      <p class="photo-caption">${photo.caption}</p>
      <span class="photo-index">No.${String(index + 1).padStart(2, '0')}</span>
    </div>
  </article>
`;

const renderGallery = () => {
  galleryRoot.innerHTML = photos.map(createCard).join('');
};

const syncLightbox = () => {
  const photo = photos[activeIndex];
  lightboxImage.src = `./${photo.src}`;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.caption;
  lightboxIndex.textContent = `${activeIndex + 1} / ${photos.length}`;
};

const openLightbox = (index) => {
  activeIndex = index;
  syncLightbox();
  if (!lightbox.open) {
    lightbox.showModal();
  }
};

const stepLightbox = (step) => {
  activeIndex = (activeIndex + step + photos.length) % photos.length;
  syncLightbox();
};

const bindEvents = () => {
  galleryRoot.addEventListener('click', (event) => {
    const card = event.target.closest('.photo-card');
    if (!card) return;
    openLightbox(Number(card.dataset.index));
  });

  galleryRoot.addEventListener('keydown', (event) => {
    const card = event.target.closest('.photo-card');
    if (!card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(Number(card.dataset.index));
    }
  });

  closeButton.addEventListener('click', () => lightbox.close());
  prevButton.addEventListener('click', () => stepLightbox(-1));
  nextButton.addEventListener('click', () => stepLightbox(1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (!lightbox.open) return;
    if (event.key === 'Escape') lightbox.close();
    if (event.key === 'ArrowLeft') stepLightbox(-1);
    if (event.key === 'ArrowRight') stepLightbox(1);
  });
};

const init = async () => {
  const response = await fetch('./gallery-data.json');
  photos = await response.json();
  totalPhotos.textContent = photos.length;
  renderHero();
  renderGallery();
  bindEvents();
};

init();
