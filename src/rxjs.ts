import {
  catchError,
  debounceTime,
  filter,
  finalize,
  fromEvent,
  map,
  of,
  retry,
  take,
  tap,
} from "rxjs";

const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

fromEvent<InputEvent>(input, "input")
  .pipe(
    map((event) => (event.target as HTMLInputElement).value),
    filter((value) => value.length > 2),
    // take(2),
    tap((value) => {
      if (value === "RxJS") {
        throw new Error("invalid input");
      }
    }),
    take(2),
    finalize(() => console.log("We are done")),
    // retry(),
    // catchError(() => of("-")),
  )
  .subscribe({
    next: (event) => console.log(event),
    complete: () => console.log("completed"),
    error: (err) => console.log("error: %o", err),
  });
