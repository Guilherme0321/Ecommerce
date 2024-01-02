interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  class ShoppingCart {
    private items: Map<number, number> = new Map();
  
    addItem(productId: number, quantity: number): void {
      if (this.items.has(productId)) {
        this.items.set(productId, this.items.get(productId)! + quantity);
      } else {
        this.items.set(productId, quantity);
      }
    }
  
    removeItem(productId: number, quantity: number): void {
      if (this.items.has(productId)) {
        const currentQuantity = this.items.get(productId)!;
        if (currentQuantity > quantity) {
          this.items.set(productId, currentQuantity - quantity);
        } else {
          this.items.delete(productId);
        }
      }
    }
  
    getItems(): Map<number, number> {
      return this.items;
    }
  }
  
  class Order {
    private products: Product[] = [];
    private quantities: number[] = [];
  
    constructor(private shoppingCart: ShoppingCart) {
      this.buildOrder();
    }
  
    private buildOrder(): void {
      const cartItems = this.shoppingCart.getItems();
      for (const [productId, quantity] of cartItems.entries()) {
        // Assume a ProductService to fetch product details
        const productDetails: Product = ProductService.getProductDetails(productId);
        this.products.push(productDetails);
        this.quantities.push(quantity);
      }
    }
  
    getTotal(): number {
      let total = 0;
      for (let i = 0; i < this.products.length; i++) {
        total += this.products[i].price * this.quantities[i];
      }
      return total;
    }
  
    placeOrder(): void {
      // Logic to place the order, update inventory, etc.
      console.log('Order placed successfully!');
    }
  }
  
  class ProductService {
    private static products: Product[] = [
      { id: 1, name: 'Product 1', price: 19.99 },
      { id: 2, name: 'Product 2', price: 29.99 },
      // Additional product data...
    ];
  
    static getProductDetails(productId: number): Product {
      return this.products.find(product => product.id === productId)!;
    }
  }
  
  // Example usage:
  const shoppingCart = new ShoppingCart();
  shoppingCart.addItem(1, 2);
  shoppingCart.addItem(2, 1);
  
  const order = new Order(shoppingCart);
  console.log('Order Total:', order.getTotal());
  
  order.placeOrder();
  