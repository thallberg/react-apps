import { useEffect, useState } from "react";


interface User {
    id:  number;
    name: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("data/users.json")
                const data: User[] = await response.json()
                setUsers(data)
            } catch (error) {
                console.error("fel vid hämtning av användare,", error);
                
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [])

    const filteredUsers = users.filter((user) => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if(loading) {
        return <div>Laddar användare...</div>
    }

  return (
    <section className="flex flex-col justify-center items-center py-4">
        <input
        className="border-1 px-4 rounded-2xl"
         type="text" 
         placeholder="Sök användare.."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         />

         <ul className="p-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.map((user) => (
                <li 
                className="border-1 p-4 rounded-lg bg-gray-200"
                key={user.id}>
                    <p className="text-2xl font-bold">{user.name}</p>
                    <p className="text-lg">{user.email}</p>
                </li>
            ))}

         </ul>

    </section>
  )
}

export default UserList