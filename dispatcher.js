export class Dispatcher {
  #subs = new Map();
  #afterEveryCommand = [];
  afterEveryCommand = (handler) => {
    this.#afterEveryCommand.push(handler);
    // method to unsubscribe the method
    return () => {
      const indx = this.#afterEveryCommand.indexOf(handler);
      this.#afterEveryCommand.splice(indx, 1);
    };
  };
  subscribe(commandName, handler) {
    if (!this.#subs.has(commandName)) {
      this.#subs.set(commandName, []);
    }
    const handlers = this.#subs.get(commandName);
    // if already their then return a empty function
    if (handlers.include(handler)) {
      return () => {};
    }
    // push into handlers if not present
    handlers.push(handler);

    // function to remove subscription
    return () => {
      const ind = handlers.indexOf(handler);
      handlers.splice(ind, 1);
    };
  }
  dispatch(commandName, payload) {
    if (this.#subs.has(commandName)) {
      this.#subs.get(commandName).forEach((handler) => handler(payload));
    } else {
      console.warn(`No handler for command ${commandName}`);
    }
    this.#afterEveryCommand.forEach((handler) => handler());
  }
}
