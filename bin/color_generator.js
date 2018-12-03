const colorGenerator = {};
const   hue = { min: 0, max: 360 },
        sat = { min: 35, max: 90 },
        lig = { min: 45, max: 80 };

colorGenerator.generateColor = function(){
    let colors = { color1: '', color2: '' };
    // Generate Primary and Secondary Hues     
    let primaryHue = this.generateValue(hue);
    let secondaryHue = (primaryHue + 180 + (Math.round(Math.random()) * 10 - 20) ) % 360;
    // Add Saturation and Lighness
    colors.color1 += 'h' + primaryHue + 's' + this.generateValue(sat) + 'l' + this.generateValue(lig);
    colors.color2 += 'h' + secondaryHue + 's' + this.generateValue(sat) + 'l' + this.generateValue(lig);
    return colors;
}
colorGenerator.generateValue = function(property){
    return Math.floor(Math.random() * (property.max - property.min) + property.min);
}
colorGenerator.deconstructColorCode = function(colorStr){
    let hsl = 'hsl(';
    hsl += colorStr.substring(colorStr.indexOf('h') + 1, colorStr.indexOf('s') ) + ',';
    hsl += colorStr.substring(colorStr.indexOf('s') + 1, colorStr.indexOf('l') ) + '%,';
    hsl += colorStr.substring(colorStr.indexOf('l') + 1, colorStr.length ) + '%)';
    return hsl;
}
module.exports = colorGenerator;