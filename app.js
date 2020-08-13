const videos = [
  {
    title: "The Flash | Extended Trailer | The CW",
    ytKey: "Yj0l7iGKh8g"
  },
  {
    title: "THE FLASH 2014 T.V. SERIES INTRO",
    ytKey: "Mx7xTF8fKz4"
  },
  {
    title: "Friends - HD - Opening Credits - Season One",
    ytKey: "TgP8v60X23c"
  }
];

const videoItem = (videoKey, videoTitle) => {
  const backgroundImg = `https://i.ytimg.com/vi/${videoKey}/hqdefault.jpg`;
  return `
      <li class="video__item">
        <div class="video__preview" style="background-image: url('${backgroundImg}')">
          <a class="video__play" href="#" data-site="YouTube" data-key="${videoKey}" data-title="${videoTitle}">
            <div class="video__play-background">
              <span class="video__play-icon">
                <i class="fas fa-play"></i>
              </span>
            </div>
          </a>
        </div>
      </li>
  `;
}

const $bodyEl = document.querySelector('body');
const $videoListContainer = document.querySelector('.video__list');

// const $modalOverlay = document.querySelector('.modal__overlay');
// const $modalContent = document.querySelector('.modal__content');
// const $modalTitle = document.querySelector('.modal__title');
// const $modalIframePlayer = document.querySelector('#modal-player');
// const $modalCloseBtn = document.querySelector('.modal__close-button');

function initVideosSection() {
  createVideoList();
}


/* Create and show video items */

function createVideoList() {
  const videoList = videos.map(({ ytKey, title }) => {
    return videoItem(ytKey, title);
  }).join('\n');

  $videoListContainer.insertAdjacentHTML('beforeend', videoList);

  setupVideoListeners();
}


/* Setup click listeners for opening modal */

function setupVideoListeners() {
  $videoListContainer.addEventListener('click', function (event) {
    event.preventDefault();

    if (!event.target.closest('.video__play')) return;

    const elem = event.target.closest('.video__play');
    const videoKey = elem.getAttribute('data-key');
    const videoTitle = elem.getAttribute('data-title');

    createModal(videoTitle, videoKey);
  });
}



const myModal = new bootstrap.Modal(document.getElementById('modal-yt'), options);









/* Create and show modal */

function createModal(videoTitle, videoKey) {
  const videoSrc = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
  $modalTitle.textContent = videoTitle;
  $modalIframePlayer.src = videoSrc;

  showModal();
  setupModalListeners();
}


/* Setup event listeners for closing modal */

function setupModalListeners() {
  $modalCloseBtn.addEventListener('click', closeModal);
  $modalOverlay.addEventListener('click', clickOutsideToCloseModal);
  $modalOverlay.addEventListener('animationend', removeModalOnAnimationend);
  $modalContent.addEventListener('animationend', showHidePlayer);
}


/* Remove event listeners from modal */

function removeModalListeners() {
  $modalCloseBtn.removeEventListener('click', closeModal);
  $modalOverlay.removeEventListener('click', clickOutsideToCloseModal);
  $modalOverlay.removeEventListener('animationend', removeModalOnAnimationend);
  $modalContent.removeEventListener('animationend', showHidePlayer);
}


/* Modal event handlers */

function closeModal(event) {
  event.preventDefault();
  hideModal();
}

function clickOutsideToCloseModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    hideModal();
  }
}

function removeModalOnAnimationend(event) {
  if (event.animationName === 'fadeOut') {
    $bodyEl.classList.remove('hide-modal');
    removeModalListeners();
  }
}

function showHidePlayer(event) {
  if (event.animationName === 'scaleIn') showPlayer();
  if (event.animationName === 'scaleOut') hidePlayer();
}

/* Modal style functions  */

function showModal() {
  $bodyEl.classList.add('show-modal');
}

function hideModal() {
  $modalIframePlayer.src = '';
  $bodyEl.classList.remove('show-modal');
  $bodyEl.classList.add('hide-modal');
}

function showPlayer() {
  $modalIframePlayer.classList.add('show');
}

function hidePlayer() {
  $modalIframePlayer.classList.remove('show');
}


export {
  initVideosSection
}
