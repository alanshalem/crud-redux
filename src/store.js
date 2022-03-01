import { createStore, applyMiddleware, compose } from "redux";
// ApplyMiddleware sirve para usar las funciones async await con thunk
import thunk from "redux-thunk";
// thunk me sirve para poder usar las funciones asincronas
import reducer from "./reducers";
// creamos el store
const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk),
		typeof window === "object" &&
			typeof window.__REDUX_DEVTOOLS_EXTENSION__ != undefined
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f // esto es para que funcione el redux dev tools
	)
);

// Lo exportamos al store, ya que se requiere en el componente principal para que fluyan los datos en todo el proyecto
export default store;
