// function to set Attribute
function setAttributes(element, attr) {
  const { class: className, style, ...otherAttrs } = attr;
  if (className) setClass(element, className);
  if (style)
    Object.entries(([name, value]) => {
      setStyle(element, name, value);
    });

  for (const [name, value] of Object.entries(otherAttrs)) {
    setAttribute(element, name, value);
  }
}

function setAttribute(el, name, value) {
  if (value == null) {
    removeAttribute(el, name);
  } else if (name.startsWith("data-")) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}

function removeAttribute(el, name) {
  el.removeAttribute(name);
}

function setStyle(element, name, value) {
  element.style[name] = value;
}

function removeStyle(element, name, value) {
  element.style[name] = null;
}

function setClass(element, className) {
  element.className = "";
  if (typeof className === "string") {
    element.classList.add(className);
  }
  if (Array.isArray(className)) {
    element.classList.add(...className);
  }
}
