// Aquí se crea el listado, vacío al principio.
class ProductManager {
    constructor() {
        this.products = []; 
    }

    getProducts() {
        return this.products;
    }

//Esto es para confirmar que cada campo esté definido.
    addProduct(title, description, price, thumbnail, code, stock) {
        if ([title, description, price, thumbnail, code, stock].some(field => field === undefined)) {
            console.error('Asegúrate de que TODOS los campos estén definidos.');
            return;
        }

//Aquí verificamos si el código ya fue utilizado previamente.
        const repeatCode = this.products.some(product => product.code === code);
        if (repeatCode) {
            console.error('ATENCIÓN! El código ya ha sido utilizado previamente en otro producto.');
            return;
        }

        const id = this.products.length + 1;

        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

// Para agregar un producto.
        this.products.push(product);

        return {products: this.products }; // El "return" nos devuelve el listado de los productos.
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('El producto no ha sido encontrado.');
        }
        return product;
    }
}

const manager = new ProductManager();
console.log("Nos devuelve 'products' por primera vez, en teoría vacío.");
console.log(manager.getProducts());

//Nos devuelve el producto que acabamos de agregar.
const newProduct = manager.addProduct("Producto para demostración 1", "Se trata de un producto para demostrar la funcionabilidad.", 7800, "No dispone de imagen por el momento.", "ProdDEMO1", 115);
console.log("Producto agregado correctamente. ¡Qué bueno que funcione!");
console.log(newProduct); 

//Para visualizar los productos.
console.log("Se muestra aquí el producto recién agregado");
console.log(manager.getProducts());

//Test de errores
console.log("Nos alerta aquí de un ERROR al repetirse un producto.");
try {
manager.addProduct("Producto para demostración 1", "Se trata de un producto para demostrar la funcionabilidad.", 7800, "No dispone de imagen por el momento.", "ProdDEMO1", 115);
} catch (error) {
    console.error(error.message);
}

// getProductById
console.log("Testeando 'getProducById'");
try {
    console.log(manager.getProductById(1)); //Nos devuelve el producto correspondiente.
} catch (error) {
    console.error(error.message); //Error
}

// getProductById NO ENCONTRADO O INEXISTENTE
console.log("Testeando 'getproductById' NO ENCONTRADO O INEXISTENTE.");
try {
    console.log(manager.getProductById(2)); //El '2' es a modo de ejemplo. Se puede colocar cualquier otro valor (fuera de '1') para que nos devuelva error.
} catch (error) {
    console.error(error.message); //Error
}