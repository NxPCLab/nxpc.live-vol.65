//スクロール位置に合わせて動画のフレームを送る

let isScrolling = false;
let pageY = 0;
const videoStartQue = 8.25784;
const videoEndQue = 14.968927;

const seekVideoPlayback = (video) => {
    const oneFrame = 1/15;
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
    const video = document.querySelector("video");
    isScrolling = true;
    video.playbackRate = 2;
    if(video.currentTime > videoEndQue) video.currentTime = videoStartQue;
    video.play();
    console.log(
        "video playhead = " + video.currentTime + "¥n" + 
        "isScrolling = " + isScrolling
    );
    
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
/*
setInterval(() => {
    const video = document.querySelector("video");
    if(isScrolling) seekVideoRelative(video);
},50);
*/
