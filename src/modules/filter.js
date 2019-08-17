export default function filter() {
    const cards = document.querySelectorAll('.goods .card'), //карточки товаров
        discountCheckbox = document.getElementById('discount-checkbox'); // фильтр акция
    discountCheckbox.addEventListener('click', filter);

    // 2. фильтр по цене
    const min = document.getElementById('min'),
        max = document.getElementById('max');

    // 3. каталог
    const activeLi = document.querySelector('.catalog-list li.active');
    

    cards.forEach(card => {
        const cardPrice = card.querySelector('.card-price'); 
        const price = parseFloat(cardPrice.textContent);
        const discount = card.querySelector('.card-sale');

        card.parentNode.style.display = '';

        if ((min.value && price < min.value) || (max.value && price > max.value)) {
            card.parentNode.style.display = 'none'; 
        } else if (discountCheckbox.checked && !discount) {
            card.parentNode.style.display = 'none'; 
        } else if (activeLi) {
            if (card.dataset.category !== activeLi.textContent) {
                card.parentNode.style.display = 'none'; 
            } 
        } 
    });

}

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