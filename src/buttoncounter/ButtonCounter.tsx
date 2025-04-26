import React, { useEffect, useState } from 'react'

const ButtonCounter = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncreae = () => {
        setCount((prev) => prev + 1)
    }

    const handleDecreaase = () => {
        setCount((prev) => prev - 1)
    }

    useEffect(() => {
        console.log(`{${count}}`);
        
    }, [count])

  return (
    <section>
        <p>Antal Klick: {count}</p>
        <button onClick={handleIncreae}>Öka</button>
        <button onClick={handleDecreaase}>Minska</button>

    </section>
  )
}

export default ButtonCounter