import { Header } from "@codegouvfr/react-dsfr/Header";
import { Chatbot } from "../pages/Chatbot";
import { Routes, Route, Navigate } from "react-router-dom";
import { navFunc } from "../constants/router";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { ResetPassword } from "../pages/ResetPassword";
import { NewPassword } from "../pages/NewPassword";
import { quickAccessItemsFunc } from "../constants/header";
import { useEffect } from "react";
import { checkConnexion } from "../utils/localStorage";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Root = () => {
	const	navigationData = navFunc();
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	useEffect(() => { checkConnexion(dispatch); }, [dispatch]);

	return <div className="h-screen">
		<Header className="header-container"
			brandTop={<>INTITULE<br />OFFICIEL</>}
			serviceTitle="ALBERT"
			serviceTagline="Le module d'Intelligence Artificielle orienté usager"
			homeLinkProps={{ "to": "/login" }}
			navigation={auth.isLogin && navigationData}
			quickAccessItems={ auth.isLogin ? quickAccessItemsFunc(auth, dispatch) : [] }
		/>
		<Routes>
			<Route path="/login" element={!auth.isLogin ? <Login /> : <Navigate to="/chat" />}/>
			<Route path="/" element={!auth.isLogin ? <Navigate to="/login" /> : <Navigate to="/chat" />}/>
			<Route path="/chat" element={!auth.isLogin ? <Navigate to="/login" /> : <Chatbot />}/>
			<Route path="/signup" element={<Signup />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/new-password" element={<NewPassword />} />
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
  	</div>
}