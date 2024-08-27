import { destroyDOM } from "./destroy-dom";
import { mountDom } from "./mount-dom";
import { Dispatcher } from "./dispatcher";
export default function createApp({ state, view, reducers = {} }) {
  var vdom = null;
  var parentEl = null;
  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  for (const actionName in reducers) {
    const reducer = reducers[actionName];
    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  function renderApp() {
    if (vdom) {
      destroyDOM(vdom);
    }
    vdom = view(state, emit);
    mountDom(vdom, parentEl);
  }
  return {
    mount(_parenEl) {
      parentEl = _parenEl;
      renderApp();
    },
    unmount() {
      destroyDOM(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
}
