const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots(ring) {
    var slotAngle = 360 / SLOTS_PER_REEL;
    var seed = getSeed();

    for (var i = 0; i < SLOTS_PER_REEL; i++) {
        var slot = document.createElement('div');

        slot.className = 'slot';

        // compute and assign the transform for this slot
        var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

        slot.style.transform = transform;

        // setup the number to show inside the slots
        // the position is randomized to

        let content = () => {
            content = `<img src="./src/images/slot-icon-${((seed + i) % 12)}.svg" />`
            $(slot).append(content);
        }
        content();

        // add the poster to the row
        ring.append(slot);
    }
}

function getSeed() {
    // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
    return Math.floor(Math.random() * (SLOTS_PER_REEL));
}

function spin(timer) {
    for (var i = 1; i < 6; i++) {
        var oldSeed = -1;
        /*
        checking that the old seed from the previous iteration is not the same as the current iteration;
        if this happens then the reel will not spin at all
        */
        var oldClass = $('#ring' + i).attr('class');
        if (oldClass.length > 4) {
            oldSeed = parseInt(oldClass.slice(10));
            console.log(oldSeed);
        }
        
        var seed = getSeed();
        while (oldSeed == seed) {
            seed = getSeed();
        }

        $('#ring' + i)
            .css('animation', 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's')
            .attr('class', 'ring spin-' + seed);
    }

    console.log('=====');
    console.log(seed);
}

$(document).ready(function () {

    // initiate slots 
    createSlots($('#ring1'));
    createSlots($('#ring2'));
    createSlots($('#ring3'));
    createSlots($('#ring4'));
    createSlots($('#ring5'));

    // hook start button
    $('.go').on('click', function () {
        var timer = 2;
        spin(timer);
    })
});