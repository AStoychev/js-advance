import { getCarById, updateCar } from "../api/cars.js";
import { html } from "../lib.js";

const editTemplate = (car, onSubmit) => html`
<section id="edit-listing">
            <div class="container">

                <form @submit=${onSubmit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value=${Number(car.year)}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value=${Number(car.price)}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>`


export async function editView(ctx) {
    const car = await getCarById(ctx.params.id);
    ctx.render(editTemplate(car, onSubmit))

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

        if (car.year <= 0 || car.price <=0) {
            return alert("Year and price must be positive number!")
        }

        if (car.brand == "" || car.model == "" || car.description == "" || car.year == "" || car.imageUrl == "" || car.price == "") {
            return alert("All fields are required!")
        }

        await updateCar(ctx.params.id, car)
        event.target.reset();
        ctx.page.redirect("/all/" + ctx.params.id)

    }
}