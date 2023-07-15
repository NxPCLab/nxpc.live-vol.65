//スクロール位置に合わせて動画のフレームを送る

let isScrolling = false;
let pageY = 0;
const videoStartQue = 8.25784;
const videoEndQue = 14.968927;

let previousScrollY = 0;
let velocity = 0;

const seekVideoPlayback = (video) => {
    const oneFrame = 1 / 15;
    video.currentTime += oneFrame;
}

const seekVideoRelative = (video) => {
    const duration = videoEndQue - videoStartQue;
    const pageHeight = document.body.scrollHeight;
    console.log(pageHeight);
    const posPerTime = duration / pageHeight;
    video.currentTime = videoStartQue + posPerTime * window.scrollY;
}

//スクロールのイベントハンドラー
window.addEventListener("scroll", event => {
    isScrolling = true;
})

window.addEventListener("scrollend", envet => {
    isScrolling = false;
    const video = document.querySelector("video");
    video.pause();
})

//ロード後に実行

window.onload = () => {
    const video = document.querySelector('video');
    video.load();
    video.currentTime = videoStartQue;
    console.log(
        "video playhead = " + video.currentTime + "¥n" +
        "isScrolling = " + isScrolling
    );

}

setInterval(() => {
    velocity = window.scrollY - previousScrollY
    previousScrollY = window.scrollY;
    const video = document.querySelector("video");
    const blend_content = document.querySelectorAll('.sp-section');
    if (isScrolling) {
        playbackVelocity = Math.abs(velocity / 10);
        console.log(playbackVelocity);
        video.playbackRate = playbackVelocity;
        if (video.currentTime > videoEndQue) video.currentTime = videoStartQue;
        video.play();

        for (let i = 0; i < blend_content.length; i++) {
            blend_content[i].style.mixBlendMode = "multiply";
        }
    } else {
        for (let i = 0; i < blend_content.length; i++) {
            blend_content[i].style.mixBlendMode = "multiply";
        }
    }
}, 50);

