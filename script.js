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
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  });

  // Audio visualization
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

  // Ticker update (static or optional feed)
  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    ticker.innerText = `🟢 ${now} — LUX AURUM ACTIVE — All Systems Operational`;
  }, 10000);
}

init();
