const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

// const abortController = new AbortController();
//
// const promise = input
//   .when<InputEvent>("input")
//   .map((event) => (event.target as HTMLInputElement).value)
//   .filter((value) => value.length > 2)
//   .last();
//
const flights$ = new Observable<{ from: string }[]>((subscriber) => {
  subscriber.addTeardown(() => {
    console.log("tearing down...");
  });

  fetch("https://demo.angulararchitects.io/api/flight?from=A", {
    signal: subscriber.signal,
  })
    .then((res) => res.json())
    .then((flights) => {
      subscriber.next(flights);
      subscriber.complete();
    })
    .catch(() => void true);
});

const abortController = new AbortController();
flights$.subscribe((flights) => console.log(`Sub 1: ${flights.length}`), {
  signal: abortController.signal,
});

setTimeout(() => abortController.abort(), 10);

console.log("finished");
