import React, { useEffect, useState } from 'react'

const FETCH_URL = 'https://dummyjson.com/quotes/random'

interface Quote {
    id: number;
    quote: string;
    author: string;
}

const RandomQuote =  () => {
    const [quote, setQuote] = useState<Quote>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchQuote = async () => {
        setIsLoading(true)
        const res = await fetch(FETCH_URL)
        const data: Quote = await res.json()
        setQuote(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    

  return (
    <section className="flex flex-col items-center justify-center p-4 min-h-[300px]">
      {quote && (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-xl text-center space-y-4">
          <p className="text-xl italic text-gray-800">"{quote.quote}"</p>
          <p className="text-sm text-gray-600">– {quote.author}</p>
        </div>
      )}

      <button
        onClick={fetchQuote}
        disabled={isLoading}
        className="mt-6 px-8 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Laddar...' : 'Ny quote'}
      </button>
    </section>
  )
}

export default RandomQuote