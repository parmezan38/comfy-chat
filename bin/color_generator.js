const hue = { min: 0, max: 360 };
const sat = { min: 35, max: 90 };
const lig = { min: 45, max: 80 };

const generateValue = val => Math.floor(Math.random() * (val.max - val.min) + val.min);

const colorGenerator = {
  generateColor() {
    const primaryHue = generateValue(hue);
    const secondaryHue = (primaryHue + 180 + (Math.round(Math.random()) * 10 - 20)) % 360;
    const generateSat = generateValue(sat);
    const generateLig = generateValue(lig);
    const colors = {
      first: 'h' + primaryHue + 's' + generateSat + 'l' + generateLig,
      second: 'h' + secondaryHue + 's' + generateSat + 'l' + generateLig
    };
    return colors;
  },
  deconstructColorCode(str) {
    const index = {
      h: str.indexOf('h'),
      s: str.indexOf('s'),
      l: str.indexOf('l')
    };
    let hsl = 'hsl(';
    hsl += str.substring(index.h + 1, index.s) + ',';
    hsl += str.substring(index.s + 1, index.l) + '%,';
    hsl += str.substring(index.l + 1, str.length) + '%)';
    return hsl;
  }
};
module.exports = colorGenerator;
