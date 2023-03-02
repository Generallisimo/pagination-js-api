// пишем фун которая будет делать запрос на сервер с нужным текстом
async function getData () {
    // запрос на сервер
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // декодируем в json
    const data = response.json();
    // выводим
    return data;
}
// фун которая будет запускать весь скрипт
async function main() {
    // получение данных
    const postsData = await getData();
    // нумирование стр
    let currentPage = 1;
    // кол-во постов на страницу
    let rows = 10;
    // сам текст он должен в себе содержать массив с данными кол-во и номер стр
    function displayList(arrData, rowPage, page){
        // укз место размещения
        const postsEl = document.querySelector(".posts")
        // также при запуске добавим чтобы инер все очищал и не наслаивалось друг на друга
        postsEl.innerHTML = "";
        // уменьшаем номер страницы на один так как у нас стоит 1 и мы будем получать не первые 10 а вторые
        page --;
        // указываем начало и конец где вначале мы умножаем кол на стр в конец просто к старту складываем кол-во и так получаем диапозон
        const start = rowPage * page;
        const end = start + rowPage;
        // получаем из массива диапозон где slice дает возомжность вывести индексы из массива
        const paginationData = arrData.slice(start, end);
        // проходимся по массиву с форичем
        paginationData.forEach((el)=>{
            // создаем див
            const postEl = document.createElement("div");
            // добавим класс
            postEl.classList.add(".post");
            // выводим через переменную полученные из массива данные 
            postEl.innerText = `${el.title}`;
            // закидываем полученное в див
            postsEl.appendChild(postEl);
        })
    };
    // пагинация текста
    function displayPagination(arrData, rowPage){
        const paginationEl = document.querySelector('.pagination');
        // чтобы понять сколько кнопок пагинации должно быть мы кол-во в массиве делим на кол-стр и округлить
        const pagesCount = Math.ceil(arrData.length / rowPage);
        // создаем кнопки
        const ulEl = document.createElement("ul");
        ulEl.classList.add("pagination__list");
        // пишем цикл который будет создавать стр
        for (let i = 0; i < pagesCount; i++){
            // пишем получнное значение через фун которая отвечает за активность
            const liEl = displayPaginationBtn(i + 1);
            // возвращаем в ul
            ulEl.appendChild(liEl);
        }
        // завершаем вкадываени
        paginationEl.appendChild(ulEl);
    };
    // кнопки переключения(то что в скобках мы можем использовать для передачи в фун нужного нам значения)
    function displayPaginationBtn(page){
        // создаем li 
        const liEl = document.createElement("li")
        liEl.classList.add("pagination__item")
        // указываем страниуц заложенную в фун
        liEl.innerText = page
        // добавим класс активный
        if(currentPage == page) liEl.classList.add("pagination__item--active")
        // создадим фун-ию которая будет переключать страницу
        liEl.addEventListener("click", ()=>{
            // переносим значение и курент уже не 1 а полученное значение
            currentPage = page
            // вызываем полученное из массива с помощью фун
            displayList(postsData, rows, currentPage);
            // удаляем ненжный класс с не активной стр
            let currentRemove = document.querySelector("li.pagination__item--active")
            currentRemove.classList.remove("pagination__item--active")
            // добавляем новой странице класс
            liEl.classList.add("pagination__item--active")
        })
        // возвращаем
        return liEl;
    };
    // выводим на экран
    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
}
// запуск 
main();