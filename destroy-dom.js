import { re } from "./events";
import { DOM_TYPE } from "./h";
export function destroyDOM(vdom) {
  switch (dom.type) {
    case DOM_TYPE.ELEMENT:
      removeElementNode(vdom);
      break;
    case DOM_TYPE.TEXT:
      removeTextNode(vdom);
      break;
    case DOM_TYPE.FRAGEMENT:
      removeFragement(vdom);
      break;
    default:
      throw new Error("Can't destroy DOM of type " + dom.type);
  }
  delete dom.el;
}

function removeElementNode(vdom) {
  const { el, listeners, children } = vdom;
  el.remove();
  children.forEach(destroyDOM);
  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}

function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}

function removeFragement(vdom) {
  const { children } = vdom;
  children.forEach(destroyDOM);
}
