import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../app/api'
import { RootState } from '../../app/store'

// Describe how the cart state should be
export interface CartState {
	items: {
		[ productID: string ]: number
	}
}

// Create the initial state of cart ( when empty )
const initialState: CartState = {
	items: {}
}

// Create the slice definition for the cart
const cartSlice = createSlice({
	name: 'cart', 
	initialState,
	reducers: {
		addToCart: ( state, action: PayloadAction<string> ) => {
			const id = action.payload
			const item = state.items[id]
			if(item){
			 state.items[id] += 1
			} else {

				state.items[id] = 1
			}
		}, removeFromCart: ( state, action: PayloadAction<string>) => {
			const id = action.payload.id;
			console.log('id', id)
			delete state.items[id]

		}
	}
})

// Export the reducer to connect it to the store configuration
export const { addToCart , removeFromCart } = cartSlice.actions
export default cartSlice.reducer;


// Created a "selector": a function taking the state and returning any value wanted
export function getNumItems( state: RootState ){
	console.log('1️⃣ calling numItems - rendering multiple time');
	
	let numItems = 0
	for (let id in state.cart.items) {
	  numItems += state.cart.items[id]
	}
	return numItems
}

/** Create a memoized version of the function selector above 
 * - takes 2 functions : 
 * 		- get specific state callback 
 * 		- values to memoized 
 * - Note getNumItems could have been refactor in order to consume 
 * 		the function in getMemoizedNumItems ( taking parameters state or items ?)
 * - Will remember the value of its selector as long as the first one does not change
 * 		- this will be run every single time but will checked if items and state.cart.items 
 * 			have not change otherwise will run the function
 *  */
export const getMemoizedNumItems = createSelector(
	(state:RootState) => state.cart.items,
	(items) => {
	console.log('2️⃣ calling getMemoizedNumItems');

		let numItems = 0;
		for( let id in items ){
			numItems += items[id]
		}
		return numItems;
	}
)



export const getTotalPrice = createSelector(
	(state :RootState) => state.cart.items,
	(state :RootState) => state.products.products,
	(items, products) => {
		// return Object.entries( items )
		// 	.reduce(( acc, [ id, qty] ) => {
		// 	return 	acc += products[id].price * qty
		// }, 0).toFixed(2)
		let total = 0;
		for ( let id  in items ){
			total += items[id] * products[id].price
		}
		return total.toFixed(2)
	}
)
