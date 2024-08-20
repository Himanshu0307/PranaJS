import { h } from "./h.js";
const dom = h("p", { class: "sfdsdfsf" }, [
  h("span", { class: "Sdfsfsf" }, ["Hiii"]),
]);
console.log(dom.children[0].children);
