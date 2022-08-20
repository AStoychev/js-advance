import { del, get, post, put } from "./api.js";

export async function getAllMusics() {
    return get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
}

export async function getMusicsByUser(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getMusicById(id) {
    return get("/data/albums/" + id);
}

export async function createMusic(music) {
    return post("/data/albums", music);
}

export async function updateMusic(id, music) {
    return put("/data/albums/" + id, music);
}

export async function deleteMusic(id) {
    return del("/data/albums/" + id)
}

export async function searchMusic(name) {
    return get(`/data/albums?where=name%20LIKE%20%22${name}%22`)
}