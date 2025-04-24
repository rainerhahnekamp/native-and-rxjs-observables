const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

const abortController = new AbortController();

const promise = input
  .when<InputEvent>("input")
  .map((event) => (event.target as HTMLInputElement).value)
  .filter((value) => value.length > 2)
  .last();
