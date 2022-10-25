import React from "react";
import styles from "./Cart.module.css";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getTotalPrice, removeFromCart } from "./cartSlice";

export function Cart() {
  /**
   * 1 - have dynamic values from product { price, id }
   * 2 - have cart values from cart to associate the count and the product { id: count }
   * 
   * 
   * 
   */
  const products = useAppSelector( state => state.products.products )
  const cartItems = useAppSelector( state => state.cart.items )
  const total = useAppSelector(getTotalPrice)
  const dispatch = useAppDispatch()
  const deleteItem = ( id: string ) => {
    console.log('[deleteitem] id', id)
    dispatch(removeFromCart({ id }))
  }
  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          { Object.entries( cartItems )?.map( ([ id, qty ])=> (
            <tr key = {`cart-item-${ id }`}>
            <td>{products[id].name}</td>
            <td>
              <input type="text" className={styles.input} defaultValue={qty} />
            </td>
            <td>{ `\$${products[id].price * qty}`}</td>
            <td>
              <button aria-label="Remove Magnifying Glass from Shopping Cart" onClick ={ () => deleteItem( id ) }>
                X
              </button>
            </td>
          </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form>
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
