import inquirer from 'inquirer';

class IEntity {
    public name: string
    public isbn?: string

    constructor(name: string, isbn?:string){
        this.name = name
        this.isbn = isbn
    }

    getName(){
        return this.getName
    }
}

class Book extends IEntity{
    public price: number

    constructor(name: string, price: number){
        super(name)

        this.price = price
    }
}

class User extends IEntity{
    public age: number

    constructor(name: string, age: number){
        super(name)

        this.age = age
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
        const user = this.getBook(userName)
        this.users = this.users.filter(book => book.name !== userName);
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
    libraryManager: LibraryManagement
    constructor(){
        this.libraryManager = new LibraryManagement();
    }

    async addBook(){
        const book = await inquirer.prompt<IEntity>([
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

        const newBook = this.libraryManager.addBook(book)
        console.log(`Book added with name:"${newBook.name}" and isbn:"${newBook.isbn}"`)
    }

    listBooks(){
        const books = this.libraryManager.getBooks()
        console.table(books)
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
                // Implement the logic for removing a book
                break;
            case 'Get Book':
                // Implement the logic for getting a book
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
