
const lengthInput = document.getElementById('length-input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let arr = [];


let sortedIndex = -1;
let swapIndex1 = -1;
let swapIndex2 = -1;
document.getElementById('randomize-btn').addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    arr = Array.from({ length }, () => Math.floor(Math.random() * (canvas.height - 10)) + 1);
    sortedIndex = -1;
    swapIndex1 = -1;
    swapIndex2 = -1;
    drawArray();
});



document.getElementById('bubble-sort-btn').addEventListener('click', () => {
    bubbleSort();
});

document.getElementById('selection-sort-btn').addEventListener('click', () => {
    selectionSort();
});

document.getElementById('insertion-sort-btn').addEventListener('click', () => {
    insertionSort();
});
lengthInput.addEventListener('input', () => {
    const length = parseInt(lengthInput.value);
    arr = Array.from({ length }, () => Math.floor(Math.random() * (canvas.height - 10)) + 1);
    sortedIndex = -1;
    swapIndex1 = -1;
    swapIndex2 = -1;
    drawArray();
});


drawArray();
function insertionSort() {
    let i = 1;

    function innerLoop() {
        if (i >= arr.length) {
            sortedIndex = arr.length - 1;
            swapIndex1 = -1;
            swapIndex2 = -1;
            drawArray();
            return;
        }

        const value = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > value) {
            sortedIndex = i;
            swapIndex1 = j;
            swapIndex2 = j + 1;

            arr[j + 1] = arr[j];
            j--;

            drawArray();
        }

        arr[j + 1] = value;
        i++;

        setTimeout(innerLoop, 300);
    }

    innerLoop();
}
function selectionSort() {
    let i = 0;

    function innerLoop() {
        if (i >= arr.length - 1) {
            sortedIndex = arr.length - 1;
            swapIndex1 = -1;
            swapIndex2 = -1;
            drawArray();
            return;
        }

        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        sortedIndex = i;
        swapIndex1 = i;
        swapIndex2 = minIndex;

        if (i !== minIndex) {
            swap(i, minIndex);
        }

        i++;

        setTimeout(innerLoop, 300);
    }

    innerLoop();
}

function bubbleSort() {
    let sorted = false;
    let end = arr.length - 1;
    let i = 0;

    function innerLoop() {
        if (i >= end) {
            if (sorted) {
                sortedIndex = 0;
                swapIndex1 = -1;
                swapIndex2 = -1;
                drawArray();
                return;
            }
            end--;
            i = 0;
            sorted = true;
        }

        sortedIndex = end;
        swapIndex1 = i;
        swapIndex2 = i + 1;

        if (arr[i] > arr[i + 1]) {
            sorted = false;
            swap(i, i + 1);
        }

        i++;

        setTimeout(innerLoop, 300);
    }

    innerLoop();
}


function swap(i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    drawArray();
}

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const columnWidth = canvas.width / arr.length;
    const maxColumnHeight = canvas.height - 40;
    const scalingFactor = maxColumnHeight / Math.max(...arr);
    const padding = 10;

    arr.forEach((value, index) => {
        const x = columnWidth * index;
        const height = value * scalingFactor;
        const y = canvas.height - height;
        const color =
            index === sortedIndex
                ? "green"
                : index === swapIndex1 || index === swapIndex2
                    ? "red"
                    : "blue";

        ctx.fillStyle = color;
        ctx.fillRect(x, y, columnWidth, height);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(value, x + columnWidth / 2, y - padding);
    });
}