import React, { useEffect, useState } from "react";
import { receiveProducts } from "./productsSlice";
// import { getProducts, Product } from "../../app/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Products.module.css";
import { getProducts } from "../../app/api";
import { addToCart } from "../cart/cartSlice";

export function Products() {

  /* ------------------------ LOCALLY STORING APPROACH ------------------------ */
  // 0 - initial implementation */
  // const [products, setProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   getProducts().then((products) => {
  //     setProducts(products);
  //   });
  // }, []);

  // 1 - after matching setting redux storage productSlice and receiveProducts */
  const dispatch = useAppDispatch()
  const {products} = useAppSelector( state => state.products )
  useEffect(() => {
    getProducts().then( products => {
      dispatch(receiveProducts( products ))
    })
  },[])

  const _addToCart = ( productID: string ) => {
    dispatch(addToCart( productID ))
  }

  return (
    <main className="page">
      <ul className={styles.products}>

        {/* // {products.map((product) => (           // 0 - initial implementation */}
        {Object.values(products).map((product) => (   // 1 - after matching setting redux storage productSlice and receiveProducts
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick = { () => {
                  _addToCart( product.id )
                }}>Add to Cart 🛒</button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
