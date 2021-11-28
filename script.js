const input = document.querySelector('form input[type="text"]');
const form = document.querySelector('form');
const itemList = document.querySelector('ul');
const btnRemoveChecked = document.querySelector('.container div button');
const btnAdd = document.querySelector('form input[type="submit"]');
let isLoading = true;

// Удаление выполненных задач при нажатии на кнопку "Remove checked".
btnRemoveChecked.addEventListener('click', (btnRemoveCheckedEvent) => {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
        itemList.querySelectorAll('li.checked').forEach((item) => {
            item.remove();
        })
        saveTasks();
    }
})

// Добавление задачи при нажатии на кнопку "Add".
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.replace(/ /g, '') !== '') {
        let li = document.createElement('li');
        let text = document.createTextNode(input.value);
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        // Переключение состояния задачи при нажатии на чекбокс.
        checkBox.addEventListener('change', (checkBoxEvent) => {
            if (checkBoxEvent.currentTarget.checked) {
                checkBoxEvent.currentTarget.parentNode.parentNode.classList.add('checked');
            } else {
                checkBoxEvent.currentTarget.parentNode.parentNode.classList.remove('checked');
            }
            saveTasks();
        })
        let span = document.createElement('span');
        let btnDelete = document.createElement('button');

        // Удаление задачи при нажатии на кнопку "✕".
        btnDelete.addEventListener('click', (btnDeleteEvent) => {
            btnDeleteEvent.target.parentNode.remove();
            saveTasks();
        })
        btnDelete.innerText = '✕';
        span.appendChild(checkBox);
        span.appendChild(text);
        li.appendChild(span);
        li.appendChild(btnDelete);
        li.appendChild(btnDelete);

        // Переключение состояния задачи при нажатии на неё.
        li.addEventListener('click', (liEvent) => {
            if (liEvent.target.type !== 'checkbox') {
                liEvent.currentTarget.querySelector('input').click();
                saveTasks();
            }
        })
        itemList.appendChild(li);
    }
    input.value = '';
    saveTasks();
});

// Сохранение задач в localStorage.
function saveTasks() {
    if (!isLoading) {
        let data = [];
        itemList.querySelectorAll('li').forEach((item) => {
            let itemObject = {
                checked: false
            };
            itemObject.text = item.querySelector('span').innerText;
            if (item.classList.contains('checked'))
                itemObject.checked = true;
            data.push(itemObject);
        })

        localStorage.setItem('data', JSON.stringify(data))
        console.log(`Data has been saved:`);
        console.log(data);
    }
}

// Подгрузка задач из localStorage.
function loadTasks() {
    isLoading = true;
    if (localStorage.length != 0 && JSON.parse(localStorage.getItem('data')).length != 0) {
        let data = JSON.parse(localStorage.getItem('data'));
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            input.value = data[i].text;
            btnAdd.click();
            let list = itemList.querySelectorAll('li');
            if (data[i].checked)
                list[list.length - 1].querySelector('input[type="checkbox"]').click();
        }
    }
    isLoading = false;
}

loadTasks();