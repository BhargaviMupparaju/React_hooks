import React, { useState, useReducer, useEffect, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid: action.val.includes("@"),
		};
	}

	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.includes("@"), // Here the value should be the last snapshot value. Because we dont want to reset the value entered by user eventhough in blur.
		};
	}
	return {
		value: "",
		isValid: false,
	};
};

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
		};
	}

	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.trim().length > 6, // Here the value should be the last snapshot value. Because we dont want to reset the value entered by user eventhough in blur.
		};
	}
	return {
		value: "",
		isValid: false,
	};
};
const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [emailIsValid, setEmailIsValid] = useState();

	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null }); // Here we considered the initial value as null instead of false. Because the the text box will become blur after loading for the first time.

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: null });

	const { isValid: emailIsValid } = emailState; // Here the object destructuring is done for only specific property(isValid) .
	//To avoid passing the entire object we used it. Because if only one property update in the object there is no need to pass entire object everytime in the dependency of useEffect.
	const { isValid: passwordIsValid } = passwordState; // Here we create an alias passwordIsValid . the array destructured and the isValid is assign to passwordIsValid.
	// The above destructuring is used for useEffect. Here we can useEffect again to avoid the below scenario
	// Here the password validation is checking after adding more than 6 characters which is unnecessary. to avoid that validation we can use useEffect

	const authctx = useContext(AuthContext);
	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("checking form validity");

			setFormIsValid(emailIsValid && passwordIsValid); // here the sideeffect function will wait for timer 500 ms and will execute after 500 ms
		}, 500);

		return () => {
			console.log("In clean up");
			clearTimeout(identifier); //
		}; // cleanup function . this clean up function helps to clear the last set up timer  before it set ups the new one.
		//check the console log statements in the developer tools.
	}, [emailIsValid, passwordIsValid]); // Here the dependencies are added to check the form validation for every entered keystroke of entered email and password
	//
	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });
		setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" }); // Here in blur we wont have any data so there is no need to send the value.
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });
		setFormIsValid(passwordState.isValid && emailState.isValid);
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		authctx.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""}`}>
					<label htmlFor="email">E-Mail</label>
					<input type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
				</div>
				<div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ""}`}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
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
