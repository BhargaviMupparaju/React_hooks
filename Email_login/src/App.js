import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInfo = localStorage.getItem("isLoggedIn"); // if the isLoggedIn is 1 then if we try to refresh the browser the user will stay logged in.
		// the useEffect will only run once since the dependencies is empty [] . it will run only when the app restart
		if (storedUserLoggedInfo === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways

		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		localStorage.removeItem("isLoggedIn"); // After the logout we can remove the item
	};

	return (
		<React.Fragment>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</React.Fragment>
	);
}

export default App;
