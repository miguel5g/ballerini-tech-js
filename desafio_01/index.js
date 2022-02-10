function main() {
  const formElem = document.querySelector(".form");
  const nameElem = document.getElementById("name-value");
  const ageElem = document.getElementById("age-value");
  const learnElem = document.getElementById("learn-value");

  formElem.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();

    console.log(nameElem);

    nameElem.innerText = event.target.name.value;
    ageElem.innerText = event.target.age.value;
    learnElem.innerText = event.target.learn.value;
  }
}

document.addEventListener("DOMContentLoaded", main);
