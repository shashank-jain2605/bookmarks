const modal = document.getElementById("modal");
const showModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close-modal");
const bookMarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookMarksArray = [];

//event listeners
showModal.addEventListener("click", openModalContainer);
closeModal.addEventListener("click", closeModalContainer);
bookMarkForm.addEventListener("submit", storeBookMark);

//Functions------

//open modal, focus on1st input
function openModalContainer() {
  console.log("hi");
  modal.style.display = "flex";
  websiteNameEl.focus();
}

function closeModalContainer() {
  console.log("hi");
  modal.style.display = "none";
}

window.addEventListener("click", (e) =>
  e.target === modal ? (modal.style.display = "none") : false
);

function storeBookMark(e) {
  e.preventDefault();
  console.log(e);
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;

  if (!urlValue.includes("http://") && !urlValue.includes("https://")) {
    urlValue = `https://${urlValue}`;
  }

  // createNewBookmark(nameValue, urlValue);
  if (!validateForm(nameValue, urlValue)) {
    return false;
  }

  //storing in local storage:
  const bookMark = {
    bookMarkName: nameValue,
    bookMarkUrl: urlValue,
  };

  bookMarksArray.push(bookMark);

  localStorage.setItem("bookMarks", JSON.stringify(bookMarksArray));
  fetchBookMarks();

  bookMarkReset();
  websiteNameEl.focus();
}

function validateForm(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert("please submit values for both fields");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("please provide a valid url");
    return false;
  }

  //valid
  return true;
}

function bookMarkReset() {
  websiteNameEl.value = "";
  websiteUrlEl.value = "";
}

//fetchBookmarks
function fetchBookMarks() {
  //get bookmarks from local storage if available
  if (localStorage.getItem("bookMarks")) {
    bookMarksArray = JSON.parse(localStorage.getItem("bookMarks"));
  }
  // else {
  //   //create bookMarks array
  //   bookMarksArray = [
  //     {
  //       bookMarkName: "Google",
  //       bookMarkUrl: "https://www.google.com/",
  //     },
  //   ];

  //   localStorage.setItem("bookMarks", JSON.stringify(bookMarksArray));
  // }

  createNewBookmark();
}

function createNewBookmark() {
  bookmarksContainer.innerHTML = "";
  bookMarksArray.forEach((bookmarks) => {
    console.log(bookmarks);
    const { bookMarkName, bookMarkUrl } = bookmarks;

    const html = `<div class="item">
    <div class="close">
      <i
        class="far fa-times-circle"
        id="delete-bookmark"
        title="delete bookmark"
      ></i>
    </div>
    <div class="name">
      <img
        src="https://s2.googleusercontent.com/s2/favicons?domain=${bookMarkUrl}"
        alt="fav-icon"
      />
      <a href="${bookMarkUrl}" target="_blank">${bookMarkName}</a>
    </div>
  </div>`;
    bookmarksContainer.insertAdjacentHTML("beforeend", html);
    websiteUrlEl.value = "";
    websiteNameEl.value = "";
    closeModalContainer();

    //deleting the bookmark::
    const deleteBookMark = document.querySelectorAll("#delete-bookmark");
    console.log(deleteBookMark);
    deleteBookMark.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e);
        const parent = e.target.parentNode.parentNode;
        console.log(parent);
        console.log(parent.querySelector("a"));
        console.log(parent.querySelector("a").getAttribute("href"));

        const deleteLink = parent.querySelector("a").getAttribute("href");

        bookMarksArray.forEach((bookmark, i) => {
          if (bookmark.bookMarkUrl === deleteLink) {
            console.log("delete this link", i);
            bookMarksArray.splice(i, 1);
            localStorage.setItem("bookMarks", JSON.stringify(bookMarksArray));
            console.log(bookMarksArray);
          } else {
            console.log(bookmark.bookMarkUrl);
          }
        });
        parent.remove();
      });
    });
  });
}

//onLoad
fetchBookMarks();

//
//--------------------------------------------
//   //item
//   const item = document.createElement("div");
//   item.classList.add("item");

//   //close
//   const closeItem = document.createElement("div");
//   closeItem.classList.add("close");

//   const icon = document.createElement("i");
//   icon.classList.add("far", "fa-times-circle");
//   icon.setAttribute("title", "delete bookmark");
//   icon.setAttribute("onclick", `deleteBookMark("${bookMarkUrl}")`);

//   //name
//   const bookMarkUrlAndIcon = document.createElement("div");
//   bookMarkUrlAndIcon.classList.add("name");

//   const favicon = document.createElement("img");
//   favicon.setAttribute(
//     "src",
//     `https://s2.googleusercontent.com/s2/favicons?domain=${bookMarkUrl}`
//   );

//   const link = document.createElement("a");
//   link.setAttribute("href", `${bookMarkUrl}`);
//   link.setAttribute("target", "_blank");
//   link.innerHTML = bookMarkName;

//   //append  to bookMarkcontainer:
//   bookMarkUrlAndIcon.append(favicon, link);
//   closeItem.append(icon);
//   item.append(closeItem, bookMarkUrlAndIcon);
//   bookmarksContainer.appendChild(item);

//   closeModalContainer();
// });
