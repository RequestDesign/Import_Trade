import videojs from 'video.js';

function initVideoJS() {
    const videos = document.querySelectorAll('[data-videojs]');
    videos.forEach((video) => {
        const player = videojs(video, {
            autoplay: 'muted',
            loop: true,
            playsinline: true,
            normalizeAutoplay: true,
            noUITitleAttributes: true,
            disablePictureInPicture: true,
            controlBar: false,
            controls: false,
            bigPlayButton: false,
            titleBar: false,
            textTrackDisplay: false,
            children: ['mediaLoader'],
            children_: []
        });

        setTimeout(() => {
            player.ready(() => {
                player.play();
            });
        }, 100);
    });
}

initVideoJS();
