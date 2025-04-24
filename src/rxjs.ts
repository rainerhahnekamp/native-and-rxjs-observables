import { fromEvent } from "rxjs";

const input = document.getElementById("input")! as HTMLInputElement;
const button = document.getElementById("button")! as HTMLButtonElement;

fromEvent(button, "click").subscribe((event) => console.log(event));
