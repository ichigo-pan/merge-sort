// длина массива
const arrSize = 50;
let unsortedArray = [];
while (unsortedArray.length < arrSize) {
    // записываем во временную переменную случайное число
    num = Math.floor((Math.random() * arrSize) + 1);
    // если такого числа ещё нет в массиве
    if (unsortedArray.indexOf(num) === -1) {
        // записываем в массив
        unsortedArray.push(num);
    }
}

function mergeSort(unArray) {
    // находим длину массива
    let length = unArray.length;
    // если состоит из одного элемента, то сортировать нечего
    if (length < 2) {
        return unArray;
    }
    // делим массив на 2 части "пополам"
    let middle = Math.round(length / 2)
    let leftHalf = unArray.slice(0, middle);
    let rightHalf = unArray.slice(middle);

    // рекурсия
    return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

function merge(leftArr, rightArr) {
    // массив для каждого цикла сортировки
    let newArr = [];
    // пока в оба массива не пустые
    while (leftArr.length && rightArr.length) {
        // сравнение первого элемента левого массива с первым элементом правого
        if (leftArr[0] < rightArr[0]) {
            // удаляем из левого массива, переносим в массив для сортировки
            newArr.push(leftArr.shift());
        } else {
            // удаляем из правого массива, переносим в массив для сортировки
            newArr.push(rightArr.shift());
        }

    }
    // возвращаем отсортированный массив
    return [...newArr, ...leftArr, ...rightArr];
}

// сохраняем готовый результат
let sortedArr = mergeSort(unsortedArray);

// выводим в консоль
console.log(sortedArr);


