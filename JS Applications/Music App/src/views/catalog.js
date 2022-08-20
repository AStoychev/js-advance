import { getAllMusics } from "../api/musics.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const catalogTemplate = (albums, userData) => html`
<section id="catalogPage">
            <h1>All Albums</h1>
            ${userData ? albums.map(withUser)
            : albums.map(withOutUser)}
            ${albums.length == 0
            ? html`<p>No Albums in Catalog!</p>`
            : ""}
        </section>`
    

const withUser = (album) => html`
<div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    <div class="btn-group">
                        <a href="/catalog/${album._id}" id="details">Details</a>
                    </div>
                 </div>
            </div>`

const withOutUser = (album) => html`
<div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                 </div>
            </div>`


export async function catalogView(ctx) {
    const album = await getAllMusics();
    const userData = getUserData()
    console.log(userData)

    ctx.render(catalogTemplate(album, userData))
}