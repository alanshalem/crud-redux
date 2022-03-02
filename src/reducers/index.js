// En el archivo index combinamos todos los reducers
import { combineReducers } from "redux";
import productosReducer from "./productosReducer";
import alertaReducer from "./alertaReducer";
// Aca combino los reducers con sus states con el combineReducers
export default combineReducers({
	productos: productosReducer,
	alerta: alertaReducer,
});
