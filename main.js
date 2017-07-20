var nombresPersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var bebidas = ["Limonada", "Naranjada", "Cerveza", "Agua fresca", "Café", "Malteada", "Refresco", "Licuado", "Eskimo", "Té"];
var comidas = ["Sopa", "Ensalada", "Pastel", "Lasaña", "Pasta", "Pizza", "Sopes", "Carnitas", "Pambazo"];
var tipo = ["entrada", "fuerte", "postre"];

/*Funciones globales para generación de valores aleatorios*/
function generarTipoAleatorio() {
    return tipo[Math.floor(Math.random() * tipo.length)];
}

function generarComidaAleatoria() {
    return comidas[Math.floor(Math.random() * comidas.length)];
}

function generarBebidaAleatoria() {
    return bebidas[Math.floor(Math.random() * bebidas.length)];
}

function generarNombreAleatorio() {
    return nombresPersonas[Math.floor(Math.random() * nombresPersonas.length)];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generaCargoAleatorio() {
    var cargo;
    if (getRandomInteger(1, 2) == 1) {
        cargo = "encargado";
    } else {
        cargo = "mozo";
    }
    return cargo;
}

function generaAlcoholAleatorio() {
    var tieneAlcohol;
    if (getRandomInteger(1, 2) == 1) {
        tieneAlcohol = true;
    } else {
        tieneAlcohol = false;
    }
    return tieneAlcohol;
}

function putMesas() {
    var mesas = [];
    for (var i = 0; i < 30; i++) {
        mesas.push(new Mesa(i));
    }
    return mesas;
}

function putCamareros() {
    var camareros = [];
    for (var i = 0; i < 5; i++) {
        camareros.push(new Camarero());
    }
    return camareros;
}

function addBebidas() {
    var bebidas = [];
    for (var i = 0; i < 5; i++) {
        bebidas.push(new Bebida());
    }
    return bebidas;
}

function addPlatillos() {
    var platillos = [];
    for (var i = 0; i < 5; i++) {
        platillos.push(new Comida());
    }
    return platillos;
}

function generaClientes() {
    var clientes = [];
    var num = getRandomInteger(1, 20);
    for (var i = 0; i < num; i++) {
        clientes.push(new Cliente());
    }
    return clientes;
}
/*fin de funciones globales*/



class Persona {
    constructor() {
        this._nombre = generarNombreAleatorio();
        this._edad = getRandomInteger(20, 60);
        this._nivelEnfadado = 0;
    }
}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = generaCargoAleatorio();
    }
}

class Cliente extends Persona {
    constructor() {
        super();
        this._dinero = getRandomInteger(0, 1500);
    }
    leerCartaYelegir(carta) {
        var ordenCliente = {
            bebida: this.elegir(carta._bebidas),
            comida: this.elegir(carta._platillos)
        }
        var orden = new Orden(ordenCliente);
        return orden;
    }
    elegir(producto) {
        return producto[getRandomInteger(0, 4)];
    }
}

class Producto {
    constructor() {
        this._existencias = getRandomInteger(2, 50);
        this._calorias = getRandomInteger(700, 1000);
        this._precio = getRandomInteger(50, 100);
    }
}

class Bebida extends Producto {
    constructor() {
        super();
        this._nombre = generarBebidaAleatoria();
        this._esAlcoholica = generaAlcoholAleatorio();
        this._alcohol = getRandomInteger(4, 14);
    }
    getPintadoHTML() {
        var bebida = '<tr><td>' + this._nombre + '</td><td>' + this._precio + '</td><td>' + this._existencias + '</td><tr>';
        return bebida;
    }
}

class Comida extends Producto {
    constructor(tipo, nombre) {
        super();
        this._tipo = generarTipoAleatorio();
        this._nombre = generarComidaAleatoria();
    }
    getPintadoHTML() {
        var comida = '<tr><td>' + this._nombre + '</td><td>' + this._precio + '</td><td>' + this._existencias + '</td><tr>';
        return comida;
    }
}

