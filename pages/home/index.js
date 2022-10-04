const body = document.querySelector('body')
const btnDarkMode = document.querySelector('#btn-dark-mode')
const buttonsList = document.querySelector('.buttons-list');
const rangeBar = document.querySelector('#range-bar');

btnDarkMode.onclick = () => {
    if (body.classList.contains('dark-mode')) {
        btnDarkMode.style.backgroundImage = "url('../../assets/img/darkmode-off.svg')";
    } else{
        btnDarkMode.style.backgroundImage = "url('../../assets/img/darkmode-on.svg')";
    }
    body.classList.toggle("dark-mode")
}



/* ----------- INSERIR DINAMICAMENTE BOTÕEs DO FILTRO ------------- */
function renderCategories() {
    let count = 0;
    categories.forEach(element => {
        buttonsList.insertAdjacentHTML('beforeend',
            `<li>
                <button data-category="${count}">${element}</button>
            </li>`
        )
        count++
    })
    filterCategory(products, Number(rangeBar.value));
}
renderCategories();
renderAlbums(products);

/* ------------ MAPEAR BOTÕES DO FILTRO ----------- */
function filterCategory(array, max) {
    let category = 0;
    const filterList = document.querySelectorAll('[data-category]');
    filterList[0].classList.add('button-selected')

    rangeBar.onmousemove = () => {
        const maxPrice = document.querySelector('.max-price span')
        max = Number(rangeBar.value)
        maxPrice.innerText = `Até R$ ${max.toFixed(2).replace('.', ',')}`
        // console.log("categoria selecionada ", category)
        const filteredItems = array.filter(element => {
            // console.log("categoria array ", element.category)
            return (element.category == category || category == 0) && element.price <= max
        })
        renderAlbums(filteredItems)
     }

    filterList.forEach(element => {
        element.onclick = () => {
            filterList.forEach(element => element.classList.remove('button-selected'))
            category = element.getAttribute('data-category')
            element.classList.add('button-selected')
            const filteredItems = array.filter(element => {
                return (element.category == category || category == 0) && element.price <= max
            })
            renderAlbums(filteredItems);
        }
    })


}

/* ----------- FILTRAR DADOS SELECIONADOS ------------- */


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
                <small>${element.band}</small>
                <small>${element.year}</small>
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




/* FILTRAR POR GêNERO E POR PREÇO MÁXIMO */
/* return product.category === X && product.price === X*/

/* O filtro por gênero musical deve ser por meio evento de click dos botões
O filtro por preço máximo deve ser por meio evento de mousemove do input range */

/* Alterar o valor máximo do input range para o valor do álbum com o maior preço, para alterar esse valor, você utiliza a propriedade max do input. */

/* Alterar o tema da aplicação entre dark-mode e light-mode, o tema escolhido pelo usuário deve ser salvo no localstorage. */