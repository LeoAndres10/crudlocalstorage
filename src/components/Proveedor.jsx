import useTablaProveedores from "../hooks/useTablaProveedores";
import Campo from "./Campo"
import { useEffect } from "react"
const Proveedor = () => {
    const {
        getProveedor,
            proveedores,
            setProveedores,
            proveedor,
            setProveedor,
            ciudad,
            setCiudad,
            telefono,
            setTelefono,
            distribucion,
            setDistribucion,
            centroEmpaque,
            setcentroEmpaque,
            openModal,
            validar,
            tituloModal,
            deleteProveedor,
      } = useTablaProveedores()
    
      useEffect(() => {
        setProveedores(getProveedor())
      }, [])

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProveedor" onClick={() => openModal(1)} ><i className="fa-solid fa-circle-plus" /> Añadir</button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                    <th>ID</th>
                  <th>Proveedor</th>
                  <th>Ciudad</th>
                  <th>Telefono</th>
                  <th>Centro de Distribucion</th>
                  <th>Centro de Empaque</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((proveedor, i) => (
                  <tr key={proveedor.id}>
                    <td>{i + 1}</td>
                   
                    <td>{proveedor.proveedor}</td>
                    <td>{proveedor.ciudad}</td>
                    <td>
                      {proveedor.telefono}
                    </td>
                    <td>
                      {proveedor.distribucion}
                    </td>
                    <td>
                      {proveedor.centroEmpaque}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#modalProveedor"
                        onClick={() =>
                          openModal(2, proveedor)
                        }
                      >
                        <i className="fa-solid fa-edit" />
                      </button>
                      <button className="btn btn-danger" onClick={() => deleteProveedor(proveedor.id)} >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="modalProveedor"
          className="modal fade"
          aria-hidden="true"
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <label className="h5">{tituloModal}</label>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="close"
                />
              </div>
              <div className="modal-body">
                <Campo
                  id="proveedor"
                  iconName="fa-solid fa-gift"
                  inputType="text"
                  placeHolder="Proveedor"
                  onChange={(e) => setProveedor(e.target.value)}
                  value={proveedor}
                />

                <Campo
                  id="ciudad"
                  iconName="fa-solid fa-comment"
                  inputType="text"
                  placeHolder="Ciudad"
                  onChange={(e) => setCiudad(e.target.value)}
                  value={ciudad}
                />

                <Campo
                  id="telefono"
                  iconName="fa-solid fa-comment"
                  inputType="number"
                  placeHolder="Telefono"
                  onChange={(e) => setTelefono(e.target.value)}
                  value={telefono}
                />
                <Campo
                  id="distribucion"
                  iconName="fa-solid fa-comment"
                  inputType="text"
                  placeHolder="Centro de Distribucion"
                  onChange={(e) => setDistribucion(e.target.value)}
                  value={distribucion}
                />
                <Campo
                  id="centroEmpaque"
                  iconName="fa-solid fa-comment"
                  inputType="text"
                  placeHolder="Centro de Empaque"
                  onChange={(e) => setcentroEmpaque(e.target.value)}
                  value={centroEmpaque}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => validar()}>
                  <i className="fa-solid fa-floppy-disk" /> Guardar
                </button>

                <button
                  id="btnCerrarModal"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  <i className="fa-solid fa-circle-xmark" /> Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Proveedor;