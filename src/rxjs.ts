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
  switchMap,
  mergeMap,
  concatMap,
} from "rxjs";

const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

function findFlights(from: string) {
  return new Observable<{ from: string }[]>((subscriber) => {
    const abortController = new AbortController();
    fetch(`https://demo.angulararchitects.io/api/flight?from=${from}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((flights) => {
        subscriber.next(flights);
        subscriber.complete();
      })
      .catch(() => void true);

    return () => {
      console.log("tearing down...");
      abortController.abort();
    };
  });
}

const flights$ = fromEvent<InputEvent>(input, "input")
  .pipe(
    map((event) => (event.target as HTMLInputElement).value),
    filter((value) => value.length > 2),
    concatMap((from) => findFlights(from)),
  )
  .subscribe(console.log);
