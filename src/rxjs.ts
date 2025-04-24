import {
  catchError,
  debounceTime,
  filter,
  finalize,
  firstValueFrom,
  fromEvent,
  lastValueFrom,
  map,
  of,
  retry,
  take,
  tap,
} from "rxjs";

const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

const promise = lastValueFrom(
  fromEvent<InputEvent>(input, "input").pipe(
    map((event) => (event.target as HTMLInputElement).value),
    filter((value) => value.length > 2),
    take(2),
  ),
);

promise.then((value) => console.log(value));
