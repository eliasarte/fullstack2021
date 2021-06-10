import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users.sort((a,b) => b.blogs.length - a.blogs.length) )
    )
  }, [])

  return (
    <>
    <h2>Users</h2>
    <table>
    <thead>
      <tr>
        <th></th>
        <th>Blogs created</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user=>(
        <tr key={user.id}>
          <td key={1}>{user.name}</td>
          <td key={2}>{user.blogs.length}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </>
  )
}

export default AllUsers