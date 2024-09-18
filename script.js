let d = document,
  $borrar = d.querySelector(".borrar"),
  $ = (el) => document.querySelector(el),
  $$ = (el) => document.querySelectorAll(el);
let $inputPlaylist = document.querySelector(
  ".playlist-container-form .playlist-input"
);
let $inputPlaylist2 = document.querySelector(
  ".playlist-container-form-2 .playlist-input"
);
let regExP = /^(?![\s0-9\-_])[\w\s\-]{1,20}(?<![\s\-])$/;

console.group("Reference");
console.log("Pyramid ->", "https://uiverse.io/alexmaracinaru/heavy-baboon-91");
console.log("Switch ->", "https://uiverse.io/csemszepp/soft-pug-40");
console.log("Rain ->", "https://youtu.be/YhXxBhInJMI?si=Ib56mu0h76sQz9WJ");
console.groupEnd();

function autocomplete(inpt, elArray) {
  let currentFocus;

  inpt.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;

    if (val.length >= 1) {
      d.querySelector(".busqueda").classList.add("invisible");
      $borrar.classList.remove("invisible");
    }

    if (val.length === 0) {
      d.querySelector(".busqueda").classList.toggle("invisible");
      $borrar.classList.toggle("invisible");
    }

    closeAllLists();
    if (!val) return false;
    currentFocus = -1;

    a = document.createElement("div");
    a.setAttribute("class", "autocomplete-items");
    a.setAttribute("id", "autocomplete-list");

    let miContador = 0;
    this.parentNode.appendChild(a);

    for (i = 0; i < elArray.length && miContador < 6; i++) {
      if (
        elArray[i][0].substr(0, val.length).toUpperCase() === val.toUpperCase()
      ) {
        b = document.createElement("a");
        b.setAttribute("href", elArray[i][1]);
        b.innerHTML = `<strong>${elArray[i][0].substr(0, val.length)}</strong>`;
        b.innerHTML += elArray[i][0].substr(val.length);
        b.innerHTML += `<input type='hidden' value="${elArray[i][0]}"></input>`;

        b.addEventListener("click", function (e) {
          inpt.value = this.querySelector("input").value;
          closeAllLists();
        });

        a.appendChild(b);
        miContador++;
      }
    }
  }); /* fin */

  inpt.addEventListener("keydown", function (e) {
    let x = document.getElementById("autocomplete-list");
    if (x) x = x.querySelectorAll("a");
    if (e.key === "ArrowDown") {
      currentFocus++;
      addActive(x);
    } else if (e.key === "ArrowUp") {
      currentFocus--;
      addActive(x);
    } else if (e.key === "Enter") {
      e.preventDefault();

      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  }); /* fin */

  function addActive(x) {
    if (!x) return false;

    removeActive(x);

    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  } /* fin */

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  } /* fin */

  function closeAllLists(elm) {
    let $autocompletes = document.querySelectorAll(".autocomplete-items");

    for (let i = 0; i < $autocompletes.length; i++) {
      if (elm !== $autocompletes[i] && elm !== inpt) {
        $autocompletes[i].parentNode.removeChild($autocompletes[i]);
      }
    }
  } /* fin */

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);

    if (e.target.matches(".borrar")) {
      let $input = d.querySelector("input");
      $input.value = "";
      $input.focus();
    }
  }); /* fin */
} /* fin autocomplete function */

let bands = [
  /* ======================= A ======================= */
  ["Artic Monkeys", "https://20essentials.github.io/artic-monkeys/"],
  ["Ahrix", "https://20essentials.github.io/artic-monkeys/"],
];

autocomplete(document.getElementById("myInput"), bands);
d.querySelector(".nBands").innerHTML = bands.length;
d.querySelector(".nSongs").innerHTML = bands.length * 20;
d.getElementById("myInput").focus();

/* ======================= LLUVIA ======================= */
let amount = 100;

function rain() {
  let pantalla = document.querySelector(".html-scheme"),
    i = 0;

  while (i < amount && amount <= 109) {
    let drop = document.createElement("i");
    drop.classList.add("gota");

    let size = Math.random() * 5;
    let posX = Math.floor(Math.random() * 100);
    let delay = Math.random() * -20;
    let duration = Math.random() * 5;

    drop.style.width = 0.2 + size + "px";
    drop.style.left = posX + "vw";
    drop.style.animationDelay = delay + "s";
    drop.style.animationDuration = 1 + duration + "s";

    pantalla.appendChild(drop);
    i++;
  }
}

