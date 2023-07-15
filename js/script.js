//スクロール位置に合わせて動画のフレームを送る

let isScrolling = false;

const seekVideoPlayback = (video) => {
    const oneFrame = 1/15;
    video.currentTime += oneFrame;
}

const seekVideoRelative = (video) => {
    const duration = video.duration;
    const windowheight = window.screenY;
}

//スクロールのイベントハンドラー
window.addEventListener("scroll", event => {
    const video = document.querySelector("video");
    isScrolling = true;
    
    
    video.playbackRate = 2;
    video.play();
    
    //seekVideoPlayback(video);
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

const autoFramePlay = (video) => {
    const currentTime = video.currentTime;
    if(isScrolling){
        setInterval(() => seekVideoPlayback(currentTime),1000/60);
    }
}

//ロード後に実行

window.onload = () => {
    const video = document.querySelector('video');
        video.load();
        console.log(
            "video playhead = " + video.currentTime + "¥n" + 
            "isScrolling = " + isScrolling
        );
}
