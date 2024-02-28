import Conductor from './conductor.js';
import DrawController from './controller/draw-controller.js';
import EpicyclesController from './controller/epicycles-controller.js';
import RangeController from './controller/range-controller.js';

let conductor = null;

function init() {

    let controllers = [];
    let drawZone, circleZoneSlider;
    if (hasElement('draw-zone')) {
        drawZone = new DrawController('draw-zone');
        controllers.push(drawZone);
    }
    if (hasElement('draw-zone-instruction')) {
        const instruction = document.getElementById('draw-zone-instruction');
        if (drawZone) {
            drawZone.onDrawingStart.push(() => instruction.classList.add('hidden'))
        }
    }
    if (hasElement('draw-zone-undo-button')) {
        const undoButton = document.getElementById('draw-zone-undo-button');
        if (drawZone) {
            undoButton.addEventListener('click', () => drawZone.undo());
        }
    }
    if (hasElement('circle-zone-slider')) {
        circleZoneSlider = new RangeController('circle-zone-slider');
        circleZoneSlider.animate = false;
        controllers.push(circleZoneSlider);
    }
    if (hasElement('circle-zone')) {
        let epicycles = new EpicyclesController('circle-zone');
        epicycles.animatePathAmt = false;
        if (drawZone) {
            drawZone.onDrawingStart.push(() => epicycles.setPath([]));
            drawZone.onDrawingEnd.push(() => epicycles.setPath(drawZone.path, 1024));
            // Reset the slider back to 1 to draw the full shape when it changes.
            if (circleZoneSlider) {
                drawZone.onDrawingStart.push(() => {
                    circleZoneSlider.slider.value = 1;
                    epicycles.setFourierAmt(1);
                });
            }
        }
        if (circleZoneSlider) {
            circleZoneSlider.onValueChange.push(val => epicycles.setFourierAmt(val));
        }
        controllers.push(epicycles);
    }

    conductor = new Conductor(controllers);
    conductor.start();
    // To let me play around with things in the console.
    window.conductor = conductor;
}

function hasElement(id) {
    return document.getElementById(id) != null;
}

/**
 * Configure the canvases to be able to handle screens with higher dpi.
 *
 * We can only call this once because after that, the width has changed!
 */
function updateCanvasSizes() {
    const pixelRatio = window.devicePixelRatio || 1;
    const canvases = document.getElementsByTagName("canvas");
    for (let canvas of canvases) {
        const width = canvas.width;
        const height = canvas.height;
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }
}


setTimeout(
    ()=>{
        // updateCanvasSizes();
        init();
    },2000
)
