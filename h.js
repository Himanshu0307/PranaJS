import { withoutNulls } from "./src/utils/arrays.js";

export const DOM_TYPE = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGEMENT: "fragement",
};
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPE.ELEMENT,
  };
}

function mapTextNodes(childrens) {
  return childrens.map((child) => {
    return typeof child === "string" ? hString(child) : child;
  });
}

function hString(child) {
  return { type: DOM_TYPE.TEXT, value: child };
}

function hfragement(vNodes) {
  return {
    type: DOM_TYPE.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}
