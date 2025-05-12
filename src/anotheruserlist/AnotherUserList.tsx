import { useEffect, useState } from "react";

const DATA_API = "data/userdata.json";

interface UserList {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  city: string;
  country: string;
  zipcode: string;
  birthdate: string;
}

const AnotherUserList = () => {
  const [users, setUsers] = useState<UserList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [searhvalue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(DATA_API);
        const data: UserList[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("fel vid hämtning av users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  });

  const filteredUsers = users.filter(
    (users) =>
      users.name.toLowerCase().includes(searhvalue.toLowerCase()) ||
      users.city.toLowerCase().includes(searhvalue.toLowerCase()) ||
      users.country.toLowerCase().includes(searhvalue.toLowerCase())
  );

  if (isLoading) return <div>Laddar Användare...</div>;

  return (
    <section className="flex flex-col justify-center items-center py-4">
      <h1 className="text-2xl text-blue-900 font-bold">
        Användare i "Databasen"
      </h1>

      <input
        className="text-center px-4 py-1 mt-8 mb-8"
        type="text"
        placeholder="Search for a user.."
        value={searhvalue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {filteredUsers.map((user) => (
          <div className="border bg-gray-100 grid grid-cols-2" key={user.id}>
            <div className="py-2 px-6">
              <h2>Name: {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
              <p>Phone: {user.phone}</p>
              <p>Birthdate: {user.birthdate}</p>
            </div>

            <div className="py-2 px-8">
              <p>Country: {user.country}</p>
              <p>City: {user.city}</p>
              <p>Address: {user.address}</p>
              <p>Zipcode: {user.zipcode}</p>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default AnotherUserList;
