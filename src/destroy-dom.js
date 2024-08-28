import { DOM_TYPE } from "./h";

/* *Exposed method to Destroy Virtual DOM */
export function destroyDOM(vdom) {
  switch (vdom.type) {
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
  delete vdom.el;
}

/*
 * method to remove Element from virtual DOM
 */

function removeElementNode(vdom) {
  const { el, listeners, children } = vdom;
  el.remove();
  children.forEach(destroyDOM);
  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}

/*
 * method to remove Text Node from VDom
 */

function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}

/*
 * method to remove Fragement Node from VDom
 */
function removeFragement(vdom) {
  const { children } = vdom;
  children.forEach(destroyDOM);
}
