import React, { useState, useMemo } from 'react';
import UserList from './UserList';
import UserDetail from './UserDetail';
import useFetchUser from '../hooks/useFetchUsers';
import { User } from '../types/user';

const UserDashboard= () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { user, loading, error } = useFetchUser(selectedUserId);

  const [users, setUsers] = useState<User[]>([]);
  const getListUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS_API}`);
      const usersData: User[] = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useMemo(() => {
    getListUsers();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      <UserList usersList={users} handleSelectUser={setSelectedUserId} />
      <UserDetail user={user} loading={loading} error={error} />
    </div>
  );
};

export default UserDashboard;
