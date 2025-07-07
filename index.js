const temaplateCard = document.getElementById('temaplte-card').content;
const cardTemplate = document.getElementById('pintarCard');
const fragment = document.createDocumentFragment();
const formcontrol = document.getElementById('form__control');
const btnSubmit = document.getElementById('btnSubmit');
const spinner = document.getElementById('spenner');
const containerCar = document.querySelector('.container-car');
let arrCarrito = {}


cardTemplate.addEventListener('click', (e) => {
    car(e)
})

const car = (e) => {
    const clickSpan = e.target.classList.contains('btn');

    if(clickSpan){
        setCar(e.target.parentElement)
    }
}

const setCar = (objeto) => {
    const imagen = objeto.parentElement.querySelector('img')
    
    const productos = {
        id: objeto.querySelector('.btn').dataset.id,
        image: imagen.getAttribute("src"),
        title: objeto.querySelector('h5').textContent,
        valor: objeto.querySelector('.number').textContent,
        cantidad: 1
    }

    if(arrCarrito.hasOwnProperty(productos.id)){
        productos.cantidad = arrCarrito[productos.id].cantidad + 1
        productos.valor = productos.cantidad * productos.valor
    }

    arrCarrito[productos.id] = {...productos}


    console.log(arrCarrito)

    // const validationArr = arrCarrito.indexOf(arrCarrito.length === -1)

    // if(validationArr){
    //     arrCarrito.push(productos)
    // }

    pintarCar(arrCarrito)
}

formcontrol.addEventListener('keyup', (e) => {
    e.preventDefault()
    const fomrInput = document.getElementById('fomrInput').value
    console.log(fomrInput)
})

window.addEventListener('load', (e) => {
    dataFunction()
})

const dataFunction = async () => {
    try {
        const res = await fetch('./dataForm.json')
        const resData = await res.json()
        pintarCard(resData.dato)
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = (data) => {
    console.log(data.slice(data.id, 4))
    data.forEach(items => {
        temaplateCard.querySelector('img').setAttribute('src', items.imgUrl)
        temaplateCard.querySelector('.card-title').textContent = items.title
        temaplateCard.querySelector('.card-text').textContent = items.text
        temaplateCard.querySelector('.number').textContent = items.valor
        temaplateCard.querySelector('.number').dataset.precio = items.valor
        temaplateCard.querySelector('.btn').dataset.id = items.id

        const clone = temaplateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cardTemplate.appendChild(fragment)
}

const pintarCar = () => {
    const carItems = Object.values(arrCarrito).map((carItem => `<div> <img src="${carItem.image}" width="30px" /> <br /> ${carItem.title} <br /> ${carItem.valor} <br /> ${carItem.cantidad}</div>`)).join(' ')
    containerCar.innerHTML = carItems
}
