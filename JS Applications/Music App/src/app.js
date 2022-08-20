import {page, render} from "./lib.js";
import { logout } from "./api/users.js";
import { getUserData } from "./util.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { catalogView } from "./views/catalog.js";
import { homeView } from "./views/home.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { searchView } from "./views/search.js";

const main = document.querySelector("main");

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homeView)
page("/login", loginView);
page("/register", registerView);
page("/catalog", catalogView);
page("/create", createView);
page("/catalog/:id", detailsView);
page("/edit/:id", editView);
page("/search", searchView)


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
        document.getElementById("create").style.display = "inline-block";
        document.getElementById("logoutBtn").style.display = "inline-block";
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "none"
    } else {
        document.getElementById("create").style.display = "none";
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("login").style.display = "inline-block";
        document.getElementById("register").style.display = "inline-block"
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect("/");
}