class Mesa {
    constructor(id) {
        this._capacidad = getRandomInteger(2, 15);
        this._id = id;
        this._ocupada = false;
        this._hayOrden = false;
        this._atendida = false;
        this._personas = [];
        this._ordenes = [];
        this._servicios = 0;
    }
    pintar() {
        var mesa = '<h2>' + this._id + '</h2>';
        mesa = mesa + '<label>Capacidad: ' + this._capacidad + ' </label>';
        mesa = mesa + '<label>Personas: ' + this._personas.length + ' </label>';
        mesa = mesa + '<label>Ocupada: ' + this._ocupada + ' </label>';
        mesa = mesa + '<label>Ordenes: ' + this._ordenes.length + ' </label>';

        var divP = document.getElementById("mesas");
        var divMesa = document.createElement('div');
        divMesa.innerHTML = mesa;
        divMesa.className = "mesa";
        if (this._ocupada) {
            divMesa.className = "mesa ocupada";
        }
        divP.appendChild(divMesa);
    }
}

class Carta {
    constructor() {
        this._bebidas = addBebidas();
        this._platillos = addPlatillos();
    }
    getPintadoTabla(producto) {
        var arreglo = [];
        if (producto == "bebidas") {
            arreglo = this._bebidas;
        } else {
            arreglo = this._platillos;
        }
        var cabecera = '<thead><th colspan="2" class="titulo">' + producto.toUpperCase() + '</th><tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr></thead>';
        var divP = document.getElementById("carta");
        var tableCarta = document.createElement('table');
        tableCarta.innerHTML = cabecera;
        tableCarta.className = "tabla_carta";
        var filas = "";
        var tbody = document.createElement('tbody');
        for (var i = 0; i < arreglo.length; i++) {
            filas = filas + arreglo[i].getPintadoHTML();
        }
        tbody.innerHTML = filas;
        tableCarta.appendChild(tbody);
        divP.insertBefore(tableCarta, null);
    }
    pintar() {
        this.getPintadoTabla('bebidas');
        this.getPintadoTabla('platillos');
    }
}

class Orden {
    constructor(orden) {
        this._orden = orden;
        this._atendida = false;
    }
}

class Recepcion {
    constructor() {
        this._gruposPersonas = [];
    }
    addClientes() {
        this._gruposPersonas.push(new GrupoPersonas());
        this.pintar();
    }
    pintar() {
        var div = document.getElementById("recepcion");
        var grupos = "";
        for (var i = 0; i < this._gruposPersonas.length; i++) {
            grupos = grupos + '<div class="grupo">' +
                '<label>Personas: </label>' + this._gruposPersonas[i]._clientes.length +
                this._gruposPersonas[i].pintar() + '</div>';
        }
        div.innerHTML = grupos;
    }
}

class GrupoPersonas {
    constructor() {
        this._clientes = generaClientes();
    }
    pintar() {
        var grupo = "<div class='personas'>";
        for (var i = 0; i < this._clientes.length; i++) {
            grupo = grupo + '<i class="em em-octocat"></i>';
        }
        return grupo + '</div>';
    }
}

class Restaurante {
    constructor(nombre) {
            this._nombre = nombre;
            this._mesas = putMesas();
            this._camareros = putCamareros();
            this._carta = new Carta();
            this._recepcion = new Recepcion();
            this.pintarEstructuraPrincipalConBotones();
        }
        //para iniciar el nuevo ejericio
    iniciarIntervalo() {
        window.setInterval(() => this.ejecutarCiclo(), 2000);
    }

    ejecutarCiclo() {
        console.log("Pintaré restaurante!!");
        this.pintar();
    }

    pintar() {
        this.quitar();
        //this.mirarMesas();
        this._carta.pintar();
        this._mesas.forEach((mesa) => mesa.pintar());
        this._recepcion.pintar();
    }

    quitar() {
        document.getElementById('carta').innerHTML = "";
        document.getElementById('mesas').innerHTML = "";
        //document.getElementById('recepcion').innerHTML = "";
    }

