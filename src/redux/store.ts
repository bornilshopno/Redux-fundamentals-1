import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from './features/counter/CounterSlice'
import postsSliceReducer from './features/posts/PostSlice'


export const store= configureStore({
    reducer: {
        counter: counterSliceReducer,
        posts: postsSliceReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch