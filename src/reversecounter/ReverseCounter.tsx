import React, { useEffect, useState } from 'react'

const ReverseCounter = () => {
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 15) + 5);

    useEffect(() => {
       const timer = setTimeout(() => {
            if (randomNumber <= 0) return;
            setRandomNumber(count => count - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [randomNumber])

  return (
    <section>
        <p>{randomNumber}</p>

    </section>
  )
}

export default ReverseCounter