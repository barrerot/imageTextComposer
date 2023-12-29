const ImageTextComposer = require("./ImageTextComposer");
const moment = require('moment'); // Asegúrate de tener instalado el paquete 'moment'

// Configura estas variables con tus propios valores
const backgroundImagePath = "./assets/background.png"; // Ruta a la imagen de fondo
const text = 'En cada desafío reside una oportunidad para crecer y reafirmar la propia fortaleza'; // El texto

// Generar un timestamp único con formato año, mes, día, hora, minutos y segundos
const timestamp = moment().format('YYYYMMDD_HHmmss');

// Concatenar el timestamp con el nombre del archivo de salida
const outputPath = `./assets/output/${timestamp}_output.png`; 

// Crear una instancia de ImageTextComposer
const composer = new ImageTextComposer(backgroundImagePath, outputPath);

// Usar la instancia para crear una imagen con texto
composer.createImageWithText(text)
    .then(() => console.log('Proceso completado.'))
    .catch(err => console.error('Error al crear la imagen:', err));
