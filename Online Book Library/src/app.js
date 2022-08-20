import {page, render} from "./lib.js";
import { logout } from "./api/users.js";
import { getUserData } from "./util.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { bookView } from "./views/ownbook.js";



const main = document.getElementById("site-content");

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", dashboardView); 
page("/login", loginView);
page("/register", registerView);
page("/create", createView);
page("/dashboard/:id", detailsView);
page("/edit/:id", editView);
page("/ownbook", bookView)

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
        document.getElementById("user").style.display = "block";
        document.getElementById("guest").style.display = "none";
        document.querySelector("#user span").textContent = `Welcome, ${userData.email}`
    } else {
        document.getElementById("user").style.display = "none";
        document.getElementById("guest").style.display = "block";
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect("/");
}