rain();

/* ======================= SWITCH CHECK  ======================= */
d.addEventListener("input", (e) => {
  let $checkBoxSwitch = d.getElementById("switch1");

  if (e.target === $checkBoxSwitch) {
    if (e.target.checked) {
      amount += 1;
      rain();
    } else {
      amount += 1;
      rain();
    }
  }
});

/* ======================= MEDIA  ======================= */

let w = window;

let currentOrientation = screen.orientation.type;

function handleOrientationChange() {
  const newOrientation = screen.orientation.type;

  if (
    newOrientation.startsWith("portrait") &&
    !currentOrientation.startsWith("portrait")
  ) {
    currentOrientation = newOrientation;
    location.reload();
  } else if (
    newOrientation.startsWith("landscape") &&
    !currentOrientation.startsWith("landscape")
  ) {
    currentOrientation = newOrientation;
    location.reload(); // Esto se ejecutará solo una vez al cambiar a landscape
  }
}

screen.orientation.addEventListener("change", handleOrientationChange);

handleOrientationChange();

/* ======================= OTHER  ======================= */

function comprobeExistThisProperty(nameProperty) {
  if (localStorage.getItem("listname-cards")) {
    let object = JSON.parse(localStorage.getItem("listname-cards"));
    return object.hasOwnProperty(nameProperty) ? true : false;
  }
}

