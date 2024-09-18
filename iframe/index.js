/******************** DINAMICO LOCAL STORAGE ********************/

let nameSongs = [];
let arraySongs = [];

if (localStorage.getItem("lastNameCardClicked")) {
  let lastNameCard = localStorage.getItem("lastNameCardClicked");
  let listNameCards = JSON.parse(localStorage.getItem("listname-cards"));
  let currentArray = listNameCards[lastNameCard];
  if (currentArray.length > 0) {
    nameSongs = currentArray.map((el) => el[0]);
    arraySongs = currentArray.map((el) => el[1]);
  }
}

/******************** GLOBAL  ********************/
const d = document;
const $ = (el) => d.querySelector(el);
const $$ = (el) => d.querySelectorAll(el);

const nameBand = localStorage.getItem("lastNameCardClicked") ?? "Without name";
const $audio = d.createElement("audio");

const navRandomButton = ".nav-random-button";
const navMomentaryListButton = ".nav-list-momentary";
const navPlayButton = ".nav-play-button";
const navArrowDownButton = ".nav-arrow-down";

const cardPlayButtonClass = ".card-playbutton";
const cardPauseButtonClass = ".card-pausebutton";
const cardStopButtonClass = ".card-stopbutton";
const cardLoopButtonClass = ".card-infinitybutton";
const cardPlayListButton = ".card-playlistbutton";

const headerColors = {
  0: ["#ee82ee", "#87ceeb", "#00ff7f"],

  1: ["#ffd700", "#20b2aa", "#87cefa"],

  2: ["#e6e6fa", "#ff00ff", "#32cd32"],

  3: ["#c8cdf9", "#f5ccd9", "#7fffd4"],

  4: ["#05c9fa", "#adff2f", "#dda0dd"],

  5: ["#f0e68c", "#800080", "#00bfff"],

  6: ["#50c878", "#ff1493", "#e0ffff"],

  7: ["#e4f61e", "#87ceeb", "#00ff7f"],

  8: ["#f6d4f7", "#4169e1", "#98ff98"],

  9: ["#ff00ff", "#fff44f", "#50c878"],
};

/******************** FUNCTIONS ********************/

const blockPlayPauseStopBUTTON = () => {
  [...$$(".card-pausebutton")].forEach((el) => el.classList.add("blocked"));
  [...$$(".card-stopbutton")].forEach((el) => el.classList.add("blocked"));
  [...$$(".card-infinitybutton")].forEach((el) => el.classList.add("blocked"));
};

const generateStars = (totalStars, selector, size, duration) => {
  const shadowLayers = [];

  for (let i = 0; i < totalStars; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    shadowLayers.push(`
      ${x}vw ${y}vh 0 #fff,
      ${x}vw ${y + 100}vh 0 #fff
    `);
  }

  const star = document.querySelector(selector);
  star.style.setProperty("--shadow-layer", shadowLayers.join(","));
  star.style.setProperty("--size", size);
  star.style.setProperty("--duration", duration);
};

const removeClassBlockedButtonNextSiblings = (el) => {
  [...el.closest(".card-right-buttons").querySelectorAll("button")].forEach(
    (btn) => btn.classList.remove("blocked")
  );
};

const actualButtonPlayActive = (element) => {
  [...$$(".card-btn-active")].forEach((el) => {
    el.classList.remove("card-btn-active");
  });
  element.classList.add("card-btn-active");

  [...$$(".input-range")].forEach((el) => {
    el.style.display = "none";
  });
  const $inputRange = element.closest(".card").querySelector(".img input");
  $inputRange.style.display = "block";

  setTimeout(() => $audio.play(), 30);

  $audio.ontimeupdate = function () {
    $inputRange.max = Math.floor(this.duration);
    $inputRange.value = this.currentTime;
  };

  d.addEventListener("input", (e) => {
    if (e.target === $inputRange) {
      $audio.currentTime = e.target.value;
      $audio.play();
    }
  });
};

const toKebabCase = (sentence = "") => {
  let words = sentence.split(" ");
  return words.length === 1
    ? words.join("").toLowerCase()
    : words.join("-").toLowerCase();
};

const putTitle = (nameBand, title) => (d.title = `${nameBand} - ${title}`);

const showTitle = (elIndex) => {
  let titles = $$(".card-right-top");
  putTitle(nameBand, nameSongs[elIndex]);
};

