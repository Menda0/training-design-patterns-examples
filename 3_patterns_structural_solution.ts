import inquirer from "inquirer";

// ProductComponent interface
interface ProductComponent {
    display(): string;
    getPrice(): number;
    getCode(): string;
}

// Individual Product
class Product implements ProductComponent {
    constructor(private code: string, public name: string, private price: number) {}

    display(): string {
        return `Product: ${this.name} (Price: $${this.price})`;
    }

    getPrice(): number {
        return this.price;
    }

    getCode(): string {
        return this.code
    }
}

// Product Bundle
class ProductBundle implements ProductComponent {
    private children: ProductComponent[] = [];

    constructor(public code: string, public name: string) {}

    add(child: ProductComponent): void {
        this.children.push(child);
    }

    display(): string {
        return `Bundle: ${this.name}\n` + this.children.map(child => `  ${child.display()}`).join('\n');
    }

    getPrice(): number {
        return this.children.reduce((total, child) => total + child.getPrice(), 0);
    }

    getCode(): string {
        return this.code
    }
}

class ProductComponentManager<T extends ProductComponent> {
    products: T[]

    constructor(){
        this.products = []
    }

    getProduct(code: string){
        const product = this.products.find(p => p.getCode() === code);
        return product
    }

    addProduct(product: T){
        this.products.push(product)
    }

    deleteProduct(code: string){
        const product = this.getProduct(code)
        this.products = this.products.filter(p => p.getCode() !== code);
        return product
    }
}


// Create a SpecialOffer adpater to the ProductComponent
class DiscountedProduct {
    
    constructor(private offerName: string, private discountRate: number, private originalProduct: Product) {}

    getDetails(): string {
        return `Special Offer: ${this.offerName} (Discount: ${this.discountRate}%)`;
    }

    getDiscountedPrice(): number {
        return this.originalProduct.getPrice() * (1 - this.discountRate / 100);
    }
}

class DiscountedProductAdapter implements ProductComponent {

    constructor(private specialOffer: DiscountedProduct){}

    display(): string {
        throw new Error("Method not implemented.");
    }
    getPrice(): number {
        throw new Error("Method not implemented.");
    }
    getCode(): string {
        throw new Error("Method not implemented.");
    }
}

const productManager = new ProductComponentManager<Product>()
const productBundleManager = new ProductComponentManager<ProductBundle>()
const discontManager = new ProductComponentManager<DiscountedProductAdapter>()

class CommandLineInterface {

    async addProduct(){
        const answers = await inquirer.prompt([
            {
                type: "text",
                name: "name",
                message: "Product Name?"
            },
            {
                type: "text",
                name: "code",
                message: "Product Code?"
            },
            {
                type: "number",
                name: "price",
                message: "Product Price?"
            }
        ])

        const {name, code, price} = answers
        //const name = answers.name
        //const code = answers.code
        //const price = answers.price
        const newProduct = new Product(code, name, price)
        productManager.addProduct(newProduct)
    }

    async main(){
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Product','Add Product Bundle', 'Add Discount', 'Get All Products', 'Get All Bundles', 'Get All Discounts', 'Exit'],
            }
        ]);
    
        switch (answers.action) {
            case 'Add Product':

                await this.main()
                break;
            case 'Add Product Bundle':

                await this.main()
                break;
            case 'Add Discount':

                await this.main()
                break;
            case 'Get All Products':

                await this.main()
                break;
            case 'Get All Bundles':

                await this.main()
                break;
            case 'Get All Discounts':

                await this.main()
                break;
            case 'Exit':
                return;
        }
    }
}

const cli = new CommandLineInterface()
cli.main()