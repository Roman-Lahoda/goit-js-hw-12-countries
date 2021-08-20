import "../sass/main.scss";
import fetchCountries from "./fetchCountries";
import { error } from "../../node_modules/@pnotify/core/dist/PNotify.js";
import "@pnotify/core/dist/BrightTheme.css";
const debounce = require("lodash.debounce");
import countryMurkup from "../templates/country";
import countriesMurkup from "../templates/countries-list";

export const refs = {
  input: document.querySelector("#input-js"),
  result: document.querySelector("#result-js"),
};

const showOneCounrty = obj => {
  console.log(obj);
  const murkup = countryMurkup(obj);
  refs.result.innerHTML = murkup;
  //   console.log(test);
};

const showManyCountry = obj => {
  console.log(obj);
  const murkup = countriesMurkup(obj);
  refs.result.innerHTML = murkup;
};

const showAllert = () => {
  error({
    text: "Too many matches found. Please enter a more specific query!",
  });
};

const createMarkup = promiseResult => {
  if (promiseResult.length === 1) {
    showOneCounrty(promiseResult);
  } else if (promiseResult.length > 1 && promiseResult.length <= 10) {
    showManyCountry(promiseResult);
  } else if (promiseResult.length > 10) {
    showAllert();
    // console.log(promiseResult);
  } else {
    error({
      text: "Not found",
    });
  }
};

const errorfun = arrayCountry => {
  console.log("errorfun");
  if (refs.input.value.trim().length >= 1 && arrayCountry.length === 0) {
    error({
      text: "Not found",
    });
    console.log(refs.input.value.length);
    console.log(arrayCountry.length);
    console.log(arrayCountry);
  }
};

const result = () => {
  const array = fetchCountries()
    .then(result => result.json())
    .then(result => createMarkup(result))
    .catch(result => errorfun(result));
};

const country = debounce(result, 500);
refs.input.addEventListener("input", country);

//

//

//

// fetchCountries("ame")
//   .then(result => result.json())
//   .then(result => console.log(result));

// alert({
//   text: "Notice me, senpai!",
// });

// console.log(
//   fetchCountries("america")
//     .then(response => response.json())
//     .then(result => console.log(result)),
// );

// const body = document.querySelector("body");

// function flag(url) {
//   const imgFlag = document.createElement("img");
//   imgFlag.setAttribute("src", url);
//   body.insertAdjacentElement("beforeend", imgFlag);
// }

// const test = () => {
//   console.log("hello");
// };

// const testsecond = debounce(test, 500);

// // testsecond();

// const input = document.querySelector("#input");
// input.addEventListener("input", testsecond);
