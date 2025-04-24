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
  const abortController = new AbortController();
  fetch("https://demo.angulararchitects.io/api/flight?from=A", {
    signal: abortController.signal,
  })
    .then((res) => res.json())
    .then((flights) => subscriber.next(flights))
    .catch(() => void true);

  return () => {
    console.log("tearing down...");
    abortController.abort();
  };
});

const subscription = flights$.subscribe((flights) =>
  console.log(`Sub 1: ${flights.length}`),
);
setTimeout(() => subscription.unsubscribe(), 10);

console.log("finished");
