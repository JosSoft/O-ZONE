export default function toggleCheakbox() {
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