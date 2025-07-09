import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from './features/counter/CounterSlice'


export const store= configureStore({
    reducer: {counter: counterSliceReducer}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch