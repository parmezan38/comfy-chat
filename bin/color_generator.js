const colorGenerator = {
    hue: { min: 0, max: 360 },
    sat: { min: 35, max: 90 },
    lig: { min: 45, max: 80 },
    generateColor(){
        let colors = { color1: '', color2: '' };
        // Generate Primary and Secondary Hues     
        let primaryHue = this.generateValue(this.hue);
        let secondaryHue = (primaryHue + 180 + (Math.round(Math.random()) * 10 - 20) ) % 360;
        // Add Saturation and Lighness
        let generateSat = this.generateValue(this.sat);
        let generateLig = this.generateValue(this.lig);
        colors.color1 += 'h' + primaryHue + 's' + generateSat + 'l' + generateLig;
        colors.color2 += 'h' + secondaryHue + 's' + generateSat + 'l' + generateLig;
        return colors;
    },
    generateValue(property){
        return Math.floor(Math.random() * (property.max - property.min) + property.min);
    },
    deconstructColorCode(colorStr){
        let hsl = 'hsl(';
        let indexOfH = colorStr.indexOf('h');
        let indexOfS = colorStr.indexOf('s');
        let indexOfL = colorStr.indexOf('l');
        hsl += colorStr.substring(indexOfH + 1, indexOfS ) + ',';
        hsl += colorStr.substring(indexOfS + 1, colorStr.indexOf('l') ) + '%,';
        hsl += colorStr.substring(indexOfL + 1, colorStr.length ) + '%)';
        return hsl;
    }
};
module.exports = colorGenerator;
