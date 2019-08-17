import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');

    const catalogWrapper = document.querySelector('.catalog'),
        catalogList = document.querySelector('.catalog-list'),
        catalogBtn = document.querySelector('.catalog-button');
    
    const categories = new Set(); // !!! 
    const filterTitle = document.querySelector('.filter-title h5');

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

    const allLi = catalogList.querySelectorAll('li');
    //const allLiOld = catalogList.getElementsByTagName('li');
    //console.dir(allLi); //console.dir(allLiOld); //console.dir([...allLiOld]);

    catalogBtn.addEventListener('click', (event) => { //событие на клик
        if (catalogWrapper.style.display) { // отображает менюшку
            catalogWrapper.style.display = '';    
        } else { // закрывает ее
            catalogWrapper.style.display = 'block';
        }

        if (event.target.tagname === 'LI') {
            allLi.forEach(elem => {
                if (elem === event.target) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            });
            filterTitle.textContent = event.target.textContent; 
            filter();
        }
    });
    //console.log(event);
    
}