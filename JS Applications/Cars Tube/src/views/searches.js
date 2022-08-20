import {searchCar} from "../api/cars.js";
import { html } from "../lib.js";

const searchesTemplate = (cars, onSearch, year) => html`
<section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year || ""}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">
            ${cars.length == 0 ? html`<p class="no-cars"> No results.</p>`
            : cars.map(searchCard)}
            </div>
        </section>`

const searchCard = (car) => html`
<div class="listing">
<div class="preview">
    <img src=${car.imageUrl}>
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${Number(car.year)}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href=/all/${car._id} class="button-carDetails">Details</a>
    </div>
</div>
</div>`


export async function searchesView(ctx) {
    const year = Number(ctx.querystring.split("=")[1]); 
    const cars = Number.isNaN(year) ? [] : await searchCar(year);
    ctx.render(searchesTemplate(cars, onSearch, year));

    function onSearch() {
        const query = Number(document.getElementById("search-input").value);
        ctx.page.redirect("/searches?query=" + query);
    }

}