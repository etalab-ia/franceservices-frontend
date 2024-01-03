import { Header } from "@codegouvfr/react-dsfr/Header";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
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
import { History } from "../pages/History";
import { Home } from "../pages/Home";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Meeting } from "../pages/Meeting";
import { Contact } from "../pages/Contact";

export const Root = () => {
	const	navigationData = navFunc();
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	useEffect(() => { checkConnexion(auth, dispatch); }, [dispatch]);

	return <div className="h-screen" id="screen">
		<Header
			brandTop="DINUM / Etalab"
			serviceTitle={<>ALBERT France services{' '}<Badge as="span" noIcon severity="success">Beta</Badge></>}
			serviceTagline="Aide à l’accompagnement des usagers France services"
			homeLinkProps={{ "to": "/login" }}
			navigation={auth.isLogin && navigationData}
			quickAccessItems={ auth.isLogin ? quickAccessItemsFunc(auth, dispatch) : [] }
		/>
		<Routes>
			<Route path="/login" element={!auth.isLogin ? <Login /> : <Navigate to="/home" />}/>
			<Route path="/meeting" element={!auth.isLogin ? <Navigate to="/login" /> : <Meeting />}/>
			<Route path="/home" element={!auth.isLogin ? <Navigate to="/login" /> : <Home />}/>
			<Route path="/" element={!auth.isLogin ? <Navigate to="/login" /> : <Navigate to="/chat" />}/>
			<Route path="/chat" element={!auth.isLogin ? <Navigate to="/login" /> : <Chatbot archive={false}/>}/>
			<Route path="/contact" element={!auth.isLogin ? <Navigate to="/login" /> : <Contact />}/>
			<Route path="/history" element={!auth.isLogin ? <Navigate to="/login" /> : <History />}/>
			<Route path="/signup" element={<Signup />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/new-password" element={<NewPassword />} />
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
		<Footer
			bottomItems={[headerFooterDisplayItem]}
			accessibility="fully compliant"
			termsLinkProps={{
				href: '#'
			}}
		/>
  	</div>
}