const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

input
  .when<InputEvent>("input")
  .map((event) => (event.target as HTMLInputElement).value)
  .filter((value) => value.length > 2)
  // .inspect((value) => {
  //   if (value === "RxJS") {
  //     throw new Error("invald input");
  //   }
  // })
  .catch(() => Observable.from(["-"]))
  .take(2)
  .finally(() => console.log("We are done"))
  .subscribe({
    next: (event) => console.log(event),
    complete: () => console.log("completed"),
    error: (err) => console.log("error: %o", err),
  });
