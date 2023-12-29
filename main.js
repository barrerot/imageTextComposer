const ImageTextComposer = require('./ImageTextComposer');

// Configura estas variables con tus propios valores
const backgroundImagePath = "./assets/background.png"; // Ruta a la imagen de fondo (puede ser PNG o JPEG)
const outputPath = './assets/output/output.png';   // Ruta para guardar la imagen resultante
const text = 'En cada desafío reside una oportunidad para crecer y reafirmar la propia fortaleza';                                // El texto que quieres añadir a la imagen

// Crear una instancia de ImageTextComposer
const composer = new ImageTextComposer(backgroundImagePath, outputPath);

// Usar la instancia para crear una imagen con texto
composer.createImageWithText(text)
    .then(() => console.log('Proceso completado.'))
    .catch(err => console.error('Error al crear la imagen:', err));
