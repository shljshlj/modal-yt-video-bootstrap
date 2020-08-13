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

const videoItem = (videoId, videoTitle) => {
  const backgroundImg = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return `
      <li class="video__item">
        <div class="video__preview" style="background-image: url('${backgroundImg}')">
          <a 
            class="video__play"
            href="#"
            data-site="YouTube"
            data-video-id="${videoId}"
            data-title="${videoTitle}"
            data-toggle="modal"
            data-target="#modal-yt"
          >
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

const $modalIframePlayer = document.querySelector('#modal-player');
const $modalTitle = document.querySelector('.modal-title');

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
    const videoId = elem.getAttribute('data-video-id');
    const videoTitle = elem.getAttribute('data-title');



    createModal(videoTitle, videoId);
  });
}


/* Create and display modal */

function createModal(videoTitle, videoId) {
  $('#modal-yt').on('shown.bs.modal', function () {
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    $modalTitle.textContent = videoTitle;
    $modalIframePlayer.src = videoSrc;
  })

  $('#modal-yt').on('hidden.bs.modal', function (e) {
    $modalIframePlayer.src = '';
  })
}


export {
  initVideosSection
}
