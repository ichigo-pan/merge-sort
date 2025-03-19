// Базовые настройки
const arrSize = 25;
const canvasWidth = 1000;
const canvasHeight = 450;
const delay = 50;
let values = [];
let state = [];

// создаём переменные
const canvas = document.querySelector('#canvas');
const sort = document.querySelector('#sort');
const shuffle = document.querySelector('#shuffle');


// Настраиваем канвас
const ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const barWidth = canvasWidth / arrSize;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawArray() {
    // очищаем поле полностью
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // цикл рисуем колонны пока их не станет столько же, сколько должно быть чисел в массиве
    for (let i = 0; i < arrSize; i++) {
        // цвет должен соответствовать состоянию: сравнение - красный, был в сортировке - зелёный, не был в сортировке - серый
        ctx.fillStyle = state[i] === 1 ? "red" : state[i] === 2 ? "green" : "gray";
        // рисуем каждую колонну
        ctx.fillRect(i * barWidth, canvasHeight - values[i], barWidth, values[i]);

    }

}

function initArr() {
    // очищаем массив чисел
    values = new Array();
    // очищаем массив состояний
    state = new Array(arrSize).fill(0);
    // цикл пока длина массива меньше заданной настройкой
    while (values.length < arrSize) {
        // записываем во временную переменную случайное число
        num = Math.floor(Math.random() * (canvasHeight - 15) + 20)
        // если такого числа ещё нет в массиве
        if (values.indexOf(num) === -1) {
            // записываем в массив
            values.push(num);
        }
    }
    // рисуем
    drawArray();
}

async function mergeSort(left, right) {
    // проверка на больше одного элемента в массиве
    if (left < right) {
        // ищем индекс середины, поделив пополам
        let middle = Math.floor((left + right) / 2);
        // повторяем цикл с левой частью
        await mergeSort(left, middle);
        // с правой
        await mergeSort(middle + 1, right);
        // сравнение и сортировка массива
        await merge(left, middle, right);
    }
}

async function merge(left, middle, right) {
    // временный массив для итогов
    let tempArr = [];
    // начало первого массива
    let i = left;
    // начало второго массива
    let j = middle + 1;

    while (i <= middle && j <= right) {
        // красим в зелёный
        state[i] = state[j] = 1;
        drawArray();
        await sleep(delay);

        // сравнение, что меньше
        if (values[i] < values[j]) {
            tempArr.push(values[i++]);
        } else {
            tempArr.push(values[j++]);
        }
    }
    // если какой-то массив остался не пустым, остатки загоняем во временный
    while (i <= middle) tempArr.push(values[i++]);
    while (j <= right) tempArr.push(values[j++]);

    for (let k = 0; k < tempArr.length; k++) {
        // возвращаем значения в настоящий
        values[left + k] = tempArr[k];
        // рисуем
        state[left + k] = 2;
        drawArray();
        await sleep(delay);
    }
}

async function start() {
    // отбираем у пользователя возможность перемешать массив пока сортировка не закончилась
    shuffle.toggleAttribute('disabled');
    // здеся начинается сортировка и мы ждём, пока она полностью не закончится
    await new Promise((resolve, reject) => {
        setTimeout(() => resolve(mergeSort(0, arrSize - 1)), 500);
    });
    // возвращаем возможность перемешивать массив
    shuffle.toggleAttribute('disabled');


}

// создание массива при загрузке страницы
initArr();

// Слушаем
sort.addEventListener('click', start);
shuffle.addEventListener('click', initArr);

























