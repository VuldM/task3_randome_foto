const photoContainer = document.getElementById("container");

const accsesKey = "flgUfnd-HlkpwQt5aYn7khPwafnb6v8PV6b8TnSVqeU";
let page = (Math.random() * (1000 - 1) + 1).toFixed();
let rndNum = (Math.random() * (9 - 0) + 0).toFixed();
async function fetchPhotos(page) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/?client_id=${accsesKey}&page=${page}`
    );
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий", error);
    return [];
  }
}
async function run(page) {
  const data = await fetchPhotos(page);
  loadMorePhotos(data[rndNum]);
}
run(page);

function loadMorePhotos(data) {
  let like = data.likes;
  photoContainer.insertAdjacentHTML(
    "beforeend",
    ` <div class="photo">
      <h4 class="user">Пользователь<span> ${data.user.name}</spsn></h4>
      <img src="${data.urls.small}" alt="${data.urls.description}">
    <div class="likes">Лайки ${like} <img class="like" src="./img/finger_hand_like.svg" alt="finger_hand_like"></div>
    <p>Создан ${data.created_at}</p>
    </div>`
  );
  likeIt(like);
}

function likeIt(like) {
  const likesEl = photoContainer.querySelector(".likes");
  const likeEl = photoContainer.querySelector(".like");
  likeEl.addEventListener("click", () => {
    like++;
    likesEl.innerHTML = `Лайки ${like} <img class="like" src="./img/finger_hand_like.svg" alt="finger_hand_like">`;
  });
}
