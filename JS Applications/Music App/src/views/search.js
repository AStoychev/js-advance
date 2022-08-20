import { searchMusic } from "../api/musics.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const searchTemplate = (album, onSearch, name, userData) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${name || ""}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
                ${userData ? album.map(withUser)
                : album.map(withOutUser)}

                ${album.length == 0 
                ? html`<p class="no-result">No result.</p>`
                : ""}
            </div>
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
                            <p class="date">Release Date:${album.releaseData}</p>
                        </div>
                        <div class="btn-group">
                            <a href="#" id="details">Details</a>
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
                            <p class="genre">Genre:  ${album.genre}</p>
                            <p class="price">Price: $${album.price}</p>
                            <p class="date">Release Date: ${album.releaseData}</p>
                        </div>
                    </div>
                </div>`


export async function searchView(ctx) {
    const name = ctx.querystring.split("=")[1];
    const album = await searchMusic(name);
    const userData = getUserData();

    ctx.render(searchTemplate(album, onSearch, name, userData));

    function onSearch() {
        const query = document.getElementById("search-input").value;
        if(query == "") {
            return alert("All fileds are required!")
        }
        ctx.page.redirect("/search?query=" + query)
    }


}