import React, { useState } from 'react'
import '../App.css'
import { downloadUsers } from './downloadUsers'
import type { User } from '../types/User'


const FetchUsers = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)

	const handleUserLoad = async () => {
		setLoading(true)
		try {
			const userData = await downloadUsers()
			setUsers(userData)
		} catch (error) {
			console.error('Error in handleLoadUsers:', error)
		} finally {
			setLoading(false)
		}
	}

	return(
		<React.Fragment>
			<div style={{ margin: '20px 0' }}>
    		  <button
    		    onClick={handleUserLoad}
    		    disabled={loading}
    		  >
    		    {loading ? 'Loading...' : 'Load Users'}
    		  </button>
    		</div>

    		{users.length > 0 && (
    		  <div style={{ marginTop: '20px' }}>
    		    <h2>Users Table</h2>
    		    <table style={{
    		      width: '100%',
    		      borderCollapse: 'collapse',
    		      marginTop: '10px'
    		    }}>
    		      <thead>
    		        <tr style={{ backgroundColor: '#6161ff' }}>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>Username</th>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>City</th>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>Phone</th>
    		          <th style={{ padding: '12px', border: '1px solid #ddd' }}>Company</th>
    		        </tr>
    		      </thead>
    		      <tbody>
    		        {users.map(user => (
    		          <tr key={user.id}>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.id}</td>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.name}</td>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.username}</td>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.address.city}</td>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.phone}</td>
    		            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.company.name}</td>
    		          </tr>
    		        ))}
    		      </tbody>
    		    </table>
    		  </div>
    		)}
		</React.Fragment>
	)
}

export default FetchUsers