const playAllSongs = (songs, selector) => {
  let index = 0;
  const $btnsPlay = $$(selector);

  const nextSong = () => {
    blockPlayPauseStopBUTTON();

    if (index < songs.length) {
      if ($audio.src) {
        $audio.pause();
        $audio.currentTime = 0;
      }
      $audio.src = songs[index];
      removeClassBlockedButtonNextSiblings($btnsPlay[index]);
      showTitle(index);
      actualButtonPlayActive($btnsPlay[index]);
      index++;
      $audio.onended = nextSong;
    } else {
      location.reload();
    }
  };

  nextSong();
};

const playRandomSongs = (songs, selector) => {
  let unArray = [],
    i,
    valor;

  for (i = 0; i < songs.length; i++) {
    do {
      valor = Math.floor(Math.random() * songs.length);
    } while (unArray.includes(valor));

    unArray.push(valor);
  }

  let index = 0;
  const $btnsPlay = $$(selector);

  const nextSong = () => {
    blockPlayPauseStopBUTTON();

    if (index < songs.length) {
      if ($audio.src) {
        $audio.pause();
        $audio.currentTime = 0;
      }
      $audio.src = songs[unArray[index]];
      removeClassBlockedButtonNextSiblings($btnsPlay[unArray[index]]);
      showTitle(unArray[index]);
      actualButtonPlayActive($btnsPlay[unArray[index]]);
      index++;
      $audio.onended = nextSong;
    } else {
      location.reload();
    }
  };

  nextSong();
};

const removeClassNavButtonActive = () => {
  [...$$(".nav-btn-active")].forEach((el) =>
    el.classList.remove("nav-btn-active")
  );
};

const playSelectedSongs = (songs, selector, listNumber) => {
  let index = 0;
  const $btnsPlay = $$(selector);

  const nextSong = () => {
    blockPlayPauseStopBUTTON();

    if (index < songs.length) {
      if ($audio.src) {
        $audio.pause();
        $audio.currentTime = 0;
      }
      $audio.src = songs[index];
      removeClassBlockedButtonNextSiblings($btnsPlay[listNumber[index]]);
      showTitle(listNumber[index]);
      actualButtonPlayActive($btnsPlay[listNumber[index]]);
      index++;
      $audio.onended = nextSong;
    } else {
      location.reload();
    }
  };

  nextSong();
};

/******************** EXECUTING FUNCTIONS ********************/
generateStars(200, ".star-1", "2px", "20s");

(function headerCustomProperties() {
  const { body } = document;
  let numberRandom = Math.floor(Math.random() * 10);
  const [color1, color2, color3] = headerColors[numberRandom];
  body.style.setProperty("--color1", color1);
  body.style.setProperty("--color2", color2);
  body.style.setProperty("--color3", color3);
})();

(function addTitlesToCards() {
  [...$$(".card-right-top")].forEach((title, index) => {
    if (!nameSongs[index]) {
      $$(".card")[index].style.pointerEvents = "none";
      $$(".card")[index].style.opacity = "0.5";
      let buttons = $$(".card")[index].querySelector(
        ".card-right .card-right-buttons"
      );
      [...buttons.querySelectorAll("button")].forEach(
        (el) => (el.style.pointerEvents = "none")
      );
      [...buttons.querySelectorAll("a")].forEach((el) =>
        el.classList.remove("pointerEventsActivo")
      );
      [...buttons.querySelectorAll(".buttonConPointerEvents")].forEach((el) =>
        el.classList.remove("buttonConPointerEvents")
      );
    }
    title.textContent = nameSongs[index];
    title.closest(".card").dataset.url = arraySongs[index];
  });

})();

(function upgradeMeta() {
  $(`meta[property="og:url"]`).content = location.href;
  $(`meta[property="twitter:url"]`).content = location.href;
  let metaImage =
    location.href.at(-1) === "/"
      ? `${location.href}assets/preview.avif`
      : `${location.href}/assets/preview.avif`;
  $(`meta[property="og:image"]`).content = metaImage;
  $(`meta[property="twitter:image"]`).content = metaImage;
})();

(function addHrefAndDownloads() {
  [...$$(".anchor-download")].forEach((el, i) => {
    el.href = `songs/n${i + 1}.mp3`;
    el.download = toKebabCase(nameSongs[i]);
  });
})();

(function getHref() {
  localStorage.setItem("formUrl", location.href);
})();

