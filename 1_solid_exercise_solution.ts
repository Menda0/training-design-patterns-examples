import inquirer from 'inquirer';

enum EntityType {
    book,
    user
}

class IEntity {
    public name: string
    // Violates Liskov Substitution Priciple
    // Objects of a superclass should be replaced with objects 
    // of its subclasses without affecting the correctnetss of the program
    // ISBN Belongs to books
    // May not be nullable
    public isbn?: string
    public type: EntityType

    constructor(name: string, type: EntityType, isbn?:string){
        this.name = name
        this.isbn = isbn
        this.type = type
    }

    public getDescription(){

        // Viloates the Open/Closed Principal
        // Method should be open for extension but closed for modification
        // Use inherance
        // Make this method abstract
        // Every entity should implement this method
        if(this.type === EntityType.book){
            return `Book with name:"${this.name}" and isbn:"${this.isbn}"`
        }else if(this.type === EntityType.user){
            return `User with name:"${this.name}"`
        }else{
            return "invalid entity type"
        }
    }
}

class Book extends IEntity{

    constructor(name: string, isbn?:string){
        super(name, EntityType.book, isbn)
    }
}

// Violates Liskov Substitution Priciple
// Objects of a superclass should be replaced with objects 
// of its subclasses without affecting the correctnetss of the program
// User should not have an isbn
class User extends IEntity{
    public age: number

    constructor(name: string, age: number){
        super(name, EntityType.user)

        this.age = age
    }
}

// Violates Single responsability principle
// Class should have only one reason to change, meaning it should have
// only one job of responsability
// Multiple responsabilities books and users
class UsersManagement {
    users: IEntity[]

    constructor(){
        this.users = []
    }

    addUser(user: IEntity) {
        this.users.push(user);
        return user
    }

    removeUser(userName: string) {
        const user = this.getUser(userName)
        this.users = this.users.filter(user => user.name !== userName);
        return user
    }

    getUser(userName: string){
        const user = this.users.find(user => user.name === userName);
        return user
    }

    getUsers(){
        return this.users
    }
}

class BooksManagement {
    books: IEntity[]

    constructor(){
        this.books = []
    }
    
    addBook(book: IEntity) {
        this.books.push(book);
        return book
    }

    removeBook(bookName: string) {
        const book = this.getBook(bookName)
        this.books = this.books.filter(book => book.name !== bookName);
        return book
    }

    getBooks(){
        return this.books
    }

    getBook(bookName: string){
        const book = this.books.find(book => book.name === bookName);
        return book
    }
}


class LibraryManagement {
    books: IEntity[] = [];
    users: IEntity[] = [];

    addBook(book: IEntity) {
        this.books.push(book);
        return book
    }

    removeBook(bookName: string) {
        const book = this.getBook(bookName)
        this.books = this.books.filter(book => book.name !== bookName);
        return book
    }

    getBooks(){
        return this.books
    }

    getBook(bookName: string){
        const book = this.books.find(book => book.name === bookName);
        return book
    }

    addUser(user: IEntity) {
        this.users.push(user);
        return user
    }

    removeUser(userName: string) {
        const user = this.getUser(userName)
        this.users = this.users.filter(user => user.name !== userName);
        return user
    }

    getUser(userName: string){
        const user = this.users.find(user => user.name === userName);
        return user
    }

    getUsers(){
        return this.users
    }
}

class CommandLineInterface {


    usersManager: UsersManagement

    booksManager: BooksManagement

    // Violates the dependency inversion principle (DIP)
    // Hight level modules should not depend on low level modules. Both should depend on abstraction
    // Should receive library manager from constructor parameter
    constructor(){
        this.booksManager = new BooksManagement();
        this.usersManager = new UsersManagement();
    }

    async addBook(){
        const bookData = await inquirer.prompt<IEntity>([
            {
                type: 'text',
                name: 'name',
                message: 'Book Name?',
            }, 
            {
                type: 'text',
                name: 'isbn',
                message: 'Book ISBN?',
            }
        ]);

        //const newBook = this.libraryManager.addBook(new Book(bookData.name, bookData.isbn))
        //console.log(`Added ${newBook.getDescription()}"`)
    }

    listBooks(){
        //const books = this.libraryManager.getBooks()
        //console.table(books)
    }

    async getBook(){
        const book = await inquirer.prompt([
            {
                type: 'text',
                name: 'name',
                message: 'Book Name?'
            }
        ])

        //const result = this.libraryManager.getBook(book.name)

        // if(result){
        //     console.log(result.getDescription())
        // }else{
        //     console.log("Book not found")
        // }
    }

    async main(){
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Book','List Books', 'Remove Book', 'Add User', 'List Users', 'Remove User', 'Get User', 'Get Book', 'Exit'],
            }
        ]);
    
        switch (answers.action) {
            case 'Add Book':
                await this.addBook()
                this.main()
                break;
            case 'List Books':
                this.listBooks() 
                this.main()
                break;
            case 'Remove Book':
                // Implemqent the logic for removing a book
                break;
            case 'Get Book':
                await this.getBook()
                this.main()
                break;
            case 'Add User':
                // Implement the logic for adding a user
                break;
            case 'Remove User':
                // Implement the logic for removing a user
                break;
            case 'List Users':
                // Implement the logic for list a users
                break
            case 'Get User':
                // Implement the logic for getting a user
                break;
            case 'Exit':
                return;
        }
    }
}

 
const cli = new CommandLineInterface()
cli.main()
