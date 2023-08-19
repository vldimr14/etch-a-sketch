const root = document.querySelector('.root');
const fieldDivSize = 502; // field size in px
let field = getGrid(16);

const title = document.createElement('h1');
title.classList.add('title');
title.textContent = 'Etch-a-sketch';

// Error message
const errorMessage = document.createElement('p');
errorMessage.classList.add('error-message');

// Color picker
const colorPickerDiv = document.createElement('div');
colorPickerDiv.classList.add('color-picker');
const colorLabel = document.createElement('p');
colorLabel.classList.add('label');
colorLabel.textContent = 'Pick the color: ';
const colorInput = document.createElement('input');
colorInput.id = 'color-picker';
colorInput.type = 'color';

colorPickerDiv.appendChild(colorLabel);
colorPickerDiv.appendChild(colorInput);

// Set size field
const setSizeField = document.createElement('div');
const input = document.createElement('input');
input.id = 'size';
input.name = 'size';
input.placeholder = 'Grid size, up to 100';

const setSizeBtn = document.createElement('button');
setSizeBtn.textContent = 'Set size';
setSizeBtn.addEventListener('click', setSize);

setSizeField.appendChild(input);
setSizeField.appendChild(setSizeBtn);

root.appendChild(title);
root.appendChild(errorMessage);
root.appendChild(colorPickerDiv);
root.appendChild(setSizeField);
root.appendChild(field);

// Functions 

function getGrid(size) {
    const field = document.createElement('div');
    field.classList.add('field');
    const grid = [];

    for (let i = 0; i < size; i++) {
        const row = [];

        for (let j = 0; j < size; j++) {
            const div = document.createElement('div');
            div.classList.add('square');
            div.style.cssText = `width: ${fieldDivSize / size}px; height: ${fieldDivSize / size}px`;
            div.addEventListener('mouseover', (e) => {
                changeSquareColor(e.target, colorInput.value);
            });
            div.id = j;
            row.push(div);
        }

        grid.push(row);
    }

    grid.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        row.forEach((square) => {
            rowDiv.appendChild(square);
        });
        field.appendChild(rowDiv);
    });

    return field;
}

function changeSquareColor(square, color) {
    square.style.backgroundColor = color;
}

function setSize() {
    const size = +document.querySelector('#size').value;

    if (size > 100 || !Number.isInteger(size)) {
        errorMessage.textContent = 'Error. Limit is 100! Check if you entered a correct value.';
        document.querySelector('#size').value = '';
        return;
    } 

    errorMessage.textContent = '';

    root.removeChild(field);
    
    field = getGrid(size);

    root.appendChild(field);
}