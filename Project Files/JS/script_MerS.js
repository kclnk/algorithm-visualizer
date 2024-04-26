const n = 10;
const start = 0;
const end = 1000;
const array = [];
const container = document.getElementById("container");
let sortingDone = false;

initialize_array();

function initialize_array() {
    sortingDone = false;
    function generateRandomNumber(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    for (let i = 0; i < n; i++) {
        array[i] = generateRandomNumber(start, end);
    }

    display_array();
}

async function sort_button() {
    if (!sortingDone) {
        sortingDone = true;
        await merge_sort(0, n - 1);
        await display_array(true); // Reset colors after animation
    }
}
async function merge_sort(left, right) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await merge_sort(left, middle);
        await merge_sort(middle + 1, right);
        await merge(left, middle, right);
    }
}

async function merge(left, middle, right) {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);

    let i = left;
    let l = 0;
    let r = 0;

    while (l < leftArray.length && r < rightArray.length) {
        if (leftArray[l] <= rightArray[r]) {
            array[i++] = leftArray[l++];
        } else {
            array[i++] = rightArray[r++];
        }
        await display_array(i - 1, left + l, left + r);
        await sleep(500); // Delay for visualization
    }

    while (l < leftArray.length) {
        array[i++] = leftArray[l++];
        await display_array(i - 1, left + l, left + r);
        await sleep(500); // Delay for visualization
    }

    while (r < rightArray.length) {
        array[i++] = rightArray[r++];
        await display_array(i - 1, left + l, left + r);
        await sleep(500); // Delay for visualization
    }
}

async function display_array(pivot, leftPointer, rightPointer, resetColors = false) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const position = document.createElement("div");
        position.setAttribute("class", "item");
        position.style.height = "100px";
        position.style.width = "100px";

        if (resetColors) {
            position.style.backgroundColor = ""; // Reset color
        } else {
            if (i === pivot) {
                position.style.backgroundColor = "brown"; // Color pivot element
            } else if (i >= leftPointer && i <= rightPointer) {
                position.style.backgroundColor = "purple"; // Color elements in the current segment being merged
            }
        }

        container.appendChild(position);
        position.textContent = array[i];
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
