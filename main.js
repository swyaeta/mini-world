let people = document.querySelectorAll(".person");

let room = document.querySelector(".room");

people.forEach(function(person) {

    let moving = false;
    let grabX = 0;
    let grabY = 0;

    person.addEventListener("pointerdown", function(e) {

        moving = true;

        person.style.cursor = "grabbing";

        let rect = person.getBoundingClientRect();

        grabX = e.clientX - rect.left;
        grabY = e.clientY - rect.top;

        person.setPointerCapture(e.pointerId);

    });

    person.addEventListener("pointermove", function(e) {

        if (!moving) return;

        let rect = room.getBoundingClientRect();

        let newX = e.clientX - rect.left - grabX;
        let newY = e.clientY - rect.top - grabY;

        newX = Math.max(0, Math.min(newX, room.clientWidth - person.offsetWidth));
        newY = Math.max(0, Math.min(newY, room.clientHeight - person.offsetHeight));

        if (e.movementX < 0) {
            person.style.transform = "scaleX(-1)";
        }

        if (e.movementX > 0) {
            person.style.transform = "scaleX(1)";
        }

        person.style.left = newX + "px";
        person.style.top = newY + "px";

    });

    person.addEventListener("pointerup", function() {

        moving = false;
        person.style.cursor = "grab";

    });

});