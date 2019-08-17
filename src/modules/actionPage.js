import filter from './filter';

export default function actionPage() { 
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
    function filter111() {
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