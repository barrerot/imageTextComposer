const sharp = require('sharp');
const Jimp = require('jimp');

class ImageTextComposer {
    constructor(backgroundImagePath, outputPath) {
        this.backgroundImagePath = backgroundImagePath;
        this.outputPath = outputPath;
    }

    async createImageWithText(text) {
        try {
            const background = await Jimp.read(this.backgroundImagePath);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK); // Tamaño de fuente aumentado

            // Mismo procedimiento para dividir el texto
            const maxWidth = background.bitmap.width * 0.5;
            let lines = this.splitTextIntoLines(text, font, maxWidth);

            const totalTextHeight = lines.reduce((total, line) => total + Jimp.measureTextHeight(font, line, maxWidth), 0);
            let yPos = (background.bitmap.height - totalTextHeight) / 2 - 30; // Ajuste para dejar espacio para la firma

            for (let line of lines) {
                const textWidth = Jimp.measureText(font, line);
                const xPos = (background.bitmap.width - textWidth) / 2;
                background.print(font, xPos, yPos, line);
                yPos += Jimp.measureTextHeight(font, line, maxWidth);
            }

            // Añadir la firma
            this.printSignature(background, font);

            const buffer = await background.getBufferAsync(Jimp.MIME_PNG);
            await sharp(buffer).toFile(this.outputPath);
            console.log('Imagen creada con éxito.');
        } catch (err) {
            console.error(err);
        }
    }

    splitTextIntoLines(text, font, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (let word of words) {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            if (Jimp.measureText(font, testLine) > maxWidth) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    printSignature(image, font) {
        const signature = '@barrerot';
        const textWidth = Jimp.measureText(font, signature);
        const xPos = (image.bitmap.width - textWidth) / 2;
        const yPos = image.bitmap.height - 240; // Posición de la firma aún más arriba
        image.print(font, xPos, yPos, signature);
    }
}

module.exports = ImageTextComposer;
