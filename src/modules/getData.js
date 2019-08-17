export default async function getData() {
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