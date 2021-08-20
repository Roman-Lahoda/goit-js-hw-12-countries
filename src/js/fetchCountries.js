import { refs } from "./index";
export default function fetchCountries() {
  let result = null;
  const country = refs.input.value;
  return (result = fetch(`https://restcountries.eu/rest/v2/name/${country}`));
}
