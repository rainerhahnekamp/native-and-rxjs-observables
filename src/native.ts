const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

const abortController = new AbortController();

const promise = input
  .when<InputEvent>("input")
  .map((event) => (event.target as HTMLInputElement).value)
  .filter((value) => value.length > 2)
  .last();

const flights$ = new Observable<{ from: string }[]>((subscriber) => {
  fetch("https://demo.angulararchitects.io/api/flight?from=A")
    .then((res) => res.json())
    .then((flights) => {
      subscriber.next(flights);
      subscriber.complete();
    });
});

flights$.subscribe((flights) => console.log(`Sub 1: ${flights.length}`));
setTimeout(
  () =>
    flights$.subscribe((flights) => console.log(`Sub 2: ${flights.length}`)),
  1000,
);

console.log("finished");
