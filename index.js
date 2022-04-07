class Llave{
    constructor({model,year, price, id}){
        this._model = model,
        this._price = price,
        this._year = year,
        this.id = id
    }
    get model(){
        return this._model;
    }
    set model(newModel){
        this._model = newModel;
    }
    get price(){
        return this._price;
    }
    set price(newPrice){
        this._price = newPrice;
    }
    get year(){
        return this._year;
    }
    set year(newYear){
        this._year = newYear;
    }
}
const modelos = ["Hierro", "Bronce", "Plata", "Oro", "Platino", "Diamante" ];
const llaves = [];
for (let i = 0; i < 20; i++) {
    let randomYear = Math.random() * 33;
    randomYear = Math.floor(randomYear);
    let year = 1990 + randomYear;
    let randomModel = Math.random() * modelos.length + 1;
    
    randomModel = Math.floor(randomModel);
    randomModel -= 1;
    let modelo = modelos[randomModel];
    let randomPrice = Math.random() * 2;
    randomPrice *= 5000;
    randomPrice = Math.floor(randomPrice - 1);
    let price = randomPrice + 5000;
    let llave = new Llave({
        model: modelo,
        year: year,
        price: price,
        id : i + 1
    })
    llaves.push(llave); 
}

const crearNodos = (coleccionDeLlaves)=>{
    let llavesContainer = document.querySelector(".llaves__container");
    llavesContainer.innerHTML = " ";
    let fragmentoLlaves = document.createDocumentFragment();
    coleccionDeLlaves.forEach((llave, index)=>{
        let imagenLlave = document.createElement("img");
        imagenLlave.setAttribute("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojidex/112/key_1f511.png");
        let titulo = document.createElement("p");
        titulo.classList.add("llave__titulo");
        titulo.innerHTML = `Llave # ${llave.id}`;
        let year = document.createElement("label");
        year.classList.add("llave__year");
        year.innerHTML = `${llave.year}`;
        let model = document.createElement("label");
        model.classList.add("llave__model");
        model.innerHTML = `${llave.model}`;
        let price = document.createElement("label");
        price.classList.add("llave__price");
        price.innerHTML = ` $${llave.price}`;
        let description = document.createElement("div");
        description.classList.add("llave__description");
        description.appendChild(year);
        description.appendChild(model);
        description.appendChild(price);
        let nodoLlave = document.createElement("div");
        nodoLlave.appendChild(titulo);
        nodoLlave.appendChild(imagenLlave);
        nodoLlave.appendChild(description);
        nodoLlave.classList.add("llave");
        nodoLlave.setAttribute("tabIndex", index + 1);
        nodoLlave.addEventListener("focus", ()=> {
            keyData(llave.year, llave.model)
        })
        llavesContainer.appendChild(nodoLlave);
    });
    llavesContainer.appendChild(fragmentoLlaves);
}
const crearSelects = () => {
    let selectContainer = document.querySelector("#models");
    const fragmentoSelects = document.createDocumentFragment();
    modelos.forEach(modelo => {
        let option = document.createElement("option");
        option.innerHTML = modelo;
        option.setAttribute("value", modelo);
        fragmentoSelects.appendChild(option);
    });
    selectContainer.appendChild(fragmentoSelects);
}
const buscarLlaves = ()=>{
    let model = document.querySelector("#models");
    let year = document.querySelector("#years");
    model = model.value;
    year = parseInt(year.value);
    let llavesFiltradas = llaves.filter(llave => llave.year >= year && llave.model == model)
    crearNodos(llavesFiltradas);
}

const keyData = (year, model) =>{
    const keyDataInput = document.querySelector("#data-key");
    keyDataInput.value = `${year} ${model}`;
}

let search = document.querySelector("#search");
search.addEventListener("click", ()=>{
    buscarLlaves();
});
let searchAll = document.querySelector("#searchAll");
searchAll.addEventListener("click", ()=>{
    crearNodos(llaves);
});
let sumbitButton = document.querySelector("#submit");
sumbitButton.addEventListener("click", ()=> {
    let llaveAEnviar = document.querySelector("#data-key");
    llaveAEnviar = llaveAEnviar.value;
    if(llaveAEnviar !== ""){
        alert(`Se hizo el pedido de la llave ${llaveAEnviar}`)
    }else{
        alert("No se ha seleccionado ninguna llave para enviar");
    }
})


crearSelects();
crearNodos(llaves);