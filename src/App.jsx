import './App.css'
import { decrement, decrementByAmount, increment, incrementByAmount, reset } from './redux/features/counter/CounterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';

function App() {
  const count = useAppSelector((state) => state.counter.count);
  //useSelector with type from hook
  const dispatch = useAppDispatch();
//useDispatch with type from hook
  console.log("count: ", count)

  return (
    <>
      <div className='flex flex-col gap-10 justify-between items-center'>
        <div className='flex gap-10'>
          <button className='btn' onClick={() => dispatch(decrement())}>Decrement</button>
          <button className='btn' onClick={() => dispatch(decrementByAmount(3))}>Decrement by 3</button>
        </div>
        <h4 className='btn btn-primary'>Count : {count}</h4>
        <button className='btn btn-secondary' onClick={()=>dispatch(reset())}>Reset</button>
        <div className='flex gap-10'>
          <button className='btn' onClick={() => dispatch(increment())}>Incremet</button>
          <button className='btn' onClick={() => dispatch(incrementByAmount(3))}>Incremet by 3</button>

        </div>
      </div>
    </>
  )
}

export default App
