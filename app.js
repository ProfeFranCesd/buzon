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

// Inicializa la API de
