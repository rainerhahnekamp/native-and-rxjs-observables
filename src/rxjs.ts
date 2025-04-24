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
  Observable,
  share,
  shareReplay,
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

const flights$ = new Observable<{ from: string }[]>((subscriber) => {
  fetch("https://demo.angulararchitects.io/api/flight?from=A")
    .then((res) => res.json())
    .then((flights) => subscriber.next(flights));
});

flights$.subscribe((flights) => console.log(`Sub 1: ${flights.length}`));
flights$.subscribe((flights) => console.log(`Sub 2: ${flights.length}`));

console.log("finished");
