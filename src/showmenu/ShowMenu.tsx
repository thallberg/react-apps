import { useState } from "react";
import personArray from '../data/Country.json'

interface Country {
    name: string;
    population: number;
    language: string;
    code: string;
    subregion: string;
    Currency: string;
}

const ShowMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="flex flex-col justify-center items-center m-auto">
      <button
        className="py-2 px-6 bg-amber-800 rounded-2xl text-white"
        onClick={handleOpen}
      >
        { isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      
        {isOpen && (
          <table className="bg-gray-200 mt-6 text-black rounded-2xl shadow-lg">
            <thead>
                <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Population</th>
                    <th className="py-2 px-4 text-left">Language</th>
                    <th className="py-2 px-4 text-left">Code</th>
                    <th className="py-2 px-4 text-left">Subregion</th>
                    <th className="py-2 px-4 text-left">Currency</th>
                </tr>
            </thead>
            <tbody>
                {personArray.map((country: Country, id) => (
                    <tr
                    className="hover:bg-gray-300" 
                    key={id}>
                        <td className="py-2 px-4 text-left">{country.name}</td>
                        <td className="py-2 px-4 text-left">{country.population}</td>
                        <td className="py-2 px-4 text-left">{country.language}</td>
                        <td className="py-2 px-4 text-left">{country.code}</td>
                        <td className="py-2 px-4 text-left">{country.subregion}</td>
                        <td className="py-2 px-4 text-left">{country.Currency}</td>
                    </tr>
                ))}
            </tbody>
        
          </table>
        )}
      
    </section>
  );
};

export default ShowMenu;