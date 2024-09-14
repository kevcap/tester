import { useState } from 'react';
import { Link } from 'react-router-dom';
import Countly from 'countly-sdk-web';

const Home = ({ userEmail, setUserEmail }) => {
	const [email, setEmail] = useState('');
	const [country, setCountry] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(false);

	// Function to validate email
	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	// Handle email input change
	const handleEmailChange = (e) => {
		const emailValue = e.target.value;
		setEmail(emailValue);
		setIsValidEmail(validateEmail(emailValue));
	};

	// Handle country dropdown change
	const handleCountryChange = (e) => {
		setCountry(e.target.value);
	};

	// Handle submission
	const handleSubmit = () => {
		if (isValidEmail || userEmail) {
			// Se userEmail já estiver definido, use-o; caso contrário, use o email do estado
			const finalEmail = userEmail || email;

			console.log('Email:', finalEmail);
			console.log('Country:', country);

			// Set the user email in the App component if not already set
			if (!userEmail) {
				setUserEmail(finalEmail);
			}

			// Set the Countly device ID to the user's email
			Countly.q.push(['change_id', finalEmail]);

			// Start the Countly session
			Countly.q.push(['begin_session']);
		}
	};

	return (
		<div className="container">
			<div className="banner-container">
				<div className="banner">
					<h2>Find the best destination</h2>

					{/* Conditionally render email and country inputs only if userEmail is not set */}
					{!userEmail && (
						<>
							{/* Email Input Field */}
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={handleEmailChange}
								className="email-input"
								style={{
									width: '30%',
									padding: '10px',
									marginBottom: '10px',
									borderRadius: '5px',
									border: '1px solid #ccc',
									fontSize: '16px',
								}}
							/>

							{/* Country Dropdown */}
							<select
								value={country}
								onChange={handleCountryChange}
								className="country-dropdown"
								style={{
									width: '30%',
									padding: '10px',
									marginBottom: '20px',
									borderRadius: '5px',
									border: '1px solid #ccc',
									fontSize: '16px',
									backgroundColor: '#fff',
								}}
							>
								<option value="">Select your country (optional)</option>
								<option value="US">United States</option>
								<option value="TR">Turkey</option>
								<option value="NO">Norway</option>
								<option value="BR">Brazil</option>
							</select>
						</>
					)}

					{/* Link to the next page; button is only clickable if email is valid or userEmail is present */}
					<Link to={userEmail || isValidEmail ? "/products" : "#"} onClick={handleSubmit}>
						<div className={`btn ${!userEmail && !isValidEmail ? 'disabled' : ''}`}>
							View Destinations
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
