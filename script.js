feather.replace();

const controls = document.querySelector('.controls');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const buttons = [...controls.querySelectorAll('button')];
const ketcam = document.getElementById('keteranganCam');
const tbKirim = document.querySelector('#kirim');
const signature64 =  document.querySelector('#signature64');

let streamStarted = false;

const [play, pause] = buttons;

// KONS inisialisasi penggunaan kamera
var constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560 },

    height: {
      min: 720,
      ideal: 1080,
      max: 1440 },

    facingMode: 'environment' // Menentukan depan/belakang = "user" (depan) / "environment" (belakang) ==> https://www-webdevdrops-com.translate.goog/en/how-to-access-device-cameras-with-javascript/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc&_x_tr_hist=true
       } };

// EVEN ketika tombol PLAY di klik
const VidPlay = () => {
  if (streamStarted) {
    video.play();
    play.classList.add('d-none');
    pause.classList.remove('d-none');
    return;
  }
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    constraints.video.facingMode = 'environment';
    const updatedConstraints = constraints;
    startStream(updatedConstraints);
  }
  setTimeout(ketCamera, 3000);
  tbKirim.classList.add('d-none');
};

// EVEN untuk rutin PAUSE
const pauseStream = () => {
  video.pause();
  play.classList.remove('d-none');
  pause.classList.add('d-none');
};

// EVEN untuk rutin AMBIL Foto
const doScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight; 
  canvas.getContext('2d').drawImage(video, 0, 0);
  signature64.value = canvas.toDataURL('image/webp');
  pauseStream();
  tbKirim.classList.remove('d-none');
};

play.onclick = VidPlay;
pause.onclick = doScreenshot;


//RUTIN steam GAMBAR
const startStream = async constraints => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

//RUTIN Even saat mulai video steam
const handleStream = stream => {
  video.srcObject = stream;
  play.classList.add('d-none');
  pause.classList.remove('d-none');
};

const ketCamera = () => {
  ketcam.innerHTML = 'L Asli = ' +video.videoWidth+' T Asli = '+video.videoHeight+'<br/>';
  ketcam.innerHTML = ketcam.innerHTML + 'L Offset = ' +video.offsetWidth+' T Offset = '+video.offsetHeight;
}

VidPlay();