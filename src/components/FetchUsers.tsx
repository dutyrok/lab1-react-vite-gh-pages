import React, { useState } from 'react'
import '../App.css'
import { downloadUsers } from './downloadUsers'
import type { User } from '../types/User'


const FetchUsers = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

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

	const filteredUsers = searchTerm.length >= 3
    ? users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users

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

				<div style={{ marginBottom: '20px' }}>
					<input
						type="text"
						placeholder="Поиск по email"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{
							padding: '10px',
							width: '300px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '16px'
						}}
						/>
						{searchTerm.length > 0 && searchTerm.length < 3 && (
						<div style={{
							color: '#666',
							fontSize: '14px',
							marginTop: '5px'
						}}>
							Введите 3 или более символов для поиска
						</div>
						)}
				</div>
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
					{filteredUsers.length > 0 ? (
						filteredUsers.map(user => (
						<tr key={user.id}>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.id}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.name}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.username}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.address.city}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.phone}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.company.name}</td>
						</tr>
						))
					) : searchTerm.length >= 3 ? (
						<tr>
						<td
							colSpan={7}
							style={{
								padding: '20px',
								textAlign: 'center',
								border: '1px solid #ddd'
							}}
						>
							Ничего не найдено
						</td>
						</tr>
					) : (
						users.map(user => (
						<tr key={user.id}>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.id}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.name}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.username}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.address.city}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.phone}</td>
							<td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.company.name}</td>
						</tr>
						))
					)}
				  </tbody>
    		    </table>
    		  </div>
    		)}
		</React.Fragment>
	)
}

export default FetchUsers
