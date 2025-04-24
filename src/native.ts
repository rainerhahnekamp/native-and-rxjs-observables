const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

const abortController = new AbortController();

input
  .when<InputEvent>("input")
  .map((event) => (event.target as HTMLInputElement).value)
  .filter((value) => value.length > 2)
  .finally(() => console.log("We are done"))
  .subscribe(
    {
      next: (event) => console.log(event),
      complete: () => console.log("completed"),
      error: (err) => console.log("error: %o", err),
    },
    { signal: abortController.signal },
  );

button.when("click").subscribe(() => {
  console.log("unsubscribing...");
  abortController.abort();
});
