const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

const abortController = new AbortController();

const promise = input
  .when<InputEvent>("input")
  .map((event) => (event.target as HTMLInputElement).value)
  .filter((value) => value.length > 2)
  .last();

const numbers$ = new Observable((subscriber) => {
  console.log("starting Observable");
  subscriber.next(1);
  setTimeout(() => subscriber.next(2), 1000);
  setTimeout(() => subscriber.next(3), 1500);
});

numbers$.subscribe((value) => console.log(`Sub 1: ${value}`));
numbers$.subscribe((value) => console.log(`Sub 2: ${value}`));

console.log("finished");
