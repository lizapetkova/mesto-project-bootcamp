const page = document.querySelector('.page');
const content = page.querySelector('.content');

// открытие попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие попапов

const buttonsClosePopup = page.querySelectorAll('.popup__btn-close');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonsClosePopup.forEach(button => {
  button.addEventListener('click', event => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
})

// редактирование профиля

const popupProfile = page.querySelector('.popup_edit-profile');
const buttonEditProfile = content.querySelector('.profile__btn-edit');
const formSaveProfile = popupProfile.querySelector('.popup__form');
const profileNameInput = formSaveProfile.querySelector('.popup__input_profile-name');
const profileDescriptionInput = formSaveProfile.querySelector('.popup__input_profile-description');
const profileNameElement = content.querySelector('.profile__title');
const profileDescriptionElement = content.querySelector('.profile__subtitle');


function openProfilePopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  openPopup(popupProfile);
}

buttonEditProfile.addEventListener('click', openProfilePopup);

function saveProfile(event) {
  event.preventDefault();
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = description;
  closePopup(popupProfile);
}

formSaveProfile.addEventListener('submit', saveProfile);

// добавление изображений

const cardTemplate = document.querySelector('#card-item-template').content;
const galleryCardsElement = content.querySelector('.gallery__cards');
const popupViewPhoto = page.querySelector('.popup_viewer-photo');
const popupViewImage = popupViewPhoto.querySelector('.popup__photo');
const popupViewTitle = popupViewPhoto.querySelector('.popup__caption');

function createCardElement(cardData) {
  const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery__photo');
  const cardTextElement = cardElement.querySelector('.gallery__text');
  const buttonLikeCard = cardElement.querySelector('.gallery__like');
  const buttonDeleteCard = cardElement.querySelector('.gallery__delete');
  cardImage.src = cardData.link;
  cardImage.setAttribute('alt', cardData.name);
  cardTextElement.textContent = cardData.name;

  function openViewPhotoPopup() {
    popupViewImage.src = cardData.link;
    popupViewImage.setAttribute('alt', cardData.name);
    popupViewTitle.textContent = cardData.name;
    openPopup(popupViewPhoto);
  }

  cardImage.addEventListener('click', openViewPhotoPopup);

  function toggleLike() {
    buttonLikeCard.classList.toggle('gallery__like_active');
  }

  buttonLikeCard.addEventListener('click', toggleLike);

  function deleteCard() {
    cardElement.remove();
  }

  buttonDeleteCard.addEventListener('click', deleteCard);

  return cardElement;
}

const galleryCards = [
  {
    name: 'Санкт-Петербург',
    link: './images/spb.jpeg'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpeg'
  },
  {
    name: 'Казань',
    link: './images/kazan.jpeg'
  },
  {
    name: 'Выборг',
    link: './images/vyborg.jpeg'
  },
  {
    name: 'Псков',
    link: './images/pskov.jpeg'
  },
  {
    name: 'Приозерск',
    link: './images/korela.jpeg'
  }
];

galleryCards.forEach(card => {
  const cardElement = createCardElement(card);
  galleryCardsElement.append(cardElement);
})

// кнопка добавления изображений

const popupAddPhoto = page.querySelector('.popup_add-photo');
const buttonAddPhoto = content.querySelector('.profile__btn-add');
const formAddPhoto = popupAddPhoto.querySelector('.popup__form');
const photoNameInput = popupAddPhoto.querySelector('.popup__input_photo-name');
const photoUrlInput = popupAddPhoto.querySelector('.popup__input_photo-url');

function openAddPhotoPopup() {
  formAddPhoto.reset();
  openPopup(popupAddPhoto);
}

buttonAddPhoto.addEventListener('click', openAddPhotoPopup);

function addPhotoPopup(event) {
  event.preventDefault();
  const title = photoNameInput.value;
  const url = photoUrlInput.value;
  const cardData = {
    name: title,
    link: url
  }
  const cardElement = createCardElement(cardData);
  galleryCardsElement.prepend(cardElement);
  closePopup(popupAddPhoto);
}

formAddPhoto.addEventListener('submit', addPhotoPopup);