    recibirClientes() {
        var encontroMesa = false;
        var grupo = this._recepcion._gruposPersonas[0];
        for (var i = 0; i < this._mesas.length; i++) {
            if (this._mesas[i]._capacidad > grupo._clientes.length && !this._mesas[i]._ocupada) {
                this._mesas[i]._personas = grupo._clientes;
                this._mesas[i]._ocupada = true;
                this._recepcion._gruposPersonas.splice(0, 1);
                encontroMesa = true;
                alert("Mesa asignada!")
                break;
            }
        }

        if (!encontroMesa) {
            alert("No hay mesa tan grande!");
            this._recepcion._gruposPersonas.splice(0, 1);
        }

    }

    tomarNota() {
        console.log("carta");
        for (var i = 0; i < this._mesas.length; i++) {
            if (this._mesas[i]._ocupada && !this._mesas[i]._hayOrden) {
                this._mesas[i]._personas.forEach((persona) => {
                    this._mesas[i]._ordenes.push(persona.leerCartaYelegir(this._carta));
                    this._mesas[i]._hayOrden = true;
                });
                this._mesas[i]._servicios++;
            } 
        }
    }

    atenderOrdenes() {
        console.log("atenderOrdenes");
        for (var i = 0; i < this._mesas.length; i++) {
            if (this._mesas[i]._ocupada && this._mesas[i]._hayOrden) {
                this._mesas[i]._ordenes.forEach((orden) => {
                    if (orden._orden.bebida._existencias > 0 && orden._orden.comida._existencias > 0) {
                        orden._orden.bebida._existencias--;
                        orden._orden.comida._existencias--;
                        var index = this._mesas[i]._ordenes.indexOf(orden);
                        this._mesas[i]._ordenes.splice(index);
                        console.log("Mesa atendida");
                        console.log(this._mesas[i]);
                    } else {
                    	console.log("producto no disponible");
                    }
                });
                this._mesas[i]._hayOrden = false;
            }
        }

    }

    mirarMesas() {
        console.log("mirarMesas");
    }

    pintarEstructuraPrincipalConBotones() {
        console.log("pintarEstructuraPrincipalConBotones");
        var contenedor = document.getElementById("restaurante");
        var div_botones = document.createElement('div');
        div_botones.className = "botones";
        div_botones.innerHTML = this.pintarBotones();
        div_botones.id = "botones";

        var div_carta = document.createElement('div');
        div_carta.className = "carta";
        div_carta.id = "carta";

        var div_mesas = document.createElement('div');
        div_mesas.className = "mesas";
        div_mesas.id = "mesas";

        var div_recepcion = document.createElement('div');
        div_recepcion.className = "recepcion";
        div_recepcion.id = "recepcion";

        contenedor.appendChild(div_botones);
        contenedor.appendChild(div_carta);
        contenedor.appendChild(div_mesas);
        contenedor.appendChild(div_recepcion);
    }

    pintarBotones() {
            var botones = '<button class="boton_clientes" onclick="miRestaurante._recepcion.addClientes()">Traer clientes</button>' +
                '<button class="boton_clientes" onclick="miRestaurante.recibirClientes()">Recibir clientes</button>' +
                '<button class="boton_clientes" onclick="miRestaurante.tomarNota()">Tomar orden </button>' +
                '<button class="boton_clientes" onclick="miRestaurante.atenderOrdenes()">Atender ordenes</button>';
            return botones;
        }
        //fin de nuevas funciones
}

let miRestaurante = null;

window.onload = () => {
    miRestaurante = new Restaurante("Krusty Krab");
    //miRestaurante.iniciarIntervalo();
    /*provicional*/
    miRestaurante.ejecutarCiclo();
};

//no mas de estas referencias a miRestaurante, ni en html, js, etc. Agregar un eventListener a los botones y hacer uso
//de las arrow function o modificadores de contexto que se han trabajado hasta ahora

//clase de carta con un array de 5 bebidas y otro de 5 platillos
