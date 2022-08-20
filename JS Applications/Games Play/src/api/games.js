import { del, get, post, put } from "./api.js";

export async function getAllGames() {
    return get("/data/games?sortBy=_createdOn%20desc");
}

export async function getAllNewGames() {
    return get("/data/games?sortBy=_createdOn%20desc&distinct=category")
}

export async function getGamesByUser(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getGameById(id) {
    return get("/data/games/" + id);
}

export async function createGame(game) {
    return post("/data/games", game);
}

export async function updateGame(id, game) {
    return put("/data/games/" + id, game);
}

export async function deleteGame(id) {
    return del("/data/games/" + id)
}