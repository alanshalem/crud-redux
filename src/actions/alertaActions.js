import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

// Muestra alerta
export function mostrarAlerta(alerta) {
	return (dispatch) => {
		dispatch(crearAlerta(alerta));
	};
}

const crearAlerta = () => ({
	type: MOSTRAR_ALERTA,
	payload: alerta,
});

export function ocultarAlertaAction() {
	return (dispatch) => {
		dispatch(ocultarAlerta());
	};
}

const ocultarAlerta = () => ({
	type: OCULTAR_ALERTA,
});
