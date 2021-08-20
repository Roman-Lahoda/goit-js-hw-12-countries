import { refs } from "./index";
export default function fetchCountries() {
  let result = null;
  const country = refs.input.value;
  //   console.log("test");
  return (result = fetch(`https://restcountries.eu/rest/v2/name/${country}`));
  // .then(result => result.json())
  // .then(result => console.log(result))
}
