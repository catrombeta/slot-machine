// QUANTIDADE DE SLOTS POR RODA
const slots_wheel = 12;
// WIDTH DETERMINADA NO CSS DE CADA SLOT
const slot_width = 80;
// CALCULO DO RADIO DA RODA
const wheel_radius = Math.round((slot_width / 2) / Math.tan(Math.PI / slots_wheel));

function createSlots(ring) {
    var slotAngle = 360 / slots_wheel;
    var startingPosition = generateStartingPosition();

    for (let i = 0; i < slots_wheel; i++) {
        let slot = document.createElement('div');

        slot.className = 'slot';

        // compute and assign the transform for this slot
        let transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + wheel_radius + 'px)';

        slot.style.transform = transform;

        let content = () => {
            content = `<img src="./src/images/slot-icon-${((startingPosition + i) % 12)}.svg" />`
            $(slot).append(content);
        }
        content();

        ring.append(slot);
    }
}

// function setClass() {
//     for (let i = 0; i < slots_wheel; i++) {
//         let className = `.spin-${i}`;
//         let transform = `transform: rotateX(${-slot_angle * i}deg);`;
//         $('slot').css(`${className} { ${transform} }`)
// }

function generateStartingPosition() {
    let generateNumber = Math.floor(Math.random() * slots_wheel);
    return Math.floor(generateNumber);
}

function spin(timer) {
    for (var i = 1; i < 6; i++) {
        var oldPosition = -1;
        /*
        checking that the old startingPosition from the previous iteration is not the same as the current iteration;
        if this happens then the wheel will not spin at all
        */
        var oldClass = $('#ring' + i).attr('class');
        if (oldClass.length > 4) {
            oldPosition = parseInt(oldClass.slice(10));
            console.log(oldPosition);
        }
        
        var startingPosition = generateStartingPosition();
        while (oldPosition == startingPosition) {
            startingPosition = generateStartingPosition();
        }

        $('#ring' + i)
            .css('animation', `back-spin 1s, spin-${startingPosition} ${timer + i * 0.5}s`)
            .attr('class', `ring spin-${startingPosition}`);
    }

    console.log('=====');
    // console.log(oldClass, 'ESSA É A CLASSE ANTIGA')
    console.log(oldPosition, 'ESSA É A POSIÇÃO ANTIGA');
    console.log(startingPosition, 'ESSA É A POSIÇÃO ATUAL');
}

$(document).ready(function () {
    const ringIds = ['ring1', 'ring2', 'ring3', 'ring4', 'ring5'];
    ringIds.forEach(id => createSlots($(`#${id}`)));

    $('.startSpinner').on('click', function () {
        const timer = 3;
        spin(timer);
    })
});

