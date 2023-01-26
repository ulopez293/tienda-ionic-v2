import { useState, useEffect, useContext } from 'react'
import { IonButton } from '@ionic/react';
import './Productos.css';
import Producto from './Producto';
import ProductoInterface from '../../interfaces/Producto'

interface ProductosProps {
  getProductos?: () => Promise<Array<ProductoInterface>>,
  productos?: Array<ProductoInterface>
  tipo: string
}

function Productos({ getProductos, productos, tipo }: ProductosProps) {
  let [productosState, setProductos] = useState<ProductoInterface[]>([])

  useEffect(() => {
    if (getProductos && productos) {
      let fetchData = async () => {
        if (tipo == "normal") { setProductos(await getProductos()) }
        else { setProductos(productos) }
      }
      fetchData()
    }
    return () => setProductos([])
  }, [])

  return (
    <>
    {
      productosState.length >= 1 ? productosState.map(item => (
        <Producto key={item.identificador} tipo={tipo} producto={item} />
      )) :<h5>No hay productos registrados...</h5>
    }
    </>
  );
}

export default Productos
