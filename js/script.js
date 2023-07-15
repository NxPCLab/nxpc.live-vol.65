// mix-blend-modeをアニメーションで変更する
function animateMixBlendMode(element, targetMode, duration) {
    const startMode = window.getComputedStyle(element).mixBlendMode;

    let currentTime = 0;
    const increment = 16.67; // アニメーションの間隔（16.67ミリ秒）

    const animate = setInterval(() => {
        currentTime += increment / 1000; // 秒単位に変換

        // 現在の進行度合いに応じてmix-blend-modeを補間
        const progress = currentTime / duration;
        element.style.mixBlendMode = interpolateBlendMode(startMode, targetMode, progress);

        if (currentTime >= duration) {
            clearInterval(animate);
        }
    }, increment);

    // アニメーション終了時に最終的なmix-blend-modeを設定
    setTimeout(() => {
        element.style.mixBlendMode = targetMode;
    }, duration * 1000);
}

// ブレンドモードを補間する関数
function interpolateBlendMode(startMode, targetMode, progress) {
    const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

    const startIndex = blendModes.indexOf(startMode);
    const targetIndex = blendModes.indexOf(targetMode);
    const currentIndex = Math.round((targetIndex - startIndex) * progress) + startIndex;

    return blendModes[currentIndex];
}



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
            blend_content[i].style.mixBlendMode = "difference";
        }
    } else {
        for (let i = 0; i < blend_content.length; i++) {
            blend_content[i].style.mixBlendMode = "multiply";
        }
    }
}, 50);

