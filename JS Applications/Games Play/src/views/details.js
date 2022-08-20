import { deleteGame } from "../api/games.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";
import { commentsView } from "./comments.js";
import * as gamesService from "../api/games.js"
import { commentFormView } from "./commentForm.js";

const detailsTemplate = (game, commentsSection, commentFormSection, isOwner, onDelete) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                ${commentsSection}

                ${isOwner ? html`<div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} class="button">Delete</a>
                </div>`
                : ""}
            </div>

            ${commentFormSection}

        </section>`

export async function detailsView(ctx) {
    const gameId = ctx.params.id;
    const [game, commentsSection] = await Promise.all([
        gamesService.getGameById(gameId),
        commentsView(gameId)
    ])

    const commentFormSection = commentFormView(ctx, gameId);

    const userData = getUserData();
    const isOwner = userData?.id == game._ownerId;
    ctx.render(detailsTemplate(game, commentsSection, commentFormSection, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure you want to delte this meme?");

        if (choice) {
            await deleteGame(ctx.params.id);
            ctx.page.redirect("/")
        }
    }
}