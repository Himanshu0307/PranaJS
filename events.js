function addEventListener(eventName, handler, element) {
  element.addEventListener(eventName, handler);
  return handler;
}

export function addEventListeners(listeners = {}, el) {
  const addedListeners = {};
  Object.entries(listeners).forEach(([eventname, handler]) => {
    const listener = addEventListener(eventname, handler);
    addedListeners[eventname] = handler;
  });
  return addedListeners;
}

export function removeEventListeners(listener = {}, element) {
  Object.entries(listener).forEach(([eventname, handler]) => {
    element.removeEventListener(eventname, handler);
  });
}
