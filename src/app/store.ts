import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'

// Merges all reducers into one
export const store = configureStore({
	reducer: {
		cart: cartReducer,
		products: productsReducer,
	}
}) 

// Create a root state type and typed hooks for Type Aware redux interactions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;