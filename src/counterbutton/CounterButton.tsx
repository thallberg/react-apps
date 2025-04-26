import React, { useEffect, useState } from 'react'

const CounterButton = () => {
    const [count, setCount] = useState<number>(0);


    const handleIncrease = () => {
        setCount(prev => prev + 1)
    }

    const handleDecrease = () => {
        if (count <= 0) return;
        setCount(prev => prev - 1)
    }

    useEffect(() => {
        
            console.log(`{Öka knappen klickats, nytt värde: ${count}}`);
        
        
    }, [count])
 

  return (
    <section>
        <p>Antal Klick: {count}</p>

        <button onClick={handleIncrease}>
            Öka + 1
        </button>

        <button onClick={handleDecrease}>
            minska - 1
        </button>

    </section>
  )
}

export default CounterButton