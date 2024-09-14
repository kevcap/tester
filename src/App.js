import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Countly from 'countly-sdk-web';

const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Products = lazy(() => import('./Pages/Products'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const NoMatch = lazy(() => import('./Components/NoMatch'));

// Initialize Countly
Countly.init({
	app_key: 'f95921add68cd823c585fb344ff18edb16a09199',
	url: 'https://kevin.count.ly',
	debug: true,
	remote_config: true,
});

Countly.q.push(['enable_feedback', { popups: true }]);

const TrackPageView = () => {
	const location = useLocation();

	useEffect(() => {
		// Track page views when the route changes
		Countly.track_pageview(location.pathname);

		if (location.pathname === '/products/paris') {
			// Buscar widgets de feedback disponíveis
			Countly.q.push(['get_available_feedback_widgets', feedbackWidgetsCallback]);
		}
	}, [location]);

	return null;
};

// Callback function para lidar com os widgets de feedback
const feedbackWidgetsCallback = (countlyPresentableFeedback, err) => {
	if (err) {
		console.error("Failed to get feedback widgets", err);
		return;
	}

	// Procurar o widget específico pelo ID
	const widgetID = "66d1fd20d5c11999ddeafc08";
	const countlyFeedbackWidget = countlyPresentableFeedback.find(widget => widget._id === widgetID);

	if (!countlyFeedbackWidget) {
		console.error(`[Countly] No widget found with ID: ${widgetID}`);
		return;
	}

	// Definir o ID do elemento onde o widget será injetado (opcional)
	const selectorId = "surveyContainer"; // Altere para o ID do elemento alvo
	const selectorClass = undefined; // Altere para a classe do elemento alvo, se necessário

	// Exibir o widget para o usuário
	Countly.present_feedback_widget(countlyFeedbackWidget, selectorId, selectorClass);
};

const App = () => {
	const [backgroundColor, setBackgroundColor] = useState('black');
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		// Fetch the remote config value for background color
		Countly.fetch_remote_config(["background_color"], function (err, remoteConfigs) {
			if (err) {
				console.error("Failed to fetch remote config", err);
				return;
			}
			if (remoteConfigs && remoteConfigs.background_color) {
				setBackgroundColor(remoteConfigs.background_color);
				console.log("Setting background color to:", remoteConfigs.background_color);
			} else {
				console.warn("background_color not found in remote config");
			}
		});
	}, []);

	return (
		<div style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
			<NavBar userEmail={userEmail} setUserEmail={setUserEmail} />
			<TrackPageView />
			<Suspense fallback={<div className="container">Loading...</div>}>
				<Routes>
					<Route path="/" element={<Home setUserEmail={setUserEmail} />} />
					<Route path="/about" element={<About />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:slug" element={<ProductDetails />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;
