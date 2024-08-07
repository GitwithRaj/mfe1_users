import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://test-api-1-zbvp.onrender.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get('https://test-api-1-zbvp.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreate = () => {
    axios.post('https://test-api-1-zbvp.onrender.com/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch(error => console.error(error));
  };

  const handleUpdate = () => {
    axios.put(`https://test-api-1-zbvp.onrender.com/users/${editUser.id}`, editUser)
      .then(response => {
        setUsers(users.map(user => (user.id === editUser.id ? response.data : user)));
        setEditUser(null);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`https://test-api-1-zbvp.onrender.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => setEditUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={editUser ? editUser.name : newUser.name}
        onChange={e => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={editUser ? editUser.email : newUser.email}
        onChange={e => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={editUser ? handleUpdate : handleCreate}>
        {editUser ? 'Update User' : 'Create User'}
      </button>
      <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </div>
    <a href='https://gitwithraj.github.io/mfe2_posts/'>Posts</a>
    </div>
  );
};

export default App;
