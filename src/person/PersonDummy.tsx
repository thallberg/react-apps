import { useEffect, useState } from "react";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  email: string;
  phone: string;
  birthDate: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: number;
  };
}

const PersonDummy = () => {
  const [person, setPerson] = useState<Person[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setPerson(data.users));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Person Info From DummyJson
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {person.map((person) => (
          <div
            key={person.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-cyan-800">
              {person.firstName} {person.lastName}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Age:</strong> {person.age}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Email:</strong> {person.email}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Phone:</strong> {person.phone}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Birth Date:</strong> {person.birthDate}
            </p>

            <div className="mt-4">
              <p className="font-semibold text-gray-800">Address:</p>
              <p className="text-gray-600">{person.address.address}</p>
              <p className="text-gray-600">{person.address.city}</p>
              <p className="text-gray-600">{person.address.state}</p>
              <p className="text-gray-600">{person.address.country}</p>
              <p className="text-gray-600">{person.address.postalCode}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonDummy;
