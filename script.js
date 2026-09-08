"use strict";
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (!header || !toggle || !nav) {
    throw new Error("Portfolio script could not find a required page element.");
}
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
    .map((link) => {
    const href = link.getAttribute("href");
    return href ? document.querySelector(href) : null;
})
    .filter((section) => section !== null);
const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
};
toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
});
window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    const current = [...sections].reverse().find((section) => {
        return window.scrollY >= section.offsetTop - 140;
    });
    navLinks.forEach((link) => {
        const active = current !== undefined && link.getAttribute("href") === `#${current.id}`;
        link.classList.toggle("is-active", active);
    });
});
