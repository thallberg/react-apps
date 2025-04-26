import { useEffect, useState } from 'react'

const TimerTwo = () => {
    const [count, setCount] = useState<number>(0);
    const [targetTime, setTargetTime] = useState<number>(0);

    useEffect(() => {

        if (count <= 0) return;

     const timer = setInterval(() => {
        setCount(prev => {
            if (prev <= 1) {
                clearInterval(timer);
                return 0;
            }
            return prev - 1
        })
     }, 1000)

     return () => clearInterval(timer)
      
    }, [count])

  return (
    <section className='flex flex-col justify-center items-center'>
        <p className='p-2'>Tid Kvar: <span className='text-red-800'>{count}</span></p>
        <input 
        className='border-1 rounded-2xl w-25 py-1 px-2'
        type="number"
        value={targetTime}
        onChange={(e) => setTargetTime(Number(e.target.value))}

        />
        <button
        className='px-4 py-2 bg-blue-700 mt-2 rounded-2xl text-white' 
        onClick={() => setCount(targetTime)}>Starta Timern</button>

    </section>
  )
}

export default TimerTwo