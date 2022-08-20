import { del, get, post, put } from "./api.js";

export async function getAllPets() {
    return get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
}

export async function getPetsByUser(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getPetById(id) {
    return get("/data/pets/" + id);
}

export async function createPet(pet) {
    return post("/data/pets", pet);
}

export async function updatePet(id, pet) {
    return put("/data/pets/" + id, pet);
}

export async function deletePet(id) {
    return del("/data/pets/" + id)
}