d.addEventListener("keydown", (e) => {
  if (e.target === $inputPlaylist || e.target === $inputPlaylist2) {
    if (e.key !== "Enter") return;
    let padreForm = e.target.closest(".myForm");
    let input = padreForm.querySelector("input[type=text]");
    let playListSection = $(".playlist-section-articles");
    let arrayCancionesPlaylist = "";

    if (padreForm.classList.contains("playlist-container-form")) {
      if (comprobeExistThisProperty(input.value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }

      if (!regExP.test(input.value) || comprobeExistThisProperty(input.value)) {
        return;
      }

      let cardName = input.value.trim();

      if (!localStorage.getItem("listname-cards")) {
        localStorage.setItem(
          "listname-cards",
          JSON.stringify({
            [`${cardName}`]: arrayCancionesPlaylist,
          })
        );
        return;
      }

      let stringCardNames = localStorage.getItem("listname-cards");
      let objectCardsName = JSON.parse(stringCardNames);
      let objectCardNamesString = JSON.stringify({
        ...objectCardsName,
        [`${cardName}`]: arrayCancionesPlaylist,
      });
      localStorage.setItem("listname-cards", objectCardNamesString);
      renderPlaylistCards();
      return;
    }

    if (comprobeExistThisProperty(input.value)) {
      input.classList.remove("valid");
      input.classList.add("invalid");
    }

    if (!regExP.test(input.value) || comprobeExistThisProperty(input.value)) {
      return;
    }

    let index = localStorage.getItem("last-index");
    let currentCard = document.querySelectorAll(".card-single")[index];

    if (currentCard) {
      let lastIndex = localStorage.getItem("last-index");
      let cardName = input.value.trim();
      let objectCardNames = JSON.parse(localStorage.getItem("listname-cards"));
      let currentCard = [...$$(".card-single")][lastIndex].querySelector(
        ".card-single-right h3"
      );
      let valorProperty = currentCard.innerHTML;
      objectCardNames[cardName] = objectCardNames[valorProperty];
      currentCard.innerHTML = cardName;
      delete objectCardNames[valorProperty];
      localStorage.setItem("listname-cards", JSON.stringify(objectCardNames));
      renderPlaylistCards();
      let $form1 = $(".playlist-container-form");
      let $form2 = $(".playlist-container-form-2");
      $form1.classList.remove("goUp");
      $form2.classList.remove("goDown");
      input.value = "";
      return;
    }

    if ($$(".card-single").length === 0) {
      location.reload();
      return;
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".button-playlist")) {
    e.target.classList.toggle("button-playlist-active");
    return;
  }
  if (e.target.matches(".input-button-playlist")) {
    let padreForm = e.target.closest(".myForm");
    let input = padreForm.querySelector("input[type=text]");
    let playListSection = $(".playlist-section-articles");
    let arrayCancionesPlaylist = "";

    if (padreForm.classList.contains("playlist-container-form")) {
      if (comprobeExistThisProperty(input.value)) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }

      if (!regExP.test(input.value) || comprobeExistThisProperty(input.value)) {
        return;
      }

      let cardName = input.value.trim();

      if (!localStorage.getItem("listname-cards")) {
        localStorage.setItem(
          "listname-cards",
          JSON.stringify({
            [`${cardName}`]: arrayCancionesPlaylist,
          })
        );
        return;
      }

      let stringCardNames = localStorage.getItem("listname-cards");
      let objectCardsName = JSON.parse(stringCardNames);
      let objectCardNamesString = JSON.stringify({
        ...objectCardsName,
        [`${cardName}`]: arrayCancionesPlaylist,
      });
      localStorage.setItem("listname-cards", objectCardNamesString);
      renderPlaylistCards();
      return;
    }

    if (comprobeExistThisProperty(input.value)) {
      input.classList.remove("valid");
      input.classList.add("invalid");
    }

    if (!regExP.test(input.value) || comprobeExistThisProperty(input.value)) {
      return;
    }

    let index = localStorage.getItem("last-index");
    let currentCard = document.querySelectorAll(".card-single")[index];

    if (currentCard) {
      let lastIndex = localStorage.getItem("last-index");
      let cardName = input.value.trim();
      let objectCardNames = JSON.parse(localStorage.getItem("listname-cards"));
      let currentCard = [...$$(".card-single")][lastIndex].querySelector(
        ".card-single-right h3"
      );
      let valorProperty = currentCard.innerHTML;
      objectCardNames[cardName] = objectCardNames[valorProperty];
      currentCard.innerHTML = cardName;
      delete objectCardNames[valorProperty];
      localStorage.setItem("listname-cards", JSON.stringify(objectCardNames));
      renderPlaylistCards();
      let $form1 = $(".playlist-container-form");
      let $form2 = $(".playlist-container-form-2");
      $form1.classList.remove("goUp");
      $form2.classList.remove("goDown");
      input.value = "";
      return;
    }

    if ($$(".card-single").length === 0) {
      location.reload();
      return;
    }
  }
  if (e.target.matches(".three-points")) {
    let $options = e.target.querySelector(".options");
    $options.classList.toggle("options-active");
    let arrayThreePoints = [...d.querySelectorAll(".three-points")];
    let index = arrayThreePoints.indexOf(e.target);
    localStorage.setItem("last-index", index);
    return;
  }
  if (e.target.matches(".options .item-1")) {
    if (localStorage.getItem("listname-cards")) {
      let lastIndex = localStorage.getItem("last-index");
      let currentCard = [...$$(".card-single")][lastIndex];
      let currentCardName = currentCard
        .querySelector(".card-single-right h3")
        .textContent.trim();
      let objectListnameCards = JSON.parse(
        localStorage.getItem("listname-cards")
      );
      delete objectListnameCards[currentCardName];
      let nuevoObjeto = structuredClone(objectListnameCards);
      localStorage.setItem("listname-cards", JSON.stringify(nuevoObjeto));
      renderPlaylistCards();
    }

    return;
  }
  if (e.target.matches(".options .item-2")) {
    e.target.parentElement.classList.remove("options-active");
    let $form1 = d.querySelector(".playlist-container-form");
    let $form2 = d.querySelector(".playlist-container-form-2");
    $form1.classList.add("goUp");
    $form2.classList.add("goDown");

    return;
  }
  if (e.target.matches(".card-single-left a")) {
    let currenPlaylistName =
      e.target.parentElement.nextElementSibling.querySelector("h3").innerHTML;
    localStorage.setItem("lastNameCardClicked", currenPlaylistName);
  }
});

//Actualizar el estado de las playListCards
function renderPlaylistCards() {
  if (localStorage.getItem("listname-cards")) {
    let objectDeCards = JSON.parse(localStorage.getItem("listname-cards"));
    let playListSection = d.querySelector(".playlist-section-articles");
    playListSection.innerHTML = "";
    let $template = d.querySelector(".template-card-single").content;
    let fragmento = document.createDocumentFragment();

    for (let property in objectDeCards) {
      $template.querySelector(".card-single-right h3").textContent = property;
      let cancionesLength = objectDeCards[property].length;
      $template.querySelector(
        ".card-single-right p"
      ).textContent = `${cancionesLength} 
      ${cancionesLength === 1 ? "song" : "songs"}`;
      let $cardSingleClon = $template.cloneNode(true);
      fragmento.append($cardSingleClon);
    }
    playListSection.append(fragmento);
  }
}

