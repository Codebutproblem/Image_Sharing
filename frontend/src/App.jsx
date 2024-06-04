import { useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";

function App() {
	console.log("component App rendered");
	const elements = useRoutes(routes);

	return <>{elements}</>;
}

export default App;
