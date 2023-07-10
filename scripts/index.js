const initialCards = [
  {
    name: "Yosmite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ====================================================== //
// =================== //*Elements*// =================== //
// ====================================================== //
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#new-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const imageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector(".modal__image");
const modalImageCaption = document.querySelector(".modal__image-caption");
const modalImageClose = imageModal.querySelector(".modal__close");

const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const addNewCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;



// ====================================================== //
// ==================== /*Functions*/ =================== //
// ====================================================== //
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
 document.removeEventListener("keydown", closeByEscape);
}

const closeButtons = document.querySelectorAll(".modal__close");

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

profileEditModal.addEventListener("mousedown", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ){
    closeModal(profileEditModal);
  }
  
});

const addCardModalWindow = document.querySelector("#new-card-modal");
addCardModalWindow.addEventListener("mousedown", (e) => {
console.log(e.target);
if (
  e.target.classList.contains("modal") ||
  e.target.classList.contains("modal__close")
) {
  closeModal(addCardModalWindow);
}
});

const previewModalWindow = document.querySelector("#image-modal");
previewModalWindow.addEventListener("mousedown", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closeModal(previewModalWindow);
  }
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__button-delete");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(imageModal);
    modalImage.src = cardImageEl.src;
    modalImage.alt = cardImageEl.alt;
    modalImageCaption.textContent = cardTitleEl.textContent;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}



// ====================================================== //
// ================= /*Event Handlers*/ ================= //
// ====================================================== //
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileEditTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {};
  cardData.name = cardTitleInput.value;
  cardData.link = cardUrlInput.value;
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closeModal(newCardModal);
  addCardForm.reset();
  const inactiveButtonClass = "modal__button_disabled";
  addCardCloseButton.classList.remove(inactiveButtonClass);
  addCardCloseButton.disabled = true;
}



// ====================================================== //
// ================= /*Event Listeners*/ ================ //
// ====================================================== //
profileEditButton.addEventListener("click", () => {
  profileEditTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => {
  openModal(newCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

modalImageClose.addEventListener("click", () => {
  closeModal(imageModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});



