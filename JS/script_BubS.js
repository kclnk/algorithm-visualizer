const n = 10;
const start = 0;
const end = 1000;
const array = [];
const container = document.getElementById("container");
let sortingAnimationRunning = false; // Flag to track if sorting animation is running
let animationTimeouts = []; // Array to store animation timeouts

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
    if (!sortingAnimationRunning) { // Check if sorting animation is not already running
        const copied_array = [...array];
        const startTime = performance.now(); // Record start time
        const swaps = bubble_sort(copied_array);
        animate_bubble_sort(swaps, () => {
            const endTime = performance.now(); // Record end time
            const runtime = endTime - startTime; // Calculate runtime
            display_runtime(runtime); // Display runtime
        });
    }
}


function animate_bubble_sort(swaps, callback) {
    sortingAnimationRunning = true; // Set sorting animation running flag
    if (swaps.length === 0) {
        display_array();
        changeTextColor(); 
        removeTransition();
        sortingAnimationRunning = false; // Reset sorting animation running flag
        if (callback) {
            callback(); // Execute the callback function
        }
        return;
    }

    const [i, j] = swaps.shift();
    const items = document.querySelectorAll('.item');

    [array[i], array[j]] = [array[j], array[i]];

    display_array([i,j]);

    const timeout = setTimeout(function() {
        // Continue sorting
        animate_bubble_sort(swaps, callback);
    }, 1000); // Adjust delay as needed

    animationTimeouts.push(timeout); // Store timeout in array
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
            position.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';

            // Use setTimeout to delay the fade out effect
            const fadeTimeout = setTimeout(() => {
                position.style.backgroundColor = '';
            }, 200);

            animationTimeouts.push(fadeTimeout); // Store timeout in array
        }
    }
}

var color_changed = false;
function changeTextColor() {
    if (!color_changed) {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.style.transition = 'background-color 0.75s ease-in-out';
            item.style.backgroundColor = 'rgba(0, 128, 0, 0.5)'; // Set green with 50% opacity

            const fadeTimeout = setTimeout(() => {
                item.style.backgroundColor = '';
            }, 500);

            animationTimeouts.push(fadeTimeout); // Store timeout in array
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

function display_runtime(runtime) {
    const runTimeMessage = document.getElementById('run_time_message');
    runTimeMessage.textContent = `Runtime: ${runtime.toFixed(2)} milliseconds`;
}

// Add event listener for the "Generate Array" button
document.getElementById("array_button").addEventListener("click", function() {
    const runTimeMessage = document.getElementById('run_time_message');
    runTimeMessage.textContent = ''; // Clear the runtime message when generating array
    if (sortingAnimationRunning) {
        sortingAnimationRunning = false; // Stop sorting animation
        // Clear all animation timeouts
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        // Reset any changes made during the animation
        display_array();
        removeTransition();
        color_changed = false;
    }
    initialize_array(); // Generate a new array
});

// Add event listener for the "Sort" button
document.getElementById("sort_button").addEventListener("click", function() {
    const runTimeMessage = document.getElementById('run_time_message');
    if (!runTimeMessage.textContent) { // Check if runtime message is not already displayed
        if (!sortingAnimationRunning) { // Check if sorting animation is not already running
            const copied_array = [...array];
            const startTime = performance.now(); // Record start time
            const swaps = bubble_sort(copied_array);
            animate_bubble_sort(swaps, () => {
                const endTime = performance.now(); // Record end time
                const runtime = endTime - startTime; // Calculate runtime
                display_runtime(runtime); // Display runtime
            });
        }
    }
});

