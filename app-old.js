const Jimp = require('jimp');
const inquirer = require('inquirer');

const addTextWatermarkToImage = async function(inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  const textData = {
    text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  };
  
  image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
  await image.quality(60).resize(image.getWidth()*0.5, image.getHeight()*0.5).writeAsync(outputFile);
};

addTextWatermarkToImage('./test.jpg', './test-with-watermark.jpg', 'Hello world')

const addImageWatermarkToImage = async function(inputFile, outputFile, watermarkFile) {
  const image = await Jimp.read(inputFile);
  const watermark = await Jimp.read(watermarkFile);
  const x = image.getWidth() / 2 - watermark.getWidth() / 2;
  const y = image.getHeight() / 2 - watermark.getHeight() / 2;
  
  image.composite(watermark, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
  });
  await image.quality(100).writeAsync(outputFile);
};

addImageWatermarkToImage('./test.jpg', './test-with-logo-watermark.jpg', './logo.png');

inquirer.prompt([{
  name: 'name',
  type: 'input',
  message: 'What\'s your name?',
}, {
  name: 'age',
  type: 'number',
  message: 'How old are you?',
  default: 18,
}]).then((answers) => {
  console.log(`\nHi ${answers.name}. ${answers.age}? Nice! \n`);
});