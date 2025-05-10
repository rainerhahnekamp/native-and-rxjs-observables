const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

// const abortController = new AbortController();
//

//
function findFlights(from: string) {
  return new Observable<{ from: string }[]>((subscriber) => {
    subscriber.addTeardown(() => {
      console.log("tearing down...");
    });

    fetch(`https://demo.angulararchitects.io/api/flight?from=${from}`, {
      signal: subscriber.signal,
    })
      .then((res) => res.json())
      .then((flights) => {
        subscriber.next(flights);
        subscriber.complete();
      })
      .catch(() => void true);
  });
}

input
  .when<InputEvent>("input")
  .map((event) => (event.target as HTMLInputElement).value)
  .filter((value) => value.length > 2)
  .flatMap(findFlights)
  .subscribe(console.log);
