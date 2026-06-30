import { useEffect, useState } from "react";
import { getUsers } from "../services/UsuarioService";
import type { User } from "../types/users";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nickName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;