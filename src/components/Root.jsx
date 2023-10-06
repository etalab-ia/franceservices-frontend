import { Header } from "@codegouvfr/react-dsfr/Header";
import { Chatbot } from "../pages/Chatbot";
import { Routes, Route, Navigate } from "react-router-dom";
import { navFunc } from "../constants/router";
import { Home } from "../pages/Home";
import { reducer } from '../utils/reducer';
import { useReducer } from 'react';
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { ResetPassword } from "../pages/ResetPassword";
import { initialState } from "../constants/state";
import { quickAccessItemsFunc } from "../constants/headerProps";
import { useEffect } from "react";
import { checkConnexion } from "../utils/localStorage";

export const Root = () => {

	const	navigationData = navFunc();
	const	[state, dispatch] = useReducer(reducer, initialState);
	
	useEffect(() => { checkConnexion(dispatch) }, [dispatch]);

	console.log('ici: ', state.isLogin)

	return <div className="h-screen">
		<Header className="header-container"
			brandTop={<>INTITULE<br />OFFICIEL</>}
			serviceTitle="Miaou"
			serviceTagline="Le module d'Intelligence Artificielle Orienté Usager"
			homeLinkProps={{ "to": "/login" }}
			navigation={state.isLogin ? navigationData : null}
			quickAccessItems={ state.isLogin ? quickAccessItemsFunc(state, dispatch) : [] }
		/>
		<Routes>
			<Route path="/login" element={!state.isLogin ? <Login state={state} dispatch={dispatch}/> : <Navigate to="/" />}/>
			<Route path="/" element={!state.isLogin ? <Navigate to="/login" /> : <Home />}/>
			<Route path="/chat" element={!state.isLogin ? <Navigate to="/login" /> : <Chatbot state={state} dispatch={dispatch}/>}/>
			<Route path="/signup" element={<Signup state={state} dispatch={dispatch} />} />
			<Route path="/reset-password" element={<ResetPassword state={state} dispatch={dispatch}/>} />
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
  	</div>
}