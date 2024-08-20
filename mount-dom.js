import { DOM_TYPE } from "./h";
function mountDom(vdom, parent) {
  switch (dom.type) {
    case DOM_TYPE.ELEMENT: {
      creteElementNode(vdom, parent);
      break;
    }
    case DOM_TYPE.TEXT: {
      createTextNode(vdom, parent);
      break;
    }
    case DOM_TYPE.FRAGEMENT: {
      createFragementNode(vdom, parent);
      break;
    }
    default:
      throw new Error("Failed to mount DOM of type:" + vdom.type);
  }
}

function creteElementNode(vdom, parent) {
  const { tag, props, children } = vdom;
  const element = document.createElement(tag);
  //    Set props

  //  Children mounting
  children.forEach((child) => mountDom(child, element));
  //   Save reference
  vdom.el = element;
}
// function to save events and  attribute to element
function addProp(element, props) {
  const { on: events, ...attr } = props;
  vdom.listener = addEventListeners(events, element);
  setAttribute(element, attr);
}


function createTextnode(vdom, parent) {
  const textNode = document.createTextNode(vdom.value);
  parent.appendChild(textNode);
  vdom.el = textNode;
}

function createFragementNode(vdom, parent) {
  const { children } = vdom;
  vdom.el = parent;
  children.forEach((element) => mountDom(children, parent));
}
