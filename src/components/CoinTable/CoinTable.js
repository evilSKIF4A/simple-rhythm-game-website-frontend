import React, { useState } from "react";
import instance from "../../axios";

export default function CoinTable() {
  const [users, setUsers] = useState([]);
  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await instance.get("/users");
        setUsers(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Монет</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.nickName}</td>
                <td>{user.coins}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
