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
toggleCheakbox();

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
toggleCart();
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
addCart();
// end работа с корзиной

// фильтры и поиск
function actionPage() { 
    // фильтр по акции
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });
    
    // фильтр по цене
    
    const min = document.getElementById('min'),
        max = document.getElementById('max');
    
    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelectorAll('.card-price'); 
            const price = parseFloat(cardPrice.textContent);
            console.log(cardPrice, min.value, max.value);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    }
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

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
      //search.value = '';
    });

}
actionPage();











// end фильтр Акции