import React from 'react'
import PersonData from "../data/Person.json"



const PersonInfo = () => {
  return (
    <section>
        <h1>Personal Info</h1>

        <div className='flex flex-row flex-wrap gap-8 bg-cyan-600'>
            {PersonData.map((person) => (
                <li key={person.id}>
                    <p>{person.name}</p>
                    <p>{person.age}</p>
                    <p>{person.email}</p>
                    <p>{person.phone}</p>
                </li>
           ) )}
        </div>

    </section>
  )
}

export default PersonInfo