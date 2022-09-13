"use strict";

const apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=deN938U4Ef66YPDtShWaEralFVTOaOlc&rating=pg&lang=es&q=';
const limitVal = 10;
const main = document.querySelector(".results");
const form = document.querySelector(".form");
const searchInput = document.getElementById("search");

function clearPreviousResults() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function createContainer(el_img) {
    const container = document.createElement("div");
    const overlay = document.createElement("div");
    overlay.className = "image-overlay";
    container.className = "image-container";
    container.appendChild(el_img);
    container.appendChild(overlay);
    return container;
}

function createImages(gifs) {
    for (const gif of gifs) {
        const img = document.createElement("img");
        const gifSrc = gif.images.fixed_height_small.url;

        img.src = gifSrc;
        img.alt = "Gif";
        img.classList.add("results-gif");
        const container = createContainer(img);
        
        main.append(container);
    }
}

async function getGifs(event) {
    event.preventDefault();
    clearPreviousResults();

    const searchInputValue = searchInput.value;
    const gifyUrl = `${apiUrl}${searchInputValue}&limit=${limitVal}`;
    const response = await fetch(gifyUrl, { mode: "cors" });
    const data = await response.json();
    const gifData = await data.data;

    createImages(gifData);
    searchInput.value = "";
}

form.addEventListener("submit", getGifs);