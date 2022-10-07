const buttonsList = document.querySelector('.buttons-list');
const rangeBar = document.querySelector('#range-bar');

renderCategories();
renderAlbums(products);

/* ----------- INSERIR DINAMICAMENTE BOTÕEs DO FILTRO ------------- */
function renderCategories() {
    let count = 0;
    categories.forEach(category => {
        buttonsList.insertAdjacentHTML('beforeend',
            `<li>
                <button data-category="${count}">${category}</button>
            </li>`
        )
        count++
    })
    filterCategory(products, Number(rangeBar.value));
}


/* ------------ MAPEAR BOTÕES DO FILTRO ----------- */
function filterCategory(array, max) {
    let category = 0;
    const categoriesList = document.querySelectorAll('[data-category]');
    categoriesList[0].classList.add('button-selected')

    rangeBar.oninput = () => {
        const maxPrice = document.querySelector('.max-price span')
        max = Number(rangeBar.value)
        maxPrice.innerText = `Até R$ ${max.toFixed(2).replace('.', ',')}`
        const filteredItems = array.filter(item => {
            return (item.category == category || category == 0) && item.price <= max
        })
        renderAlbums(filteredItems)
    }

    categoriesList.forEach(element => {
        element.onclick = () => {
            categoriesList.forEach(element => element.classList.remove('button-selected'))
            category = element.getAttribute('data-category')
            element.classList.add('button-selected')
            const filteredItems = array.filter(element => {
                return (element.category == category || category == 0) && element.price <= max
            })
            renderAlbums(filteredItems);
        }
    })
}


/* RENDERIZAR OS DADOS RECEBIDOS */
function renderAlbums(array) {
    const albumList = document.querySelector('.album-list');
    albumList.innerHTML = ''
    array.forEach(element => {
        albumList.insertAdjacentHTML('beforeend',
            `<li class="album-item">
            <div class="album-image">
            <img src=${element.img} alt="album musical">
            </div>
            <div class="album-content">
            <div>
                <span class='small'>${element.band}</span>
                <span class='small'>${element.year}</span>
            </div>
            <h3>${element.title}</h3>
            <div>
                <span>R$ ${element.price.toFixed(2).replace('.', ',')}</span>
                <button>Comprar</button>
            </div>
            </div>
        </li>`
        )
    });
}