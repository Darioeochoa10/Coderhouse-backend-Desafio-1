class ProductManager {
  constructor() {
    this.products = [];
  }

  generateUniqueId() {
    return Date.now().toString();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const existingProduct = this.products.find((p) => p.code === product.code);

    if (existingProduct) {
      throw new Error("El código de producto ya está en uso");
    }

    const newProduct = {
      ...product,
      id: this.generateUniqueId(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  }
}

const productManager = new ProductManager();

// Agregar una fruta
try {
  const apple = {
    title: "Manzana",
    description: "Una deliciosa fruta",
    price: 1.5,
    thumbnail: "manzana.jpg",
    code: "FR001",
    stock: 50,
  };

  const addedApple = productManager.addProduct(apple);
  console.log("Fruta agregada:", addedApple);
} catch (error) {
  console.error("Error al agregar la fruta:", error.message);
}

// Agregar una verdura
try {
  const carrot = {
    title: "Zanahoria",
    description: "Una nutritiva verdura",
    price: 0.75,
    thumbnail: "zanahoria.jpg",
    code: "VEG001",
    stock: 30,
  };

  const addedCarrot = productManager.addProduct(carrot);
  console.log("Verdura agregada:", addedCarrot);
} catch (error) {
  console.error("Error al agregar la verdura:", error.message);
}

// Obtener productos después de agregar frutas y verduras
console.log(productManager.getProducts());

// Intentar agregar una fruta con el mismo código (debería arrojar un error)
try {
  productManager.addProduct({
    title: "Otra Manzana",
    description: "Otra deliciosa fruta",
    price: 1.8,
    thumbnail: "otra-manzana.jpg",
    code: "FR001", // Código repetido
    stock: 40,
  });
} catch (error) {
  console.error("Error al agregar la fruta:", error.message);
}

// Obtener un producto por ID (debería devolver la primera fruta agregada)
try {
  const productId = productManager.getProducts()[0].id;
  const productById = productManager.getProductById(productId);
  console.log("Producto encontrado por ID:", productById);
} catch (error) {
  console.error("Error al obtener el producto por ID:", error.message);
}
