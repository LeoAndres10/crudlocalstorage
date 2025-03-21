import { useState } from "react"
import  Swal from "sweetalert2"
import { alertaSuccess, alertaError, alertaWarning } from "../hooks/alertas"

const useTablaProveedores = () => {
    const [proveedores, setProveedores] = useState([])
    const [id, setId] = useState('')
    const [proveedor, setProveedor] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [distribucion, setDistribucion] = useState('')
    const [centroEmpaque, setcentroEmpaque] = useState('')
    const [tituloModal, setTituloModal] = useState('')
    const [operacion, setOperacion] = useState('')
    
    
    const getProveedor = () => {
        const localStorageProveedores = localStorage.getItem('PROVEEDORES')
        const parsedProveedores = localStorageProveedores ? JSON.parse(localStorageProveedores) : []

        return Array.isArray(parsedProveedores) ? parsedProveedores : []
    }


    const enviarSolicitud = (metodo, parametros = {}) => {
        const saveUpdateProveedor = [...proveedores]
       

        if (metodo === 'POST') {
            saveUpdateProveedor.push({ ...parametros, id: Date.now()})
            alertaSuccess('Proveedor ingresado correctamente')
        } else if (metodo === 'PUT') {
            const proveedorIndex = saveUpdateProveedor.findIndex(proveedor => proveedor.id === parametros.id)

            if (proveedorIndex !== -1) {
                saveUpdateProveedor[proveedorIndex] = {...parametros}
                alertaSuccess('Proveedor actualizado correctamente')
            }
        } else if (metodo === 'DELETE') {
            
            const proveedorArr = saveUpdateProveedor.filter(proveedor => proveedor.id !== parametros.id)
            
            localStorage.setItem('PROVEEDORES', JSON.stringify(proveedorArr));
            alertaSuccess('Proveedor eliminado correctamente')
            saveUpdateProveedor.push({ ...parametros, id: Date.now()})
         return 
        }

        localStorage.setItem('PROVEEDORES', JSON.stringify(saveUpdateProveedor));
        setProveedores(saveUpdateProveedor)
        document.getElementById('btnCerrarModal').click()
    }

    const validar = () => {
        let metodo = ''

        if (proveedor === '') {
            alertaWarning('Nombre del proveedor en blanco', 'proveedor')
        } else if (ciudad === '') {
            alertaWarning('Ciudad del proveedor en blanco', 'ciudad')
        } else if (telefono === '') {
            alertaWarning('Telefono del proveedor en blanco', 'telefono')
        } 
        else if (distribucion === '') {
            alertaWarning('Distribucion del proveedor en blanco', 'distribucion')
        } else if (centroEmpaque === '') {
            alertaWarning('Centro de empaque del proveedor en blanco', 'centroEmpaque')
        
        } else {
            let payload = {
                id: id || Date.now(),
                proveedor: proveedor,
                ciudad: ciudad,
                telefono: parseInt(telefono),
                distribucion: distribucion,
                centroEmpaque: centroEmpaque,
            }
    
            if (operacion === 1) {
                metodo = 'POST'
            } else if(operacion===2) {
                metodo = 'PUT'
            }else{
                metodo = 'DELETE'
                
            }
    
            enviarSolicitud(metodo, payload)
        }
    }

    const openModal = (valorOperacion, proveedor) => {
        if (valorOperacion === 1) {
            console.log(valorOperacion)
            setTituloModal('Registrar Proveedor')
            setId('')
            setProveedor('')
            setCiudad('')
            setTelefono('')
            setDistribucion('')
            setcentroEmpaque('')
            setOperacion(1)
        } else if (valorOperacion === 2) {
            setTituloModal('Editar Proveedor')
            setId(proveedor.id)
            setProveedor(proveedor.proveedor)
            setCiudad(proveedor.ciudad)
            setTelefono(proveedor.telefono)
            setDistribucion(proveedor.distribucion)
            setcentroEmpaque(proveedor.centroEmpaque)
            setOperacion(2)
        }
    }

    const deleteProveedor = (id) => {
        Swal.fire({
            title: '¿Está seguro de eliminar el proveedor?',
            icon: 'question',
            text: 'No podra revertir los cambios',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud('DELETE', {id})
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

    return {
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
    }
}

export default useTablaProveedores