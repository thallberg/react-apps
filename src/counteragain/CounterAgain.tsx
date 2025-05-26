import { useEffect, useState } from 'react'


const CounterAgain = () => {
    const [count, setCount] = useState<number>(0);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleIncrease = () => {
        setCount(prev => prev + 1);

    }

    const handleDeacrese = () => {
        setCount(prev => prev - 1);
    }

    const handleReset = () => {
        setCount(0);
    }

    useEffect(() => {
        const localStorageCount = localStorage.getItem('count');
        if (localStorageCount !== null) {
            setCount(Number(localStorageCount));
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('count', String(count));
            console.log("Saving to localStorage:", count);
        }
    }, [count, hasLoaded]);


    return (
        <div>
            <h1>Counter</h1>
            <span>{count}</span>

            <div>
                <button onClick={handleIncrease}>Increase</button>
                <button onClick={handleDeacrese}>Deacrese</button>
            </div>
            <div>
                <button onClick={handleReset}>Reset</button>
            </div>

        </div>
    )
}

export default CounterAgain