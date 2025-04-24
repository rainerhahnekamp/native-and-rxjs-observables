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

const numbers$ = new Observable((subscriber) => {
  console.log("starting Observable");
  subscriber.next(1);
  setTimeout(() => subscriber.next(2), 1000);
}).pipe(shareReplay({ refCount: true }));

numbers$.subscribe((value) => console.log(`Sub 1: ${value}`));
numbers$.subscribe((value) => console.log(`Sub 2: ${value}`));

console.log("finished");
