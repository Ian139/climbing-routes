import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 20px;
		background-color: #1a1d23;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 4;
`;

const AuthBox = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 800px;
	width: 90%;
	padding: 5vh 0;
	background-color: rgba(40, 40, 50, 1);
	z-index: 5;
	border-radius: 3px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CredContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 20px;
	margin-left: 4px;
	margin-right: 4px;
	margin-top: 10px;
	padding: 0 12px;
	justify-content: center;
`;

const SubmitButton = styled.button`
	width: 30%;
	padding: 16px 16px;
	padding-right: 40px;
	font-size: 18px;
	font-weight: 400;
	border: none;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
	color: rgba(255, 255, 255, 0.5);
	margin: 0 auto;
	margin-left: 35%;

	&:focus {
		outline: none;
	}

	&:hover {
		color: rgba(50, 50, 50, 1);
		background-color: rgba(255, 255, 255, 0.5);
	}
`;

const CredInput = styled.input`
	width: 40%;
	margin: 0 1%;
	padding: 16px 16px;
	border: none;
	border-radius: 6px;
	font-size: 20px;
	background-color: rgba(255, 255, 255, 0.05);
	color: #fff;
	transition: all 0.4s ease;

	&::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const ErrorMessage = styled.p`
	color: #ff4444;
	text-align: center;
	margin-top: 10px;
	font-size: 14px;
`;

const ToggleAuthButton = styled.button`
	background: none;
	border: none;
	color: #4ee;
	cursor: pointer;
	text-decoration: underline;
	font-size: 16px;
	margin-top: 20px;
	display: block;
	margin: 10px auto;
	
	&:hover {
		color: #6ff;
	}
`;

function AuthPage() {
	const [mode, setMode] = useState("login");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		if (!username || !password) {
			setError("Please fill in all fields");
			return;
		}

		setError("");
		setIsLoading(true);

		// Simulate API call delay
		setTimeout(() => {
			if (mode === "register") {
				// Simple registration logic
				const users = JSON.parse(localStorage.getItem("users") || "{}");
				if (users[username]) {
					setError("Username already exists");
				} else {
					users[username] = { password };
					localStorage.setItem("users", JSON.stringify(users));
					localStorage.setItem("currentUser", username);
					window.location.reload();
				}
			} else {
				// Simple login logic
				const users = JSON.parse(localStorage.getItem("users") || "{}");
				if (users[username]?.password === password) {
					localStorage.setItem("currentUser", username);
					window.location.reload();
				} else {
					setError("Invalid credentials");
				}
			}
			setIsLoading(false);
		}, 1000); // Simulate network delay
	};

	return (
		<>
			<GlobalStyle />
			<Overlay />
			<AuthBox>
				<CredContainer>
					<CredInput
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						disabled={isLoading}
					/>
					<CredInput
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isLoading}
					/>
				</CredContainer>
				<SubmitButton onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? "Loading..." : mode === "login" ? "Log In" : "Register"}
				</SubmitButton>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<ToggleAuthButton onClick={() => setMode(mode === "login" ? "register" : "login")}>
					{mode === "login" ? "Need an account? Register" : "Already have an account? Log in"}
				</ToggleAuthButton>
			</AuthBox>
		</>
	);
}

export default AuthPage;
