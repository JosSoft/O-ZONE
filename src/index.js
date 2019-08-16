"use strict";

// чекбоксы
function toggleCheakbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(item => {
        item.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}
// end чекбоксы

//корзина
function toggleCart() {

    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}
// end корзина

// работа с корзиной
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            //cartEmpty.remove();
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });

    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price'); //все товары
        const cardTotal = document.querySelector('.cart-total span'); // поле цена

        countGoods.textContent = cardsCart.length;

        let sum = 0;
        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
// end работа с корзиной

//Фильтр и поиск
function actionPage() { 
    // 1. фильтр по акции
    const cards = document.querySelectorAll('.goods .card'), //карточки товаров
        discountCheckbox = document.getElementById('discount-checkbox'); // фильтр акция
    discountCheckbox.addEventListener('click', filter);

    // 2. фильтр по цене
    const min = document.getElementById('min'),
        max = document.getElementById('max');
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    // 3. фильтр по категории
 

    //////////////////////////////////////////////////////////////////////
    function filter() {
        cards.forEach((card) => {
            let res = ['', '', '']; //по умолчанию все показываем
            // 1 фильтр
            if (discountCheckbox.checked) { if (!card.querySelector('.card-sale')) { res[0] = 'none'; }} 
            // 2 фильтр
            const cardPrice = card.querySelector('.card-price'); 
            const price = parseFloat(cardPrice.textContent);
            if ((min.value && price < min.value) || (max.value && price > max.value)) { res[1] = 'none'; } 
            // 3 фильтр
            //if (cat !== card.getAttribute('data-category')) {res[2] = 'none';} 
                
            // вывод
            if (res[0] == res[1] && res[1] == res[2])  { 
                card.parentNode.style.display = res[0]; // или оба фильтра совпадают, или обе нет
            } else { // 1 из условий не выполняются, значит не показываем
                card.parentNode.style.display = 'none'; 
            }
        });
    }   
    //////////////////////////////////////////////////////////////////////

    // поиск товара
    const search = document.querySelector('.search-wrapper_input'), 
        searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        console.log('searchText: ', searchText);
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
        search.value = '';
    });

}

// получение данных с сервера
// заработал только такой вариант, getData_ работать ни в какую не захотел.
async function getData() {
    const response = await fetch('../db/db.json');
    const data = await response.json();
    return data;
}
// !!!не заработал!!!
function getData_() {
    fetch('../db/db.json').then(response => {
        if (response.ok) {
            return response.json();    
        } else {
            throw new Error ('Данные не были получены, ошибка: ' + response.status);
        }
    })
    .then(data => data) // renderCards(data))
    .catch(err => {
        console.warn(err);
        document.querySelector('.goods').innerHTML = `
            <div style="color:red; font-size:30px">
                Упс, что-то пошло не так
            </div>';
        `;
    });
}

// выводим карточки товара 
function renderCards(data) {
    //console.log(data);
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach(good => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
        <div class="card" data-category="${good.category}">
            ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${good.sale ? 'color:red' : ''}">
                    ${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goodsWrapper.appendChild(card);
    });
}
// end получение данных с сервера

// заполнение каталога 
function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');

    const catalogWrapper = document.querySelector('.catalog'),
        catalogList = document.querySelector('.catalog-list'),
        catalogBtn = document.querySelector('.catalog-button');
    
    const categories = new Set(); // !!! 

    cards.forEach(card => { // заполняем категории уникальными значениями
        categories.add(card.dataset.category);
    });
    categories.add("ВСЕ");
    //console.log(categories);

    categories.forEach(item => { // добавляем категории в Каталог
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => { //событие на клик
        if (catalogWrapper.style.display) { // отображает менюшку
            catalogWrapper.style.display = '';    
        } else { // закрывает ее
            catalogWrapper.style.display = 'block';
        }

        if (event.target.tagname === 'LI') {
            cards.forEach(card => {
                if (card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        }
    });
    //console.log(event);
}
// end каталог

function catalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catList = document.querySelectorAll('.catalog-list li');
    catList.forEach(item => { 
        item.addEventListener('click', () => {
            const cat = item.textContent;
            console.log(cat);
            cards.forEach(card => {
                if (cat === "ВСЕ") {
                    card.parentNode.style.display = '';
                } else {
                
                    if (cat === card.getAttribute('data-category')) {
                        card.parentNode.style.display = '';
                    } else { 
                        card.parentNode.style.display = 'none'; 
                    }
                
                }
            });
        });    
    });    
}


getData().then(data => {
    renderCards(data);
    
    toggleCheakbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();

    catalog();
})
.catch(err => {
    console.warn(err);
    document.querySelector('.goods').innerHTML = `
        <div style="color:red; font-size:30px">
            Упс, что-то пошло не так
        </div>';
    `;
});