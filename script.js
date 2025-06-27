// script.js
const ticker = document.getElementById('tickerText');
const audioLevel = document.getElementById("audioLevelBar");
const leftVideo = document.getElementById("leftCam");
const rightVideo = document.getElementById("rightCam");
const leftCanvas = document.getElementById("leftOverlay");
const rightCanvas = document.getElementById("rightOverlay");

async function init() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  leftVideo.srcObject = stream;
  rightVideo.srcObject = stream;

  [leftCanvas, rightCanvas].forEach(c => {
    c.width = window.innerWidth / 3;
    c.height = window.innerHeight;
  });

  await faceapi.nets.tinyFaceDetector.loadFromUri('/YOUR-REPO-NAME/models');

  const detect = async () => {
    const options = new faceapi.TinyFaceDetectorOptions();
    const results = await faceapi.detectAllFaces(leftVideo, options);
    const ctxL = leftCanvas.getContext('2d');
    const ctxR = rightCanvas.getContext('2d');
    ctxL.clearRect(0, 0, leftCanvas.width, leftCanvas.height);
    ctxR.clearRect(0, 0, rightCanvas.width, rightCanvas.height);

    results.forEach(({ box }) => {
      [ctxL, ctxR].forEach(ctx => {
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      });
    });

    requestAnimationFrame(detect);
  };
  detect();

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  const data = new Uint8Array(analyser.frequencyBinCount);

  const updateAudio = () => {
    analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    audioLevel.style.width = `${Math.min(avg, 100)}%`;
    requestAnimationFrame(updateAudio);
  };
  updateAudio();

  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    ticker.innerText = `📢 ${now} — All systems operational. No incidents reported.`;
  }, 10000);
}

init();
