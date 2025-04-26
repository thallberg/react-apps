import { useState } from 'react'

const DarkMode = () => {
    const [darkmode, setDarkMode] = useState<boolean>(false);

    const handleToogle = () => {

        setDarkMode(!darkmode)

        if(!darkmode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }

  return (
    <button 
    onClick={handleToogle}
    className='px-6 py-2 bg-cyan-900 text-white rounded-2xl'>
        { darkmode ? 'LightMode' : 'DarkMode'}
    </button>
  )
}

export default DarkMode