/******************** EVENT DELEGATION ********************/
d.addEventListener("click", (e) => {
  /******************** EVENT DELEGATION CARDS ********************/
  if (e.target.matches(cardPlayButtonClass)) {
    blockPlayPauseStopBUTTON();
    removeClassBlockedButtonNextSiblings(e.target);
    const index = [...$$(cardPlayButtonClass)].indexOf(e.target);

    let audioActual = d.createElement("audio");
    audioActual.src = arraySongs[index];

    if (!$audio.src) {
      $audio.src = arraySongs[index];
    }

    if ($audio.src !== audioActual.src) {
      $audio.pause();
      $audio.currentTime = 0;
      $audio.src = arraySongs[index];
      $audio.loop = false;
    }

    actualButtonPlayActive(e.target);

    showTitle(index);

    if ($audio.loop) {
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle(
        "card-btn-active"
      );
      return;
    }

    return;
  }

  if (e.target.matches(cardPauseButtonClass)) {
    $audio.pause();
    e.target.previousElementSibling.classList.remove("card-btn-active");
    e.target.classList.add("card-btn-active");
    return;
  }

  if (e.target.matches(cardStopButtonClass)) {
    $audio.pause();
    $audio.currentTime = 0;
    blockPlayPauseStopBUTTON();
    e.target.previousElementSibling.previousElementSibling.classList.remove(
      "card-btn-active"
    );
    return;
  }

  if (e.target.matches(cardLoopButtonClass)) {
    if ($audio.loop) {
      $audio.loop = false;
      e.target.classList.remove("card-btn-active");
      return;
    }
    $audio.loop = true;
    e.target.classList.add("card-btn-active");
  }

  if (e.target.matches(cardPlayListButton)) {
    let index = [...$$(".card")].indexOf(e.target.closest(".card"));
    let lastLetterUrl = localStorage.getItem("playbackUrl").at(-1);
    let urlPuro =
      lastLetterUrl === "/"
        ? localStorage.getItem("playbackUrl")
        : `${localStorage.getItem("playbackUrl")}/`;

    let currentNameSong = [...$$(".card")][index].querySelector(
      ".card-right-top"
    ).innerHTML;
    localStorage.setItem("lastCurrentNameSong", currentNameSong);
    localStorage.setItem("ultimoCardIndex", index);
    RenderPlaylistItems();
    $(".am-modal").showModal();
  }

  if (e.target.matches(".cerrar")) {
    let $containerModal = $(".container-modal");
    e.target.parentElement.close();
  }

  /******************** EVENT DELEGATION NAV ********************/
  if (e.target.matches(navPlayButton)) {
    removeClassNavButtonActive();
    e.target.classList.add("nav-btn-active");
    playAllSongs(arraySongs, cardPlayButtonClass);
    return;
  }
  if (e.target.matches(navRandomButton)) {
    removeClassNavButtonActive();
    e.target.classList.add("nav-btn-active");
    playRandomSongs(arraySongs, cardPlayButtonClass);
    return;
  }
  if (e.target.matches(navMomentaryListButton)) {
    removeClassNavButtonActive();
    e.target.classList.add("nav-btn-active");
    $(navPlayButton).style.pointerEvents = "none";
    $(navRandomButton).style.pointerEvents = "none";
    $(navArrowDownButton).style.pointerEvents = "none";
    let allCards = [...$$(".card")];
    let listNumbersSongs = [];
    $(".tooltip").classList.add("tooltip-active");
    pickCards(allCards, listNumbersSongs);
    return;
  }
  if (e.target.matches(navArrowDownButton)) {
    if ($audio.src) {
      let arrayButtons = [...$$(".card-playbutton")];
      let $btnPlayActive = $(".card-playbutton.card-btn-active");
      let indexActual = arrayButtons.indexOf($btnPlayActive);
      e.target.href = `#card${indexActual}`;
      $btnPlayActive.closest(".card").classList.add("targeado");
      setTimeout(() => {
        $btnPlayActive.closest(".card").classList.remove("targeado");
      }, 3000);
    }
    return;
  }
});

