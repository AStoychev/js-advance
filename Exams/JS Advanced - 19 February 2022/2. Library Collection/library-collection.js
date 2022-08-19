class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = []
    }

    addBook(bookName, bookAuthor) {
        if(this.capacity <= this.books.length) {
            throw new Error("Not enough space in the collection.")
        }

        this.books.push({
            bookName,
            bookAuthor,
            payed: false
        })

        return `The ${bookName}, with an author ${bookAuthor}, collect.`
    }

    payBook(bookName) {
        const book = this.books.find(p => p.bookName == bookName);
        if(book == undefined) {
            throw new Error(`${bookName} is not in the collection.`)
        }

        if(book.payed == true) {
            throw new Error(`${bookName} has already been paid.`)
        }

        book.payed = true
        return `${bookName} has been successfully paid.`
    }

    removeBook(bookName) {
        const bookIndex = this.books.findIndex(p => p.bookName == bookName);
        if(bookIndex == -1) {
            throw new Error("The book, you're looking for, is not found.")
        }

        const book = this.books[bookIndex];
        if(book.payed == false) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`)
        }

        this.books.splice(bookIndex, 1)

        return `${bookName} remove from the collection.`
    }

    getStatistics(bookAuthor) {
        if(!bookAuthor) {
            let sortByBookName = this.books.sort((a, b) => a.bookName.localeCompare(b.bookName));
            let result = [];
            result.push(`The book collection has ${this.capacity - this.books.length} empty spots left.`);
            sortByBookName.map((b) => {
                let paid = b.payed ? "Has Paid" : "Not Paid";
                result.push(`${b.bookName} == ${b.bookAuthor} - ${paid}.`)
            })

            return result.join("\n").trim()
        } else {
            const author = this.books.find(p => p.bookAuthor == bookAuthor)
            if(author == undefined) {
                throw new Error(`${bookAuthor} is not in the collection.`)
            } else {
                let paid = author.payed ? "Has Paid" : "Not Paid";
                return `${author.bookName} == ${author.bookAuthor} - ${paid}.`
            }
        }
    }

}

const library = new LibraryCollection(2)
console.log(library.addBook('Don Quixote', 'Miguel de Cervantes'));
console.log(library.getStatistics('Miguel de Cervantes'));