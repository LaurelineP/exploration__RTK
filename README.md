## Redux Shopping Cart

Example shopping cart application for learning redux and redux toolkit. Goes along with the egghead course [Modern Redux with Redux Toolkit (RTK) and TypeScript](https://app.egghead.io/playlists/modern-redux-with-redux-toolkit-rtk-and-typescript-64f243c8).

## Setup
Checkout the code base and then type:

```bash
npm install
npm run dev
```

## Lessons
The `lessons/` folder contains a unique folder for each lesson including a README with a description of that lesson and any files that were modified as part of that lesson.

The final state of the application can also be found in the `final` branch.

## Technologies
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)

______

# 1. Add redux and redux toolkit ( rtk )
1. `npm install react-redux @reduxjs/toolkit`
2. add in app/ a `store.ts`: to setup redux store
```ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {}
})
```
## HOW REDUX WORKS
- 0. store contains a reducer: this is the single immutable source of truth for the global state of our application 

- 1. ( store ) to which x component(s) subscribe ( get data from, when the store has updated ) using a `selector`
Any time that piece of data has changed it will **re-render** to the component

- 2. When a component needs to change a value to the store, it is not possible to do it directly against the store; instead it requires to `dispatch an action`

- 3. An `action` is a set of data specifying the `type` of data to update and a `payload` ( the data to process ).
This describe an event that occurred

- 4. When the `dispatch` of the `action` has been made, the redux store receives it: it will make it pass through the `reducers` to be taken into account and proceeded

- 5. The `redux store` process will create a new global state each time it proceed to an update: taking the current `global state` ( called store )  and the `action` to finally return a **new** `global state`

- 6. After the new global state being created: this will automatically update the components that subscribed to a piece of the state with the new value of the data


## MANAGING DATA EFFECTIVELY BY SPLITTING REDUX STORE IN MULTIPLE SLICES
Slices are result of the new concept from redux toolkit
- a way to keep data organized

A single Slice file :
- export a reducer
- actions or selectors associated to that data

### Implementing Slices [ for cart and shop ]
Cart slice:
- create a new file `cartSlice.ts`
```ts
import { createSlice } from '@reduxjs/toolkit'

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
	reducers: {}
})

// Export the reducer to connect it to the store configuration
export default cartSlice.reducer;

```

In redux, a `function reducer` processes `actions` passed into the Redux and potentially returns an **updated** version of the state

When splitting the reducer into slices, each slice gets its own reducer that handles updates for that part of the data

ProductSlice: 
- Add a new file `productSlice.ts` and apply what we've been doing before with cart slice but importing the interface Product from `app/api`/


Store:
- into the store.reducer add cart reducer
- into the store.reducer add products reducer
```ts
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
```

## ROOTSTATE TYPE AND TYPED KOOKS FOR TYPE-AWARE REDUX INTERACTIONS
In `app/stores/ts`:
```ts
// Create a root state type and typed hooks for Type Aware redux interactions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
- `ReturnType` is a redux utility that will allow one to transform the type definition of a function into its return type: this will perfectly matches all the data in the redux stored
- The dispatch will be used later while typing
the method to dispatch  actions ( action creators )

### TYPE HOOKS
In app/ create a file `hooks.ts`:
```ts
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";

// Hooks defined to use the redux hooks but typed aware of the reducer
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## ACCESS REDUX DATA WITH USEAPPSELECTOR
In Product component
- import `useAppSelector` to select the state ( with its types )
- get the products state in order to consume the redux.products instead of the local state of the component


## CREATE A REDUCER WITH REDUX RTK + DISPATCH AN ACTION TO IT
In productsSlice:
- add a method to `productsSlice.reducers` (ex: `receiveProducts`)
```ts
// ...
reducers: {
	receiveProducts( state, action: payloadAction<Product[]> ){
		const { payload : products } = action
		// Receiving an array --> storing as object

		products.forEach(( product )=> {
			state.products[product.id]: product
		})

	}
}
...
```
- redux toolkit would **generate automatically an action creators** from  each **reducers methods**

In Product:
- import `receiveProducts` action creator to be used with the dispatch
- import `useAppDispatch` to consume the `dispatch` outputted by the hook execution
- replace the useEffect loading products to local component state by this updating redux instead

## ADD ONE PRODUCT TO THE CART
- In cartSlice: add a reducers method `addToCart`
- In Product assign a function to the button add dispatching the action creator `addToCart`



## USE CREATESELECTOR TO BUILD A MEMOIZED SELECTOR
In cartSlice.ts
- Observing a "calling numItems" being called multiple time
	- make sens within the product page and we add new items
	- does not when going back and forth between home and products when items did not changed

## COMBINING DATA FROM SLICES
Updating UI with dynamic values from redux
```ts
// hooks in slice file
export const getX = createSelector(
  (state: RootState) => state.x.object,
  (state: RootState) => state.x.object,
  () => {
    ... process to compute value using both state
    return result
   }
)

///////
// in component: consumming the selector function
import { getX } from 'PATH'

// useAppSelector being a useSelector refering to state types
const valueToDisplay = useAppSelector( getX )

```

## UPDATING SLICE WITH DELETE ACTION
- set new action creator
- dispatching the action creator in component with correct payload

