
function animateMixBlendMode(element, targetMode, duration) {
  const startMode = window.getComputedStyle(element).mixBlendMode;

  let currentTime = 0;
  const increment = 16.67; // アニメーションの間隔（16.67ミリ秒）

  const animate = setInterval(() => {
    currentTime += increment / 1000; // 秒単位に変換

    // 現在の進行度合いに応じてmix-blend-modeを補間
    const progress = currentTime / duration;
    element.style.mixBlendMode = interpolateBlendMode(
      startMode,
      targetMode,
      progress
    );

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
  const blendModes = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
  ];

  const startIndex = blendModes.indexOf(startMode);
  const targetIndex = blendModes.indexOf(targetMode);
  const currentIndex =
    Math.round((targetIndex - startIndex) * progress) + startIndex;

  return blendModes[currentIndex];
}

//スクロール位置に合わせて動画のフレームを送る

let isScrolling = false;
let pageY = 0;
const videoStartQue = 4.3309;
const videoEndQue = 20;

const titleStart = 0.35663;
const titleEnd = 3.390038;

let previousScrollY = 0;
let velocity = 0;

const seekVideoPlayback = (video) => {
  const oneFrame = 1 / 30;
  video.currentTime += oneFrame;
};

const seekVideoRelative = (video) => {
  const duration = videoEndQue - videoStartQue;
  const pageHeight = document.body.scrollHeight;
  const posPerTime = duration / pageHeight;
  video.currentTime = videoStartQue + posPerTime * window.scrollY;
  console.log(video.currentTime);
};

const moveTextElement = (element) => {
    let titleChars = element.textContent;
    let head = titleChars.slice(-1);
    let tail = titleChars.slice(0, titleChars.length - 1);
    element.textContent = head + tail;
}

const mapNums = (input,a,b,a_,b_) => {
  let vectA = a - b;
  let vectA_ = a_ - b_;
  let ratio = vectA_ / vectA;
  if(a > b){
      if(input > a) input = a;
      if(input < b) input = b;
  }else{
      if(input < a) input = a;
      if(input > b) input = b;
  }
  let inputVect = input - a;
  let outputVect = a_ + inputVect * ratio;
  return outputVect;
}

const fitFontSize = (textElement) => {
  let currentSize = 0;
  textElement.forEach(element => {
    if(currentSize < element.innerText.length) currentSize = element.innerText.length;
    console.log(element.innerText.length);
  })
  const windowX = document.documentElement.clientWidth;
  const ratio = currentSize == 0 ? 0 : windowX / currentSize;
  textElement.forEach(element => {
    element.style.fontSize = `${mapNums(ratio,0,windowX,0,100)}vw`;
  });
}

//スクロールのイベントハンドラー
window.addEventListener("scroll", (event) => {
  isScrolling = true;
});

//ロード後に実行
//const titleChars = document.querySelector('.eventname2').innerText;

window.onload = () => {
  const video = document.querySelector("video");
  video.load();
  video.currentTime = videoStartQue;
};

setInterval(() => {
  velocity = window.scrollY - previousScrollY;
  previousScrollY = window.scrollY;
  const video = document.querySelector("video");
  const blend_content = document.querySelectorAll(".sp-section");

  if (velocity == 0){
    accum ++;
    if(accum > 3) isScrolling = false;
  }else{
    accum = 0;
  }  

  if(window.scrollY < 50 ){
    seekVideoPlayback(video);
    if(titleEnd < video.currentTime) video.currentTime = titleStart;
  }

  if (isScrolling) {
    /*
    playbackVelocity = mapNums(Math.abs(velocity),0,200,0,4);
    console.log(playbackVelocity);
    video.playbackRate = playbackVelocity;
    if (video.currentTime > videoEndQue) video.currentTime = videoStartQue;
    video.play();
    */
    seekVideoRelative(video);
    for (let i = 0; i < blend_content.length; i++) {
      blend_content[i].style.mixBlendMode = "difference";
    }
  } else {
    for (let i = 0; i < blend_content.length; i++) {
      blend_content[i].style.mixBlendMode = "normal";
    }
    video.pause();
  }
}, 50);

let accum = 0;


