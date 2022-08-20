import {page, render} from "./lib.js";
import { logout } from "./api/users.js";
import { getUserData } from "./util.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { homeView } from "./views/home.js";
import { allView } from "./views/all.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { listingView } from "./views/listing.js";
import { searchesView } from "./views/searches.js";

const main = document.querySelector("main");

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homeView)
page("/login", loginView);
page("/register", registerView);
page("/all", allView);
page("/create", createView);
page("/all/:id", detailsView);
page("/edit/:id", editView);
page("/listing", listingView);
page("/searches", searchesView)


updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    next();
}

function renderMain(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById("profile").style.display = "block";
        document.getElementById("guest").style.display = "none";
        document.getElementById("user").textContent = `Welcome ${userData.username}`
    } else {
        document.getElementById("profile").style.display = "none";
        document.getElementById("guest").style.display = "block";
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect("/");
}