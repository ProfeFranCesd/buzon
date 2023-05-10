// Clave de API de Google Drive
const API_KEY = 'AIzaSyDI3HSZNf4Fj6vOncy2tTzgpD8icrZQaaI';

// ID de la carpeta en Google Drive donde se subirán los videos
const FOLDER_ID = '18GMjflswqFZRGnDTRDyhoBIbFQLsHVQa?usp=share_link';

// Inicializa la API de Google Drive
function init() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  }).then(() => {
    console.log('API de Google Drive inicializada');
  });
}

// Sube el archivo de video a la carpeta de Google Drive
function uploadVideo(fileData) {
  gapi.client.drive.files.create({
    name: fileData.name,
    parents: [FOLDER_ID],
    mimeType: fileData.type,
    media: {
      body: fileData,
    },
  }).then((response) => {
    console.log('Archivo subido:', response);
  }, (error) => {
    console.error('Error al subir archivo:', error);
  });
}
var stream;
    var recorder;
    var chunks = [];

    // Obtener acceso a la cámara del dispositivo
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(function (mediaStream) {
        stream = mediaStream;
        var video = document.querySelector('#video');
        video.srcObject = stream;
        video.play();
      })
      .catch(function (error) {
        console.log("Error al acceder a la cámara: " + error);
      });

    // Comenzar a grabar cuando se hace clic en el botón "Grabar"
    var botonGrabar = document.querySelector('#boton-grabar');
    botonGrabar.addEventListener('click', function () {
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = function (event) {
        chunks.push(event.data);
      };
      recorder.start();
    });

    // Detener la grabación cuando se hace clic en el botón "Detener"
    var botonDetener = document.querySelector('#boton-detener');
    botonDetener.addEventListener('click', function () {
      recorder.stop();
      var blob = new Blob(chunks, { type: "video/webm" });
      var url = URL.createObjectURL(blob);
      var video = document.querySelector('#video');
      video.src = url;
    });
// Inicializa la API de
