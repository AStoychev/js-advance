import { getAllCars } from "../api/cars.js";
import { html } from "../lib.js";

const allTemplate = (cars) => html`
<section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
            ${cars.length == 0
            ? html`<p class="no-cars">No cars in database.</p>`
            : cars.map(carCard)}
            </div>
        </section>`

const carCard = (car) => html`
<div class="listing">
                    <div class="preview">
                        <img src=${car.imageUrl}>
                    </div>
                    <h2>${car.brand} ${car.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${Number(car.year)}</h3>
                            <h3>Price: ${Number(car.price)} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/all/${car._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>`

export async function allView(ctx) {
    const cars = await getAllCars();

    ctx.render(allTemplate(cars))
}