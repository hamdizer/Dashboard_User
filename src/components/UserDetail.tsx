import React from 'react';
import { User } from '../types/user';

interface UserDetailProps {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const UserDetail = (props:UserDetailProps) => {
  if (props.loading) return <p className="p-4">Loading...</p>;
  if (props.error) return <p className="p-4 text-red-500">{props.error}</p>;
  if (!props.user) return <p className="p-4">Select a user to see details</p>;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">{props.user.name}</h2>
      <p><strong>Username:</strong> {props.user.username}</p>
      <p><strong>Email:</strong> {props.user.email}</p>
      <p><strong>Address:</strong> {props.user.address.street}, {props.user.address.city}</p>
      <p><strong>Phone:</strong> {props.user.phone}</p>
      <p><strong>Website:</strong> <a href={`https://${props.user.website}`} className="text-blue-500">{props.user.website}</a></p>
      <p><strong>Company:</strong> {props.user.company.name}</p>
    </div>
  );
};

export default UserDetail;
