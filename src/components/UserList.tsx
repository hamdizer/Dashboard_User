import React from 'react';
import { User } from '../types/user';

interface UserListProps {
  usersList: User[];
  handleSelectUser: (id: number) => void;
}

const UserList= (props:UserListProps) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul className="list-none space-y-2">
        {props.usersList.map((user) => (
          <li
            key={user.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => props.handleSelectUser(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
