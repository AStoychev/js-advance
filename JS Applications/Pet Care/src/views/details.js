import { deletePet, getPetById } from "../api/pets.js";
import {html} from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, isOwner, onDelete) => html `
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    ${isOwner ? html`<div class="actionBtn">
                    <a href="/edit/${pet._id}" class="edit">Edit</a>
                    <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
                    </div>`
                    : ""}
                    
                </div>
            </div>
        </section>`;


export async function detailsView(ctx) {
    const pet = await getPetById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData?.id == pet._ownerId;
    ctx.render(detailsTemplate(pet, isOwner, onDelete));

    async function onDelete() {
        const choise = confirm("Are you sure you want to delete this pet?");

        if (choise) {
            await deletePet(ctx.params.id);
            ctx.page.redirect("/")
        }
    }

   
}