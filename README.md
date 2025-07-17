##  Installation

**npm install @reduxjs/toolkit react-redux**

# Redux Store SetUp

## 1. Create a Redux store with configureStore

- configureStore accepts a reducer function as a named argument
- configureStore automatically sets up the store with good default settings
```ts
import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from './features/counter/CounterSlice'

export const store= configureStore({
    reducer: {counter: counterSliceReducer}
})
```

## 2. Provide the Redux store to the React application components

- Put a React-Redux <Provider> component around your <App />
- Pass the Redux store as <Provider store={store}>

```ts
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

## 3. Create a Redux "slice" reducer with createSlice

- Call `createSlice` with a string name, an initial state, and named reducer functions
- Reducer functions may "mutate" the state using Immer
- Export the generated slice reducer and action creators

```ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0 }
const counterSlice = createSlice(
    {
        name: "counter",
        initialState,
        reducers: {
            increment: (state) => { state.count += 1 },
            decrement: (state) => { state.count -= 1 },
            reset: (state) => { state.count = 0 },
            incrementByAmount: (state, action) => { state.count = state.count + action.payload },
            decrementByAmount: (state, action) => { state.count = state.count - action.payload }
        }

    })
export const { increment, decrement, reset, incrementByAmount, decrementByAmount } = counterSlice.actions;

export default counterSlice.reducer
```

## 4. Use the React-Redux useSelector/useDispatch hooks in React components

- Read data from the store with the useSelector hook
- Get the dispatch function with the useDispatch hook, and dispatch actions as needed

```ts
const count= useSelector((state)=>{state.counter.count});
const dispatch=useDispatch();
```
## 5. Connecting to UI

```ts
<button className='btn' onClick={() => dispatch(decrement())}>Decrement</button>
<button className='btn' onClick={() => dispatch(decrementByAmount(3))}>Decrement by 3</button>
```

## 6. For Typesafety

```ts

// Infer the `RootState` and `AppDispatch` types from the store itself in store.ts
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//Custom hooks
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch=useDispatch.withTypes<AppDispatch>()
export const useAppSelector=useSelector.withTypes<RootState>()
```

## Redux Async Thunk
# state based on fetched data

- extraReducers instead of reducer. 
- extraReducer is a function with takes (builder) as parameter
- data fetched by `createAsyncThunk` function
- `createAsyncThunk` accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise

```js
//convention to name action type with sliceName/operation ie- posts/fetchPosts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const posts = await getPosts()
    return posts
})
```

- state will reflect loading and error situation

```ts
const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    error: ''
}
```
- while calling from component it needs to be dispatched with thunk function

```js
    const dispatch = useDispatch()
    const { posts, isLoading, isError, error } = useSelector((state) => state.posts);
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
```

- complete code for using redux async thunk


```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPosts } from "./postApi"


const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    error: ''
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const posts = await getPosts()
    return posts
})

const PostsSlice = createSlice(
    {
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isError = false
            state.isLoading = true
        })

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.posts = action.payload
        })

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error?.message
        })
    },
   
}
)


export default PostsSlice.reducer
```