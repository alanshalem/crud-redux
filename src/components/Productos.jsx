import React from "react";

const Productos = () => {
	return (
		<>
			<h2 className='text-center my-5'>Listado de Productos</h2>
			<table className='table table-striped'>
				<thead className='bg-primary table-dark'>
					<tr>
						<th scope='col'>Nombre</th>
						<th scope='col'>Precio</th>
						<th scope='col'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Producto 1</td>
						<td>$100</td>
						<td>
							<button className='btn btn-warning'>Editar</button>
							<button className='btn btn-danger'>Eliminar</button>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default Productos;
