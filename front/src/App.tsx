import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';

import './App.css';

const App: React.FC = () => {
	const [count, setCount] = useState(0);
	const [username, setUsername] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.post('http://localhost:5000/auth/login', {
					email: 'sannier.renaud@gmail.com',
					password: 'testtest',
				});
				console.log(response);
				setUsername(response.data.data.username);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		fetchUser();
	}, []);

	return (
		<>
			<div>
				<p>Bonjour {username}</p>
			</div>
		</>
	);
};

export default App;
