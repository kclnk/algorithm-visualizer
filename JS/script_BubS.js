const n = 10;
const start = 0;
const end = 1000;
const array = [];
const container = document.getElementById("container");

initialize_array();

function initialize_array() {
    function generateRandomNumber(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    for (let i = 0; i < n; i++) {
        array[i] = generateRandomNumber(start, end);
    }

    display_array();
    color_changed = false;
}

function sort_button() {
    const copied_array = [...array];
    const swaps = bubble_sort(copied_array);
    animate_bubble_sort(swaps);
}

function animate_bubble_sort(swaps) {
    if (swaps.length === 0) {
        display_array();
        changeTextColor(); 
        removeTransition();
        return;
    }

    const [i, j] = swaps.shift();
    const items = document.querySelectorAll('.item');

    [array[i], array[j]] = [array[j], array[i]];

    display_array([i,j]);

    setTimeout(function() {
        // Continue sorting
        animate_bubble_sort(swaps);
    }, 1000); // Adjust delay as needed
}


function bubble_sort() {
    const swaps = [];
    const tempArray = [...array]; // Create a copy of the array to avoid modifying the original

    do {
        var swapped = false;
        for (let i = 1; i < tempArray.length; i++) { // Start from index 1
            if (tempArray[i - 1] > tempArray[i]) {
                swapped = true;
                swaps.push([i-1, i]);
                [tempArray[i - 1], tempArray[i]] = [tempArray[i], tempArray[i - 1]];
            }
        }
    } while (swapped);

    return swaps;
}


function display_array(index) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const position = document.createElement("div");
        position.setAttribute("class", "item");
        position.style.height = "100px";
        position.style.width = "100px";

        container.appendChild(position);
        position.textContent = array[i];

        if (index && index.includes(i)) {
            position.style.transition = 'background-color 0.95s ease-in-out'; // Set transition for background-color
            position.style.backgroundColor = 'red';

            // Use setTimeout to delay the fade out effect
            setTimeout(() => {
                position.style.backgroundColor = '';
            }, 200);
        }
    }
}


var color_changed = false;
function changeTextColor() {
    if (!color_changed) {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.style.transition = 'background-color 0.75s ease-in-out';
            item.style.backgroundColor = 'rgba(71, 230, 60, 0.5)'; // Set green with 50% opacity

            setTimeout(() => {
                item.style.backgroundColor = '';
            }, 500);
        });
        color_changed = true;
    }
}

function removeTransition() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.style.transition = ''; // Remove transition property
    });
}
