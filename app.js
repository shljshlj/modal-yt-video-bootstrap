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

const modalContent = (videoTitle, videoKey) => {
  return `
    <div class="modal__content">
      <div class="modal__titlebar">
        <span class="modal__title">${videoTitle}</span>
        <div class="modal__close">
          <a role="button" class="modal__close-button" href="#">
            <span class="modal__close-icon">
              <i class="fas fa-times"></i>
            </span>
          </a>
        </div>
      </div>
        <iframe type="text/html" width="960" height="547" src="https://www.youtube.com/embed/${videoKey}?enablejsapi=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>
    </div>
  `;
}

const $bodyEl = document.querySelector('body');
const $videoListContainer = document.querySelector('.video__list');
const $modalOverlay = document.querySelector('.modal__overlay');

function initVideosSection() {
  createVideoList($videoListContainer, $modalOverlay);
}


/* Create and show video items */

function createVideoList(videoListContainer, modalOverlay) {
  const videoList = videos.map(({ ytKey, title }) => {
    return videoItem(ytKey, title);
  }).join('\n');

  videoListContainer.insertAdjacentHTML('beforeend', videoList);

  setupVideoListeners(videoListContainer, modalOverlay);
}


/* Setup click listeners for opening modal */

function setupVideoListeners(parentVideoEl, parentModalEl) {
  parentVideoEl.addEventListener('click', function (event) {
    event.preventDefault();

    if (!event.target.closest('.video__play')) return;

    const elem = event.target.closest('.video__play');
    const videoKey = elem.getAttribute('data-key');
    const videoTitle = elem.getAttribute('data-title');

    createModal(parentModalEl, videoTitle, videoKey);
  });
}


/* Create and show modal */

function createModal(modalOverlay, videoTitle, videoKey) {
  const modal = modalContent(videoTitle, videoKey);
  modalOverlay.insertAdjacentHTML('beforeend', modal);

  showModal();
  playVideo();
  setupModalListeners(modalOverlay);
}


/* Setup event listeners for closing modal */

function setupModalListeners(modalOverlay) {
  const $closeBtn = document.querySelector('.modal__close-button');

  $closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', clickOutsideToCloseModal);
  modalOverlay.addEventListener('animationend', removeModalOnAnimationend);
}


/* Remove event listeners from modal */

function removeModalListeners() {
  const $closeBtn = document.querySelector('.modal__close-button');

  $closeBtn.removeEventListener('click', closeModal);
  $modalOverlay.removeEventListener('click', clickOutsideToCloseModal);
  $modalOverlay.removeEventListener('animationend', removeModalOnAnimationend);
}


/* Modal event handlers */

function closeModal(event) {
  event.preventDefault();
  pauseVideo();
  hideModal();
}

function clickOutsideToCloseModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    pauseVideo();
    hideModal();
  }
}

function removeModalOnAnimationend(event) {
  if (event.animationName === 'fadeOut') {
    const $modalBox = document.querySelector('.modal__content');

    $bodyEl.classList.remove('hide-modal');
    removeModalListeners();
    this.removeChild($modalBox);
  }
}


/* Modal style functions  */

function showModal() {
  $bodyEl.classList.add('show-modal');
}

function hideModal() {
  $bodyEl.classList.remove('show-modal');
  $bodyEl.classList.add('hide-modal');
}


/* Youtube api functions  */

function playVideo() {
  const $iframe = document.querySelector('.embedded iframe');
  $iframe.contentWindow.postMessage(JSON.stringify({
    "event": "command",
    "func": "playVideo",
    "args": ""
  }), "*");
}

function pauseVideo() {
  const $iframe = document.querySelector('.embedded iframe');
  $iframe.contentWindow.postMessage(JSON.stringify({
    "event": "command",
    "func": "pauseVideo",
    "args": ""
  }), "*");
}


export {
  initVideosSection
}