d.addEventListener("change", (e) => {
  if (e.target.matches(`input[type=checkbox]`)) {
    let currentNameSong = localStorage.getItem("lastCurrentNameSong");
    let cardCorriente = [...$$('.card')][localStorage.getItem('ultimoCardIndex')];
    let url = cardCorriente.dataset.url;
    let currentId = e.target.id;
    let objectListNameCards = JSON.parse(
      localStorage.getItem("listname-cards")
    );
    if (!objectListNameCards) return;
    let clase = e.target.getAttribute("data-clase");
    let $output = $(`.${clase}`);

    if (e.target.checked) {
      let newObject = {
        ...objectListNameCards,
        [`${currentId}`]: [
          ...objectListNameCards[currentId],
          [currentNameSong, url],
        ],
      };

      localStorage.setItem("listname-cards", JSON.stringify(newObject));

      $output.innerHTML = Number($output.innerHTML) + 1;
      RenderPlaylistItems();
      return;
    }

    let indiceReal = null;
    for (let i = 0; i < objectListNameCards[currentId].length; i++) {
      if (objectListNameCards[currentId][i][0] === currentNameSong) {
        indiceReal = i;
        break;
      }
    }

    let newArrray = objectListNameCards[`${currentId}`].toSpliced(
      indiceReal,
      1
    );

    let newObject = {
      ...objectListNameCards,
      [`${currentId}`]: [...newArrray],
    };

    localStorage.setItem("listname-cards", JSON.stringify(newObject));
    $output.innerHTML = Number($output.innerHTML) - 1;
    RenderPlaylistItems();
    return;
  }
});

/******************** MODAL FUNCTIONS ********************/

function existThisSongInSomePlaylist(currentName) {
  let nameCurrent = currentName ?? "";
  if (localStorage.getItem("listname-cards")) {
    let objetoNamePlaylists = JSON.parse(
      localStorage.getItem("listname-cards")
    );
    let playlistsWhereExistsCurrenName = [];
    let namesPlaylists = [];

    for (let property in objetoNamePlaylists) {
      namesPlaylists = [...namesPlaylists, property];
    }

    for (let i = 0; i < namesPlaylists.length; i++) {
      let currentPlaylist = namesPlaylists[i];
      let multiArrayCurrent = objetoNamePlaylists[currentPlaylist];

      for (let j = 0; j < multiArrayCurrent.length; j++) {
        if (multiArrayCurrent[j].includes(nameCurrent.toString())) {
          playlistsWhereExistsCurrenName.push(currentPlaylist);
          break;
        }
      }
    }

    return playlistsWhereExistsCurrenName;
  }
}

function RenderPlaylistItems() {
  if (localStorage.getItem("listname-cards")) {
    let currentName = localStorage.getItem("lastCurrentNameSong");
    let objectNames = JSON.parse(localStorage.getItem("listname-cards"));
    let $template = $(".template-modal-fila").content;
    let $tituloModal = $(".tituto-modal");
    $tituloModal.innerHTML = `Save ${currentName} in..`;
    let myFragment = d.createDocumentFragment();
    let $containerModal = $(".container-modal");
    $containerModal.innerHTML = "";
    let arrayCorriente = existThisSongInSomePlaylist(currentName);
    let guardarKey = null;

    for (let key in objectNames) {
      let clon = $template.cloneNode(true);
      clon.querySelector("input").id = key;
      clon.querySelector("input").dataset.clase = toKebabCase(key);
      clon.querySelector("label").setAttribute("for", key);
      clon.querySelector("label").innerHTML = key;
      clon.querySelector("output").setAttribute("class", toKebabCase(key));
      clon.querySelector("output").innerHTML = objectNames[key].length;
      if (objectNames[key].length === 20) {
        clon.querySelector("input[type=checkbox]").disabled = "true";
        guardarKey = key;
      }
      myFragment.appendChild(clon);
    }

    $containerModal.appendChild(myFragment);


    if (currentName === objectNames?.[guardarKey]?.[19][0]) {
      setTimeout(() => {
        let dataclase = toKebabCase(guardarKey);
        $containerModal.querySelector(
          `input[data-clase=${dataclase}`
        ).disabled = false;
      }, 100);
    }

    for (let i = 0; i < arrayCorriente.length; i++) {
      let checkboxCurrent = toKebabCase(arrayCorriente[i]);
      let checkboxActual = $containerModal.querySelector(
        `[data-clase='${checkboxCurrent}']`
      );
      checkboxActual.checked = true;
      checkboxActual.disabled = false;
    }
  }
}

d.addEventListener("DOMContentLoaded", () => {
  blockPlayPauseStopBUTTON();
  putTitle(nameBand, "20 SONGS");
});

function pickCards(allCards, listNumbersSongs) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".card *")) {
      let actualCard = e.target.closest(".card");
      let index = allCards.indexOf(actualCard);
      actualCard.style.color = "#f00";
      listNumbersSongs.push(index);
    }

    if (e.target.matches(".tooltip")) {
      e.target.classList.remove("tooltip-active");
      let canciones = listNumbersSongs.map((el) => arraySongs[el]);
      playSelectedSongs(canciones, cardPlayButtonClass, listNumbersSongs);
    }
  });
}
