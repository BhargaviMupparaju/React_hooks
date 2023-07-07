import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogin: (email, password) => {},
	onLogout: () => {},
});

export const AuthContextProvider = (props) => {
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

	return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: { logoutHandler }, onLogin: { loginHandler } }}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
