import {page, render} from "./lib.js";
import {logout} from "./api/users.js";
import {getUserData} from "./util.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { homeView } from "./views/home.js";
import { dashboardView } from "./views/dashboard.js";
import { createdView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";

const main = document.querySelector("main");

document.getElementById("logout").addEventListener("click", onLogout);

page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/dashboard", dashboardView);
page("/create", createdView);
page("/dashboard/:id", detailsView);
page("/edit/:id", editView)

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
        document.getElementById("create").style.display = "block";
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "none";

    } else {
        document.getElementById("create").style.display = "none";
        document.getElementById("logout").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("register").style.display = "block";
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect("/");
}