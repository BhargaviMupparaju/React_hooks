import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/store/auth-context";

function App() {
	const ctx = useContext(AuthContext);
	return (
		<React.Fragment>
			{/* Provider will help to share the props to its child components wrapped inside it  */}
			<MainHeader />
			{/* Here to avoid passing the logout handler for every component. we can just simply add onLogout in authcontext */}
			<main>
				{!ctx.isLoggedIn && <Login onLogin={loginHandler} />}
				{ctx.isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</React.Fragment>
	);
}

export default App;