renderPlaylistCards();

$inputPlaylist.addEventListener("input", (e) => {
  e.target.parentElement.querySelector(".max-length-input output").textContent =
    e.target.value.length;

  if (e.target.value.length === 0) {
    e.target.classList.remove("valid");
    e.target.classList.remove("invalid");
    return;
  }

  if (
    regExP.test(e.target.value) &&
    !comprobeExistThisProperty(e.target.value)
  ) {
    e.target.classList.remove("invalid");
    e.target.classList.add("valid");
  } else {
    e.target.classList.remove("valid");
    e.target.classList.add("invalid");
  }
});

$inputPlaylist2.addEventListener("input", (e) => {
  e.target.parentElement.querySelector(".max-length-input output").innerHTML =
    $inputPlaylist2.value.length;

  if (e.target.value.length === 0) {
    e.target.classList.remove("valid");
    e.target.classList.remove("invalid");
    return;
  }

  if (
    regExP.test(e.target.value) &&
    !comprobeExistThisProperty(e.target.value)
  ) {
    e.target.classList.remove("invalid");
    e.target.classList.add("valid");
  } else {
    e.target.classList.remove("valid");
    e.target.classList.add("invalid");
  }
});

// localStorage.setItem('playbackUrl', 'https://20essentials.github.io/play/')

// localStorage.setItem(
//   "listname-cards",
//   JSON.stringify({
//     "n1": [
//       ["hola", ""],
//       ["adios", ""],
//     ]
//   })
// )

// localStorage.setItem("playbackUrl", "https://20essentials.github.io/play/");

/* localStorage.setItem(
  "listname-cards",
  JSON.stringify({
    "favorite songs": [
      ["SCRIBBLE", "https://20essentials.github.io/play/songs/n1.mp3"],
      ["TWO MONTHS OFF", "https://20essentials.github.io/play/songs/n2.mp3"],
      ["REZ", "https://20essentials.github.io/play/songs/n3.mp3"],
      ["CUPS", "https://20essentials.github.io/play/songs/n4.mp3"],
      ["JUMBO", "https://20essentials.github.io/play/songs/n5.mp3"],
      ["SHUDDER", "https://20essentials.github.io/play/songs/n6.mp3"],
      ["DARK &amp; LONG", "https://20essentials.github.io/play/songs/n7.mp3"],
      ["BORN SLIPPY .NUXX", "https://20essentials.github.io/play/songs/n8.mp3"],
      [
        "BELLS &amp; CIRCLE",
        "https://20essentials.github.io/play/songs/n9.mp3",
      ],
      ["GET YOUR SHIRT", "https://20essentials.github.io/play/songs/n10.mp3"],
      ["TRAPPED", "https://20essentials.github.io/play/songs/n11.mp3"],
      ["LOW BURN", "https://20essentials.github.io/play/songs/n12.mp3"],
      ["I EXHALE", "https://20essentials.github.io/play/songs/n13.mp3"],
      ["IF I RAH", "https://20essentials.github.io/play/songs/n14.mp3"],
      ["WHY WHY", "https://20essentials.github.io/play/songs/n15.mp3"],
      ["PEARL'S GIRL", "https://20essentials.github.io/play/songs/n16.mp3"],
      ["SOLA SISTIM", "https://20essentials.github.io/play/songs/n17.mp3"],
      ["KING OF SNAKE", "https://20essentials.github.io/play/songs/n18.mp3"],
      ["MOANER", "https://20essentials.github.io/play/songs/n19.mp3"],
      ["SPIKEE", "https://20essentials.github.io/play/songs/n20.mp3"],
    ],
    "MY SONGS": [],
  })
);  */

window.addEventListener("storage", (e) => {
  if (localStorage.getItem("listname-cards")) {
    if (e.key === "listname-cards") {
      localStorage.setItem("listname-cards", e.newValue);
      renderPlaylistCards();
    }
  }
});
