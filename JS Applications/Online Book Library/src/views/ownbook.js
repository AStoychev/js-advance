import { getBooksByUser } from "../api/books.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const bookTemplate = (books) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${books.length == 0 ? html`<p class="no-books">No books in database!</p>`
            : html`<ul class="my-books-list">${books.map(bookCard)}</ul>`}
        </section>`

const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/dashboard/${book._id}">Details</a>
</li>`


export async function bookView(ctx) {
    const userData = getUserData();
    const books = await getBooksByUser(userData.id);
    ctx.render(bookTemplate(books))
}