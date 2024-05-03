const n = 15;
const start = 0;
const end = 1000;
const array = [];
var inputValue;
const numberInput = document.getElementById('search_key_field');
const errorMessage = document.getElementById('error_message');
const runTimeMessage = document.getElementById('run_time_message');

initialize_array();

// Call the function to set up the event listener for the search button after the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    search_button();
    get_search_key();
});


function initialize_array() {
    function generateRandomNumber(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    for (let i = 0; i < n; i++) {
        array[i] = generateRandomNumber(start, end);
    }

    display_array();
    color_changed = false;

    errorMessage.textContent = '';
}

 
function search_button() {    
    reset_array_color();
    get_search_key();
}


function bubble_sort() {
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) { // Start from index 1
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

function linear_search(array, inputValue) {
    for (let iter = 0; iter < array.length; iter++) {
        if (array[iter] === parseInt(inputValue)) { // Convert inputValue to integer
            return iter; // Return the index if the target is found
        }
    }
    return -1; // Return -1 if the target is not found
}
    
/////////////////////////////////////////////////////////////////////////////////////////////////////
function get_search_key() {
    const keyField = document.getElementById('search_key_field');
    const searchButton = document.getElementById('search_button');
    const errorMessage = document.getElementById('error_message');

    // Add event listener to the button
    searchButton.addEventListener('click', function() {
        // Clear any previous error messages and runtime messages
        errorMessage.textContent = '';
        runTimeMessage.textContent = '';

        // Check if the input field is empty
        if (keyField.value.trim() === '') {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Empty Input!'; // Display error message
            return; // Exit the function early
        }

        // Store the value in inputValue
        inputValue = keyField.value;

        startStopwatch(); // Start the stopwatch

        // Perform linear search and display result
        let found = false;
        for (let i = 0; i < array.length; i++) {
            const position = document.getElementsByClassName("item")[i];
            if (array[i] === parseInt(inputValue)) {
                setTimeout(() => {
                    position.style.backgroundColor = 'rgba(84, 228, 71, 0.2)'; // Change color to green if found
                }, i * 500); // Change color with a delay of i * 500 milliseconds
                setTimeout(() => {
                    errorMessage.style.color = '#47e63c';
                    errorMessage.textContent = `Key (${inputValue}) found at index (${i})!`;
                    stopStopwatch(); // Stop the stopwatch after displaying the success message
                }, (i * 500) + 1000);
                found = true;
                break; // Exit the loop once the target is found
            } else {
                setTimeout(() => {
                    position.style.backgroundColor = 'rgba(203, 40, 40, 0.2)'; // Change color to red if not found
                }, i * 500); // Change color with a delay of i * 500 milliseconds
            }
        }
        
        // Display error message after animation completes if the key is not found
        if (!found) {
            errorMessage.style.color = 'rgb(203, 40, 40)';
            errorMessage.textContent = 'Key not found!';
            stopStopwatch(); // Stop the stopwatch after displaying the error message
        }
    });
}


let startTime, endTime;

// Function to start the stopwatch
function startStopwatch() {
    startTime = performance.now();
}

// Function to stop the stopwatch and calculate runtime
function stopStopwatch() {
    endTime = performance.now();
    const runtime = endTime - startTime;
    runTimeMessage.textContent = `Runtime: ${runtime.toFixed(2)} milliseconds`;
}

function reset_array_color() {
    for (let i = 0; i < array.length; i++) {
        const position = document.getElementsByClassName("item")[i];
        position.style.backgroundColor = '';
    }
}
