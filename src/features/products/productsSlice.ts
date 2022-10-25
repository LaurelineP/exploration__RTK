import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../app/api'

export interface ProductsState {
	products: {
		[id: string]: Product
	}
}

const initialState: ProductsState = {
	products: {1: {
		id: '1',
		name: 'Banana',
		price: 20,
		description: 'A yellow banana',
		imageURL: 'https://images.heb.com/is/image/HEBGrocery/000377497?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0',
		imageAlt: 'banana',
		imageCredit: 'random'
	}}
}


const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		receiveProducts( state, action: PayloadAction<Product[]>){
			// received [] ==> to transform in {}
			const products = action.payload;
			products.forEach( product => {
				state.products[product.id] = product
			})
		}
	}
})



export const { receiveProducts } = productSlice.actions
export default productSlice.reducer