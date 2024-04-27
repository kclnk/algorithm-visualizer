const n = 10;
const start = 0;
const end = 1000;
let array = [];
const container = document.getElementById("container");
let sortingInProgress = false;
let timeoutIds = [];

initialize_array();

function initialize_array() {
    function generateRandomNumber(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    for (let i = 0; i < n; i++) {
        array[i] = generateRandomNumber(start, end);
    }

    display_array();
}

function sort_button() {
    if (!sortingInProgress && !isSorted(array)) {
        sortingInProgress = true;
        selection_sort(array, 0);
    }
}

function selection_sort(array, i) {
    if (i < array.length - 1) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
        }

        colorElement(min, 'rgba(255, 0, 0, 0.5)');

        const timeoutId = setTimeout(() => {
            let temp = array[i];
            array[i] = array[min];
            array[min] = temp;

            display_array();

            colorElement(i, 'rgba(128, 0, 128, 0.5)');

            const innerTimeoutId = setTimeout(() => {
                colorElement(i, 'rgba(0, 128, 0, 0.5)');
                colorElement(min, 'rgba(0, 128, 0, 0.5)');

                const innerInnerTimeoutId = setTimeout(() => {
                    clearColors();
                    selection_sort(array, i + 1);
                }, 500);
                timeoutIds.push(innerInnerTimeoutId);
            }, 500);
            timeoutIds.push(innerTimeoutId);
        }, 500);
        timeoutIds.push(timeoutId);
    } else {
        sortingInProgress = false; // Sorting completed
    }
}

function display_array() {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const position = document.createElement("div");
        position.setAttribute("class", "item");
        position.style.height = "100px";
        position.style.width = "100px";
        container.appendChild(position);
        position.textContent = array[i];
    }
}

function colorElement(index, color) {
    const items = document.querySelectorAll('.item');
    items[index].style.backgroundColor = color;
}

function clearColors() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.style.backgroundColor = '';
    });
}

// Add event listener for the "Generate Array" button
document.getElementById("array_button").addEventListener("click", function() {
    if (sortingInProgress) {
        sortingInProgress = false; // Stop sorting process
        clearColors(); // Clear colors
        timeoutIds.forEach(id => clearTimeout(id)); // Clear all timeouts
        timeoutIds = []; // Reset the timeout IDs array
    }
    initialize_array(); // Generate a new array
});

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}