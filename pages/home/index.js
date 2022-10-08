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
    filterCategory(products);
}


/* ------------ MAPEAR BOTÕES DO FILTRO ----------- */
function filterCategory(array) {
    let category = 0;
    const categoriesList = document.querySelectorAll('[data-category]');
    const maxPrice = document.querySelector('.max-price span')
    categoriesList[0].classList.add('button-selected')

    rangeBar.oninput = (event) => {
        let target = event.target
        const min = target.min
        const max = target.max
        const value = Number(target.value)

        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
        maxPrice.innerText = `Até R$ ${value.toFixed(2).replace('.', ',')}`

        filterItems(array,category)
    }

    categoriesList.forEach(element => {
        element.onclick = () => {
            categoriesList.forEach(element => element.classList.remove('button-selected'))
            category = element.getAttribute('data-category')
            element.classList.add('button-selected')

            filterItems(array,category)
        }
    })
}


/* ------------- FILTRAR OS DADOS RECEBIDOS --------------*/
function filterItems(array,category) {
    const value = Number(rangeBar.value)
    const filteredItems = array.filter(element => {
        return (element.category == category || category == 0) && element.price <= value
    })
    renderAlbums(filteredItems);
}


/* -------------- RENDERIZAR OS DADOS RECEBIDOS --------------*/
function renderAlbums(array) {
    const albumList = document.querySelector('.album-list');
    albumList.innerHTML = ''
    array.forEach(element => {
        albumList.insertAdjacentHTML('afterbegin',
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