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
  clear: document.querySelector(".clear"),
};

const onClear = () => {
  refs.input.value = "";
  refs.result.innerHTML = "";
};

refs.clear.addEventListener("click", onClear);

const showOneCounrty = obj => {
  const murkup = countryMurkup(obj);
  refs.result.innerHTML = murkup;

  const population = document.querySelector(".population-js");
  const refactPopulation = new Intl.NumberFormat("ru-RU").format(population.textContent);
  population.textContent = refactPopulation;
};

const showMoreInfo = e => {
  const targetCountry = e.target;
  refs.input.value = targetCountry.textContent.trim();
  refs.input.dispatchEvent(new Event("input"));
};

const showManyCountry = obj => {
  console.log("test");
  const murkup = countriesMurkup(obj);
  // console.log(murkup);
  refs.result.innerHTML = murkup;

  const currentCountry = document.querySelector(".country-list");
  console.log(currentCountry);
  currentCountry.addEventListener("click", showMoreInfo);
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
  } else {
    error({
      text: "Not found",
    });
  }
};

const errorfun = arrayCountry => {
  refs.result.innerHTML = "";
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
