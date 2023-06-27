import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState("");
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("checking form validity");

			setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6); // here the sideeffect function will wait for timer 500 ms and will execute after 500 ms
		}, 500);

		return () => {
			console.log("In clean up");
			clearTimeout(identifier); //
		}; // cleanup function . this clean up function helps to clear the last set up timer  before it set ups the new one.
		// check the console log statements in the developer tools.
	}, [enteredEmail, enteredPassword]); // Here the dependencies are added to check the form validation for every entered keystroke of entered email and password

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes("@"));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ""}`}>
					<label htmlFor="email">E-Mail</label>
					<input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
				</div>
				<div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ""}`}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
