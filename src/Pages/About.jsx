import { useNavigate } from 'react-router-dom';

const About = () => {
	const navigate = useNavigate();

	const containerStyle = {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '20px',
		fontFamily: 'Arial, sans-serif',
		color: '#333',
	};

	const titleStyle = {
		textAlign: 'center',
		marginBottom: '20px',
	};

	const aboutContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '20px',
	};

	const aboutTextStyle = {
		// textAlign: 'center',  
		lineHeight: '1.6',
		marginTop: '20px',
	};

	const aboutImgStyle = {
		maxWidth: '100%',
		height: 'auto',
		borderRadius: '10px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	};

	const btnStyle = {
		backgroundColor: '#007bff',
		color: '#fff',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '16px',
		marginTop: '20px',
	};

	const btnHoverStyle = {
		backgroundColor: '#0056b3',
	};

	return (
		<div style={containerStyle}>
			<button
				style={{ ...btnStyle }}
				onMouseOver={(e) => (e.currentTarget.style.backgroundColor = btnHoverStyle.backgroundColor)}
				onMouseOut={(e) => (e.currentTarget.style.backgroundColor = btnStyle.backgroundColor)}
				onClick={() => navigate(-1)}
			>
				Go Back
			</button>
			<div style={titleStyle}>
				<h1>About Us</h1>
			</div>
			<div style={aboutContainerStyle}>
				<img
					src="https://media.istockphoto.com/id/1028421714/photo/man-traveling-by-plane-and-listening-to-music.jpg?s=612x612&w=0&k=20&c=Rz_s4J2wuiAfVs8nJJpuxnwvtd6iNJuJBgH8-IGqWNw="
					alt="Beautiful Destination"
					style={aboutImgStyle}
				/>
				<div style={aboutTextStyle}>
					<p>
						Welcome to our travel destination website! We are passionate about
						exploring the world and sharing our experiences with you. Our
						mission is to help you discover the most amazing places on earth,
						whether you're looking for adventure, relaxation, or cultural
						exploration.
					</p>
					<br />
					<p>
						Our team of travel enthusiasts works hard to provide you with
						detailed guides, tips, and recommendations for your next trip. We
						believe that travel is not just about visiting new places, but also
						about experiencing new cultures, meeting new people, and creating
						memories that will last a lifetime.
					</p>
					<br />
					<p>
						Join us on this journey as we explore the world together. Let's make
						your next vacation the best one yet!
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
