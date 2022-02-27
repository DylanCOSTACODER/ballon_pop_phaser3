var colorOutput = document.getElementById('colorValue');
var colorValue;

function setColorValue(name, value, rgb) {
    colorOutput.innerHTML = name;
    colorValue = value;
    colorName = name;
    colorRgb = rgb;
    document.getElementById('colorDisplay').innerHTML = name;
    document.getElementById('colorDisplay').style.color = rgb;
    localStorage.setItem('Name', colorName, 'Color', colorValue, 'Rgb', colorRgb);
    localStorage.setItem('Color', colorValue);
    localStorage.setItem('Rgb', colorRgb);
}
