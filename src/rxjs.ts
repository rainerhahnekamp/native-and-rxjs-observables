import { debounceTime, filter, fromEvent, map, tap } from "rxjs";

const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

fromEvent<InputEvent>(input, "input")
  .pipe(
    tap((value) => console.debug(`Debug ${value}`)),
    map((event) => (event.target as HTMLInputElement).value),
    filter((value) => value.length > 2),
  )
  .subscribe((event) => console.log(event));
