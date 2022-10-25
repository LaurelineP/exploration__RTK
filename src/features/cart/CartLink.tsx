import React from "react";
import { Link } from "react-router-dom";
import {  useAppSelector } from "../../app/hooks";
import styles from "./CartLink.module.css";
import { getNumItems, getMemoizedNumItems } from './cartSlice'


export function CartLink() {
  // 0 - consume the function selector created ( non optimized )
  // const numberOfItems = useAppSelector(getNumItems)

  /** 1 - updating to avoid cartLink rerendering on every store changes ( optimized )
   * This Component was rerendered because when switching to
   * Products page --> each time the store is updated while emulating the fetch of the 
   * JSON data
  */
  const numberOfItems = useAppSelector( getMemoizedNumItems )
  
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{ numberOfItems || "Cart" }</span>
    </Link>
  );
}
