// Declaración
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");

let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let preciosTotal = document.getElementById("precioTotal");

let isValid = true;
let cont = 0;
let costoTotal = 0;
let totalEnproductos = 0;

let datos = [];


function ValidarCantidad() {
    if (txtNumber.value.trim().length <= 0 || isNaN(txtNumber.value) || Number(txtNumber.value) <= 0) {
        return false;
    }
    return true;
} // Función para validar la cantidad


function getPrecio() {
    return Math.round(Math.random() * 1000) / 100;
} // Función para obtener un precio aleatorio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault(); // Evento click del botón "Agregar"

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();
    isValid = true;

    if (txtName.value.length < 3) {
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtName.style.border = "";
    }

    if (!ValidarCantidad()) {
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es válida.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtNumber.style.border = "";
    }

    if (isValid) {
        alertValidaciones.style.display = "none";
        let precio = getPrecio();
        cont++;
        let row = `
            <tr>
                <td>${cont}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
            </tr>`;
        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };
        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalEnproductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnproductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("totalEnProductos", totalEnproductos);
        localStorage.setItem("cont", cont);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
}); // Limpiar y validar campos

btnClear.addEventListener("click", function () {
    txtName.value = "";
    txtNumber.value = "";
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidaciones.style.display = "none";

    cont = 0;
    costoTotal = 0;
    totalEnproductos = 0;

    precioTotal.innerText = "$ " + costoTotal;
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnproductos;

    cuerpoTabla.innerHTML = "";

    localStorage.removeItem("datos");
    localStorage.removeItem("costoTotal");
    localStorage.removeItem("totalEnProductos");
    localStorage.removeItem("cont");
}); // Evento click del botón "Clear"

window.addEventListener("load", function () {
    if (localStorage.getItem("costoTotal") != null) {
        costoTotal = Number(localStorage.getItem("costoTotal"));
    }

    if (localStorage.getItem("totalEnProductos") != null) {
        totalEnproductos = Number(localStorage.getItem("totalEnProductos"));
    }

    if (localStorage.getItem("cont") != null) {
        cont = Number(localStorage.getItem("cont"));
    }

    if (localStorage.getItem("datos") != null) {
        datos = JSON.parse(localStorage.getItem("datos"));
        datos.forEach(function (item) {
            let row = `
                <tr>
                    <td>${item.cont}</td>
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.precio}</td>
                </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
            costoTotal += item.precio * item.cantidad;
            totalEnproductos += item.cantidad;
        });
    }

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnproductos;
}); // window load
