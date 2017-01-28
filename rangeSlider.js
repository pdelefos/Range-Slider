"use strict";

/*----------------------------------------------------------*\
#rangeSlider functions
\*----------------------------------------------------------*/

/**
* Gather all sliders on window load and display their values
*/
window.onload = function () {
  const allSliders = document.querySelectorAll('.range-slider');
  allSliders.forEach(function(slider) {
    const allSliderInputs = slider.querySelectorAll('input[type=range]');
    allSliderInputs.forEach(function(input) {
      input.oninput = displayInputsVal;
      input.oninput();
    });
  });
}

/**
* Display the values of the slider
*/
function displayInputsVal() {
  const slider = this.parentNode;
  const displayValuesSpan = slider.querySelector('.range-values');
  const sliderInputs = slider.querySelectorAll('input[type=range]');
  var slideVal1 = parseInt(sliderInputs[0].value);
  displayValuesSpan.innerHTML = `${slideVal1}`;
  if (sliderInputs.length === 2) {
    var slideVal2 = parseInt(sliderInputs[1].value);
    if (slideVal1 > slideVal2) {
      let tmp = slideVal1;
      slideVal1 = slideVal2;
      slideVal2 = tmp;
    }
    displayValuesSpan.innerHTML = `${slideVal1} - ${slideVal2}`;
  }
}

/**
* Return true if it's a slider
* @param {NodeElement} slider - slider node element
* @return {boolean} 
*/
function isSlider(slider) {
    return (slider.classList.contains('range-slider')) ? true : false;
}

/**
* Set slider default values
* @param {NodeElement} slider 
* @param {Number} max - maximum value of the slider
* @param {Number} min - minimum value of the slider
* @param {Number} defaultMin - default minimum value of the slider
* @param {Number} defaultMax - default maximum value of the slider
*/
function setSliderValues(slider, min = 0, max = 0, defaultMin = 0,
                        defaultMax = 0) {
    if (!isSlider(slider)) return ;
    const inputs = slider.querySelectorAll('input[type=range]');
    const nbInputs = inputs.length;
    inputs.forEach(input => {
        input.setAttribute('min', `${min}`);
        input.setAttribute('max', `${max}`);
    });
    inputs[0].value = defaultMin;
    if (nbInputs == 2)
        inputs[1].value = defaultMax;
}

/**
* Get slider values
* @param {NodeElement} slider - slider node element
* @return {object} value - min and max value
*/
function getSliderValues(slider) {
    if(!isSlider(slider)) return ;
    const sliderInputs = slider.querySelectorAll('input[type=range]');
    const nbSliders = sliderInputs.length;
    let min = sliderInputs[0].value;
    if (nbSliders == 2) {
        let max = sliderInputs[1].value;
        if (min > max){ var tmp = max; max = min; min = tmp; }
        return {min: `${min}`, max: `${max}`};
    }
    return {min: `${min}`};
}