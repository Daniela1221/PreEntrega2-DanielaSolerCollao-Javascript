/*
- Estructura html
- Variables de JS necesarias
- Funciones esenciales del proceso a simular
- Objetos de JS
- Arrays
- Métodos de búsqueda y filtrado sobre el Array
*/

// Stock del minimarket
const minimarket = [
    {nombre: "fideos", categoria: "alimento", cantidad: 20, precio: 900, img: "https://cdn.dimerc.cl/media/catalog/product/cache/1/thumbnail/x600/040ec09b1e35df139433887a97daa66f/7/7/7766c5268c258fcbbb7b51f3c91071e8.jpg"},
    {nombre: "arroz", categoria: "alimento", cantidad: 15, precio: 1500, img: "https://jumbo.vtexassets.com/arquivos/ids/395818/Arroz-grado-1-envase-degradable-2-kg.jpg"},
    {nombre: "atún", categoria: "alimento", cantidad: 30, precio: 1300, img: "https://orizoncl.vtexassets.com/arquivos/ids/159805/BANNER-HERO-1000x1000_-NUEVA63.jpg"},
    {nombre: "aceite", categoria: "alimento", cantidad: 10, precio: 2500, img: "https://r.btcdn.co/r/eyJzaG9wX2lkIjo0MDY0LCJnIjoiMTAwMHgifQ/f94f9d776de57d4/653371-7790272001005.jpg"},
    {nombre: "sal", categoria: "alimento", cantidad: 12, precio: 500, img: "https://www.salcaribe.cl/wp-content/uploads/2020/04/bolsa-lobos-gruesa-10x1kg.jpg"},
    {nombre: "azúcar", categoria: "alimento", cantidad: 9, precio: 1200, img: "https://santaisabel.vtexassets.com/arquivos/ids/189631/Azucar-blanca-granulada-1-kg.jpg"},
    {nombre: "lavalozas", categoria: "limpieza", cantidad: 6, precio: 2200, img: "https://cugat.cl/wp-content/uploads/2021/04/7805000115906-2.jpg"},
    {nombre: "esponja", categoria: "limpieza", cantidad: 23, precio: 300, img: "https://www.grupoegle.cl/wp-content/uploads//2016/09/ESPONJA-DE-LOZA-NOBEL.jpg"},
    {nombre: "virutilla", categoria: "limpieza", cantidad: 8, precio: 2000, img: "https://www.grupoegle.cl/wp-content/uploads//2019/06/VIRUTILLA-PLATA-NOBEL.jpg"},
    {nombre: "cloro", categoria: "limpieza", cantidad: 8, precio: 1200, img: "https://almaceniquique.cl/wp-content/uploads/2021/02/336612.jpg"},
    {nombre: "papel higénico", categoria: "baño", cantidad: 30, precio: 800, img: "https://alvicl.vtexassets.com/arquivos/ids/157882/Papel-higienico-doble-hoja-24-un.jpg"},
    {nombre: "pasta de dientes", categoria: "baño", cantidad: 10, precio: 1300, img: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750103591102L.jpg"},
    {nombre: "peineta", categoria: "baño", cantidad: 6, precio: 2000, img: "https://casadelestilista.cl/cdn/shop/products/01-15-006.png"},
    {nombre: "cepillo de dientes", categoria: "baño", cantidad: 9, precio: 1100, img: "https://kuru-ko.cl/cdn/shop/products/cepillo-dientes-extra-suave_2000x.jpg"},
];

// Visualización de todos los productos en el DOM
let productos = document.querySelector("#productos");
for (let item of minimarket) {
    let nombreCategoria = "";
    for (let i=1; i<item.categoria.length;i++){
        nombreCategoria += item.categoria[i];
    };
    let nombreProducto = "";
    for (let i=1; i<item.nombre.length;i++){
        nombreProducto += item.nombre[i];
    };
    productos.innerHTML += `
    <div class="conteiner gap-2 ml-2" style="width: 10rem;">
        <img src="${item.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title text-2xl text-center"><strong>${item.nombre[0].toLocaleUpperCase() + nombreProducto}</strong></h3>
            <p class="card-text text-center">Categoría: ${item.categoria[0].toLocaleUpperCase() + nombreCategoria}</p>
            <p class="card-text text-center">Precio: $ ${item.precio}</p>
        </div>
    </div>
    `;
};

// Función de búsqueda que realiza un filtro según las categorías disponibles.
function buscarCategoria() {
    let busqueda = prompt('Ingresar la categoría que desea buscar: ').toLowerCase();
    let resultado = document.getElementById("resultadoBusqueda");
    if (busqueda==='alimento' | busqueda==='limpieza' | busqueda==='baño') {
        let categorias = minimarket.filter( (item) => item.categoria.includes(busqueda));

        let nombreCategoria = "";
        for (let i=1; i<busqueda.length;i++){
            nombreCategoria += busqueda[i];
        };

        resultado.innerHTML = `<h2><u>Categoría: ${busqueda[0].toLocaleUpperCase() + nombreCategoria}</u></h2>`;
        for (let producto of categorias) {
            resultado.innerHTML += `
            <li>${producto.nombre}: $ ${producto.precio}</li>
            `;
        }
    } else {
        resultado.innerHTML = "<p><em>No se encuentra la Categoría solicitada</em></p>";
    }
};

// Función de Encargo de productos.
function encargarProductos(){
    let valor = 'True';
    let total = 0;
    let compras = [];
    while (valor === 'True') {
        let producto = prompt("Ingrese el nombre del producto que desea encargar ('exit' para dejar de agregar productos): ");
        let numero = prompt("Ingrese la cantidad que desea llevar del producto: ");

        numero = Number(numero);
        let existencia

        if (producto == 'exit') {
            // valor === "False";
            break;
        } else {
            let comprobacion = minimarket.find( (item) => item.nombre == producto);
            existencia = comprobacion;
        };
        // console.log(existencia);
        // console.log(typeof(existencia));

        if (existencia == undefined) {
            alert("El producto no se encuentra en el Minimarket Delicias, vuelve a intentar.");
        } else {
            if (Number.isInteger(numero)  && numero >= 0) {
                if (existencia.cantidad >= numero) {
                    existencia.cantidad -= numero;
                    let item = {nombre: existencia.nombre, valor: numero*existencia.precio} ;
                    compras.push(item);
                } else {
                    alert("La número ingresada excede la cantidad total del producto " + existencia.nombre + ". Vuelve a intentar.");
                };
            } else {
                alert("El valor ingresado no es correcto, vuelve a intentar.");
            };
        };
    };

    for (item of compras) {
        total += item.valor;
    };
    alert("El total a pagar por la lista de compras es: " + total + ".\nIngrese sus datos a continuación para continuar con la compra");
    let cliente = prompt("Ingrese su nombre: ");
    let direccion = prompt("Ingrese su dirección de despacho: ");
    let correo = prompt("Ingrese su correo electrónico: ");
    return alert("¡Gracias por su compra " + cliente + "!\nSe le enviará un correo con los detalles de la compra.\n ¡Que tenga un buen día!")
};
