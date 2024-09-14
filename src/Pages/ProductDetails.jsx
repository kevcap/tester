import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Countly from 'countly-sdk-web';

const destinations = [
	{
		slug: 'paris',
		name: 'Paris',
		category: 'City',
		info: 'The capital of France, known for the Eiffel Tower and art museums.',
		highlights: 'Eiffel Tower, Louvre Museum, Notre-Dame Cathedral',
		description: 'Paris is one of the most popular tourist destinations in the world, known for its rich history, architecture, and cultural attractions.',
		image: {
			url: 'https://media.staticontent.com/media/pictures/74db46af-0e25-46c5-acea-a439c4e0098e',
		},
	},
	{
		slug: 'kyoto',
		name: 'Kyoto',
		category: 'City',
		info: 'A city in Japan known for its classical Buddhist temples and gardens.',
		highlights: 'Fushimi Inari-taisha, Kinkaku-ji, Arashiyama Bamboo Grove',
		description: 'Kyoto offers a glimpse into traditional Japan with its temples, gardens, and festivals that are a must-see for visitors.',
		image: {
			url: 'https://media.staticontent.com/media/pictures/0ddfd733-9dbd-4bfb-b4fc-efc4b5a24f90',
		},
	},
	{
		slug: 'cape-town',
		name: 'Cape Town',
		category: 'City',
		info: 'A port city on South Africa’s southwest coast, on a peninsula beneath the imposing Table Mountain.',
		highlights: 'Table Mountain, Cape of Good Hope, Robben Island',
		description: 'Cape Town is known for its harbor, natural setting in the Cape Floristic Region, and landmarks such as Table Mountain and Cape Point.',
		image: {
			url: 'https://media.staticontent.com/media/pictures/5f85570d-de52-47c4-bb96-878300289f3e',
		},
	},
	{
		slug: 'istanbul',
		name: 'Istanbul',
		category: 'City',
		info: 'The largest city in Turkey, known for its historical sites and vibrant culture.',
		highlights: 'Hagia Sophia, Blue Mosque, Topkapi Palace',
		description: 'Istanbul is a transcontinental city rich in history, blending influences from both Europe and Asia.',
		image: {
			url: 'https://media.staticontent.com/media/pictures/510d45c8-fcd4-488e-a5f6-48997dcc5e16',
		},
	},
	{
		slug: 'ankara',
		name: 'Ankara',
		category: 'City',
		info: 'The capital of Turkey, known for its modern architecture and cultural institutions.',
		highlights: 'Anıtkabir, Museum of Anatolian Civilizations, Atakule Tower',
		description: 'Ankara is the political and cultural heart of Turkey, offering a mix of ancient and modern attractions.',
		image: {
			url: 'https://xq-static-dev.newshore.es/media/sutdyzix/ankara-overview-991x731.jpg',
		},
	},
	{
		slug: 'izmir',
		name: 'Izmir',
		category: 'City',
		info: 'A city on Turkey’s Aegean coast, known for its beautiful waterfront and historical sites.',
		highlights: 'Kemeralti Market, Konak Square, Kadifekale',
		description: 'Izmir is a vibrant city with a rich history, offering a blend of modern life and ancient ruins.',
		image: {
			url: 'https://xq-static-dev.newshore.es/media/tzahda0b/izmir_-overview-991x731.jpg',
		},
	},
	{
		slug: 'antalya',
		name: 'Antalya',
		category: 'City',
		info: 'A resort city on the Turkish Riviera, known for its stunning beaches and ancient ruins.',
		highlights: 'Old Town Kaleiçi, Düden Waterfalls, Antalya Museum',
		description: 'Antalya is a popular tourist destination with beautiful beaches, ancient sites, and a lively atmosphere.',
		image: {
			url: 'https://xq-static-dev.newshore.es/media/114mzvto/antalya-overview-991x731.jpg',
		},
	},
	{
		slug: 'bursa',
		name: 'Bursa',
		category: 'City',
		info: 'A city in northwestern Turkey, known for its Ottoman architecture and thermal baths.',
		highlights: 'Uludağ National Park, Green Mosque, Grand Mosque',
		description: 'Bursa is a historic city with beautiful mosques, traditional markets, and proximity to ski resorts.',
		image: {
			url: 'https://visitturkey.in/wp-content/uploads/2024/07/discovering-bursa-the-green-gem-of-turkey.webp',
		},
	},
	{
		slug: 'trabzon',
		name: 'Trabzon',
		category: 'City',
		info: 'A city on the Black Sea coast, known for its natural beauty and historical significance.',
		highlights: 'Sumela Monastery, Hagia Sophia Museum, Uzungöl Lake',
		description: 'Trabzon is a scenic city with a rich history and stunning natural landscapes, offering a peaceful retreat from city life.',
		image: {
			url: 'https://xq-static-dev.newshore.es/media/p0cexbix/sxs_trabzon_-overview-991x731.jpg',
		},
	},
	// Add more destinations as needed
];
const ProductDetails = () => {
	const [product, setProduct] = useState({});
	const [showPopup, setShowPopup] = useState(false); // Estado para o popup
	const navigate = useNavigate();
	const { slug } = useParams();

	useEffect(() => {
		const fetchProduct = () => {
			const destination = destinations.find((d) => d.slug === slug);
			if (destination) {
				setProduct(destination);
			}
		};

		fetchProduct();
	}, [slug]);

	const handlePurchaseFlight = () => {
		// Enviar evento para o Countly
		Countly.q.push(['add_event', {
			key: 'flight_purchase',
			segmentation: {
				product_name: product.name,
				category: product.category,
				price: 1000,  // Valor de exemplo, pode ser ajustado dinamicamente
			}
		}]);

		// Exibir o popup
		setShowPopup(true);

		// Após 5 segundos, redirecionar para a página de produtos
		setTimeout(() => {
			navigate('/products');
		}, 5000);
	};

	return (
		<div className="container">
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
			<div>
				<div className="title">
					<h1>{product.name}</h1>
				</div>
				<div className="flex-container">
					{product.image && (
						<img src={product.image.url} alt="" className="destination-img" />
					)}
					<div className="destination-infos">
						<div className="row">
							<h3 className="label">Name: </h3>
							<p className="text">{product.name}</p>
						</div>
						<div className="row">
							<h3 className="label">Category: </h3>
							<p className="text">{product.category}</p>
						</div>
						<div className="row">
							<h3 className="label">Info: </h3>
							<p className="text">{product.info}</p>
						</div>
						<div className="row">
							<h3 className="label">Highlights: </h3>
							<p className="text">{product.highlights}</p>
						</div>
						<div className="row">
							<h3 className="label">Description: </h3>
							<p className="text">{product.description}</p>
						</div>
						<div className="purchase-container" style={{ marginTop: '20px' }}>
							<button className="btn purchase-btn" onClick={handlePurchaseFlight}>
								Purchase this flight
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Popup de confirmação de compra */}
			{showPopup && (
				<div className="popup-p">
					<p>Thank you for purchasing the flight to {product.name}!</p>
					<p>Redirecting to products page...</p>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;