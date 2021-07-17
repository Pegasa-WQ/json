const input = document.getElementById('input');
let endFile = 0;
const container = document.querySelector('.container');

function download(input) {
    let file = input.files[0];


    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        endFile = reader.result;
    };

}


const h1 = document.getElementsByTagName('h1');
let form = 0;
let label = 0;
let div = 0;

function createInput(array) {
    for (let i in array) {
        let arrayKeys = Object.keys(array[i]);
        for (let key of arrayKeys) {
            if (key == 'label') {
                label = document.createElement('label');
                label.innerHTML = array[i].label;
                form.append(label);
            } else if (key == 'input') {
                inputKeys = Object.keys(array[i].input)
                if (['email', 'password', 'number', 'file', 'text', 'date', 'checkbox'].includes(array[i].input['type'])) {
                    let input = document.createElement('input');
                    for (let k of inputKeys) {
                        if (inputKeys.includes('mask')) {
                            array[i].input['type'] = 'text';
                            let im = new Inputmask(array[i].input['mask']);
                            im.mask(input);
                        }
                        if (k !== 'mask' && k !== 'filetype' && k !== 'checked') {
                            input.setAttribute(k, array[i].input[k])
                        } else if (k == 'mask') {
                            input.setAttribute("placeholder", array[i].input[k]);
                        } else if (k == 'filetype') {
                            input.setAttribute('accept', `.${array[i].input[k].join(', .')}`)
                        }
                        form.append(input);
                    }
                } else if (array[i].input['type'] == 'textarea') {
                    let textarea = document.createElement('textarea');
                    textarea.setAttribute("required", 'true');
                    form.append(textarea);
                } else if (array[i].input['type'] == 'color') {
                    arrayColors = array[i].input['colors'];
                    for (let j = 0; j < arrayColors.length; j++) {
                        let input = document.createElement('input');
                        input.setAttribute("value", arrayColors[j])
                        input.setAttribute("type", "color")
                        form.append(input);
                    }
                } else {
                    let select = document.createElement('select');
                    for (let elem of inputKeys) {
                        if (Array.isArray(array[i].input[elem])) {
                            for (let el of array[i].input[elem]) {
                                select.innerHTML += `<option>${el}</option>`;
                            }
                        } else if (elem != 'type') {
                            select.setAttribute(elem, array[i].input[elem])
                        }
                    }
                    form.append(select);
                }
            }
        }
    }
}


function createReferences(array) {
    div = document.createElement('div')
    form.append(div);
    for (let i in array) {
        let arrayKeys = Object.keys(array[i]);
        for (let elem of arrayKeys) {
            if (elem == 'input') {
                let input = document.createElement('input');
                inputKeys = Object.keys(array[i].input)
                for (let k of inputKeys) {
                    if (k !== 'checked') {
                        input.setAttribute(k, array[i].input[k])
                        div.append(input);
                    }
                }
            } else if (elem == 'text without ref') {
                span = document.createElement('span');
                span.innerHTML = array[i]['text without ref'];
                div.append(span);
            } else if (elem === 'text') {
                a = document.createElement('a');
                a.innerHTML = array[i]['text'];
                a.setAttribute('href', array[i]['ref'])
                div.append(a);
            } else if (elem === 'text') {
                a = document.createElement('a');
                a.innerHTML = array[i]['text'];
                a.setAttribute('href', array[i]['ref'])
                div.append(a);
            }
        }
    }
}

function createButton(element) {
    let button = document.createElement('button');
    button.innerHTML = element.text;
    return button;
}

function andere(array, object) {
    container.append(form);
    for (let key in array) {
        if (array[key] == 'fields') {
            let arrayFields = object[array[key]];
            createInput(arrayFields);

        } else if (array[key] == 'references') {
            let arrayReferences = object[array[key]];
            createReferences(arrayReferences);
        }
        else if (array[key] == 'buttons') {
            object[array[key]].forEach(el => form.append(createButton(el)));
        }
    }
}





window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#button').addEventListener('click', function () {
        if (endFile !== 0 && form == 0) {
            form = document.createElement('form')
            let object = JSON.parse(`${endFile}`);
            let objectKeys = Object.keys(object);
            andere(objectKeys, object);
            endFile = 0;
        }
    })
})

window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#dropping').addEventListener('click', function () {
        form.remove();
        input.value = '';
        endFile = 0;
        form = 0;
    })
})