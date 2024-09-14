import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Countly from 'countly-sdk-web';


const NavBar = ({ userEmail, setUserEmail }) => {
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();

	// Function to handle logout
	const handleLogout = () => {

		Countly.q.push(['end_session']);

		setUserEmail('');  // Clear the userEmail when logging out
		setShowPopup(false); // Close the popup
		navigate('/'); // Redirect to home page
	};

	return (
		<div>
			<nav>
				<div className="nav-items container">
					<div className="logo">
						<a href="/">
							<h1>Travel better</h1>
						</a>
					</div>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
						<li>
							<NavLink to="/products">Destinations</NavLink>
						</li>
					</ul>
					{/* Conditionally render the logout button only if userEmail is set */}
					{userEmail && (
						<div className="logout-container">
							<button className="logout-btn" onClick={() => setShowPopup(true)}>
								Logout
							</button>
						</div>
					)}
				</div>
			</nav>

			{/* Popup for logout confirmation */}
			{showPopup && (
				<div className="popup-overlay">
					<div className="popup">
						<p>Hi, {userEmail}, would you like to logout?</p>
						<div className="popup-buttons">
							<button className="popup-btn yes-btn" onClick={handleLogout}>
								Yes
							</button>
							<button className="popup-btn no-btn" onClick={() => setShowPopup(false)}>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavBar;
