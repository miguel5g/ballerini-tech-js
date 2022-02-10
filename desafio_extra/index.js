import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

function main() {
  let usersElem = document.querySelector(".users");
  let formElem = document.querySelector(".form");

  const firebaseConfig = {
    apiKey: "AIzaSyDGLmohn4CS9Lg9zNwL_ivEihLcpeaZEZA",
    authDomain: "ballerine-tech-js.firebaseapp.com",
    projectId: "ballerine-tech-js",
    storageBucket: "ballerine-tech-js.appspot.com",
    messagingSenderId: "619651791086",
    appId: "1:619651791086:web:de984c63f0b958c6eddbff",
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const usersCollection = collection(database, "users");

  let isLoading = false;
  let isFirstRender = true;

  formElem.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (isLoading) return;

    isLoading = true;

    const user = {
      name: event.target.name.value,
      age: event.target.age.value,
      skills: event.target.skills.value,
    };

    if (!user.name || !user.age || !user.skills) {
      return alert("Preencha todos os campos");
    }

    saveToFirestore(user)
      .then(() => {
        addUserInfo(user);
        event.target.reset();
      })
      .finally(() => {
        isLoading = false;
      });
  }

  async function loadFromFirestore() {
    return getDocs(usersCollection).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    });
  }

  async function saveToFirestore(user) {
    return new Promise((resolve, reject) => {
      addDoc(usersCollection, user)
        .then((docRef) => {
          alert("Usuário cadastrado com sucesso!");
          console.log("Document written with ID: ", docRef.id);
          resolve();
        })
        .catch((error) => {
          alert("Erro ao salvar usuário");
          console.error(error);
          reject(error);
        });
    });
  }

  function addUserInfo(user) {
    const elem = generateUserInfoElement(user);
    
    usersElem.innerHTML = isFirstRender ? elem : usersElem.innerHTML + elem;

    isFirstRender = false;
  }

  function generateUserInfoElement(user) {
    return `
    <li class="users__user">
      <div class="user-info">
        <label class="user-info__label"
          >Nome<span class="user-info__label--divider">:</span>
        </label>
        <h2 class="user-info__value">${user.name}</h2>
      </div>
      <div class="user-info">
        <label class="user-info__label"
          >Idade<span class="user-info__label--divider">:</span>
        </label>
        <h2 class="user-info__value user-info__value--number">${user.age} anos</h2>
      </div>
      <div class="user-info">
        <label class="user-info__label"
          >Habilidades<span class="user-info__label--divider">:</span>
        </label>
        <h2 class="user-info__value">${user.skills}</h2>
      </div>
    </li>
    `;
  }

  loadFromFirestore().then((users) => {
    users.forEach((user) => {
      addUserInfo(user);
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
