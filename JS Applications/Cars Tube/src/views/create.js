import { createCar } from "../api/cars.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
<section id="create-listing">
            <div class="container">
                <form @submit=${onSubmit} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>`


export function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const car = {
            brand: formData.get("brand"),
            model: formData.get("model"),
            description: formData.get("description"),
            year: Number(formData.get("year")),
            imageUrl: formData.get("imageUrl"),
            price: Number(formData.get("price")),
        }

        if (car.year <= 0 || car.price <= 0) {
            return alert("Year and price must be postive number!")
        }

        if (car.brand == "" || car.model == "" || car.description == "" || car.year == "" || car.imageUrl == "" || car.price == "") {
            return alert("All fields are required!")
        }

        await createCar(car);
        event.target.reset();
        ctx.page.redirect("/all")

    }
}