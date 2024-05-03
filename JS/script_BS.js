const n = 10;
const start = 0;
const end = 1000;
const array = [];
var inputValue;
const numberInput = document.getElementById('search_key_field');
const errorMessage = document.getElementById('error_message');
const searchButton = document.getElementById('search_button');
const runTimeMessage = document.getElementById('run_time_message');

var low;
var high;

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
    bubble_sort();
    changeTextColor();
}

function bubble_sort() {
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    display_array();
}

let position;
function display_array() {
    container.innerHTML = "";
    errorMessage.textContent = '';
    for (let i = 0; i < array.length; i++) {
        const position = document.createElement("div");
        position.setAttribute("class", "item");
        position.style.height = "100px";
        position.style.width = "100px";
        container.appendChild(position);
        position.textContent = array[i];
    }
}

var color_changed = false;
function changeTextColor() {
    if(!color_changed){
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.style.color = '#47e63c';

            item.style.transition = 'color 0.75s ease-out';
            setTimeout(() => {
                item.style.color = '';
            }, 750);
        });
        color_changed = true;
    }
}

function binary_search(inputValue, low, high) {
    const items = document.querySelectorAll('.item');

    // Function to reset colors to original
    function resetColors() {
        items.forEach(item => {
            item.style.transition = 'background-color 0.5s ease-in-out, box-shadow 0.3s ease-in-out';
            item.style.backgroundColor = ''; // Reset to original color
            item.style.boxShadow = ''; // Reset box shadow
        });
    }

    // Function to animate the color change with a delay
    function animateColor(index, color, delay) {
        setTimeout(() => {
            items[index].style.backgroundColor = color;
        }, delay);
    }

    // Function to animate all divs to red
    function animateAllToRed() {
        items.forEach((item, index) => {
            animateColor(index, 'rgba(255, 0, 0, 0.5)', 0); // Animate all divs to red immediately
        });
    }

    // Start the stopwatch
    const startTime = performance.now();

    while (low <= high) {
        resetColors(); // Reset colors at the beginning of each iteration

        const middle = Math.floor((low + high) / 2);

        setTimeout(() => {
            items[low].style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
            items[middle].style.backgroundColor = 'rgba(0, 255, 255, 0.5)';
            items[high].style.backgroundColor = 'rgba(165, 42, 42,0.5)';
        }, 1000);

        if (array[middle] === inputValue) {
            // If key found, animate and display message
            animateColor(middle, 'rgba(0, 128, 0, 0.5)', 1000); // Found key becomes green
            setTimeout(() => {
                errorMessage.style.color = '#47e63c';
                errorMessage.textContent = `Key (${inputValue}) found at index (${middle})!`;
                stopStopwatch(startTime); // Stop the stopwatch after displaying the success message
            }, 2000); // Delayed display of the message by 2 seconds
            return;
        } else if (array[middle] < inputValue) {
            // Animate the updated low index
            animateColor(low, 'rgba(128, 0, 128, 0.5)', 1000); // Low index becomes purple
            low = middle + 1;
        } else {
            // Animate the updated high index
            animateColor(high, 'rgba(165, 42, 42,0.5)', 1000); // High index becomes brown
            high = middle - 1;
        }
    }

    // If key not found, animate all divs to red and display message after 2 seconds
    setTimeout(() => {
        animateAllToRed(); // Animate all divs to red
        setTimeout(() => {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Key not found!';
            stopStopwatch(startTime); // Stop the stopwatch after displaying the error message
        }, 1000); // Delayed display of the message by 1 second after turning divs red
    }, 2000);
}

// Function to stop the stopwatch and calculate runtime
function stopStopwatch(startTime) {
    const endTime = performance.now();
    const runtime = endTime - startTime;
    runTimeMessage.textContent = `Runtime: ${runtime.toFixed(2)} milliseconds`;
}


function search_button() {
    searchButton.addEventListener('click', function(event) {
        const inputValue = numberInput.value.trim();
        if (inputValue === '') {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Empty Input!';
            runTimeMessage.textContent = ''; // Clear the run time message
        } else if (!/^\d*$/.test(inputValue)) {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Only numbers are allowed!';
            numberInput.value = '';
            runTimeMessage.textContent = ''; // Clear the run time message
        } else {
            errorMessage.textContent = '';
            runTimeMessage.textContent = ''; // Clear the run time message
            binary_search(parseInt(inputValue), 0, array.length - 1);
        }
    });
}





// Wrap the initialization of event listeners in a function
function initializeEventListeners() {
    // Event listener for number input
    numberInput.addEventListener('input', function(event) {
        inputValue = event.target.value.trim();
        if (!/^\d*$/.test(inputValue)) {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Only numbers are allowed!';
            numberInput.value = '';
        } else {
            errorMessage.textContent = '';
        }
    });

    // Event listener for search button
    searchButton.addEventListener('click', function(event) {
        const inputValue = numberInput.value.trim();
        if (inputValue === '') {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Empty Input!';
        } else if (!/^\d*$/.test(inputValue)) {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Only numbers are allowed!';
            numberInput.value = '';
        } else {
            errorMessage.textContent = '';
            binary_search(parseInt(inputValue), 0, array.length - 1);
        }
    });
}

// Call the function to initialize event listeners after the DOM content has loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});