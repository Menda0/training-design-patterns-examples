class LibraryManagement {
    books: string[] = [];
    users: string[] = [];

    addBook(book: string) {
        this.books.push(book);
    }

    removeBook(book: string) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
    }

    addUser(user: string) {
        this.users.push(user);
    }

    removeUser(user: string) {
        const index = this.users.indexOf(user);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }

    checkOutBook(user: string, book: string) {
        console.log(`${user} has checked out ${book}`);
    }
}


const library = new LibraryManagement();
library.addBook('1984');
library.addUser('John Doe');
library.checkOutBook('John Doe', '1984');
