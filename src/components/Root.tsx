import { Header } from "@codegouvfr/react-dsfr/Header"
import { Badge } from "@codegouvfr/react-dsfr/Badge"
import { Chatbot } from "../pages/Chatbot"
import { Routes, Route, Navigate } from "react-router-dom"
import { navFunc } from "../constants/router"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"
import { ResetPassword } from "../pages/ResetPassword"
import { NewPassword } from "../pages/NewPassword"
import { quickAccessItemsFunc } from "../constants/header"
import { useEffect, useState } from "react"
import { checkConnexion } from "../utils/localStorage"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { History } from "../pages/History"
import { Home } from "../pages/Home"
import { Footer } from "@codegouvfr/react-dsfr/Footer"
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display"
import { Meeting } from "../pages/Meeting"
import { Contact } from "../pages/Contact"
import { RootState } from "../../types"

export const Root = () => {
	const navigationData = navFunc()
	const auth = useSelector((state: RootState) => state.auth)
	const [authFailed, setAuthFailed] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		checkConnexion(dispatch)
	}, [dispatch])

	return (
		<div className="h-screen" id="screen">
			<Header
				brandTop="DINUM / Etalab"
				serviceTitle={
					<>
						ALBERT France services{" "}
						<Badge as="span" noIcon severity="success">
							Beta
						</Badge>
					</>
				}
				serviceTagline="Aide à l’accompagnement des usagers France services"
				homeLinkProps={{ title: "Albert" }}
				navigation={auth.isLogin && navigationData}
				quickAccessItems={auth.isLogin ? quickAccessItemsFunc(auth, dispatch) : []}
			/>
			<Routes>
				<Route
					path="/login"
					element={
						!auth.isLogin ? (
							<Login authFailed={authFailed} setAuthFailed={setAuthFailed} />
						) : (
							<Navigate to="/home" />
						)
					}
				/>
				<Route path="/meeting" element={!auth.isLogin ? <Navigate to="/login" /> : <Meeting />} />
				<Route path="/home" element={!auth.isLogin ? <Navigate to="/login" /> : <Home />} />
				<Route
					path="/"
					element={!auth.isLogin ? <Navigate to="/login" /> : <Navigate to="/chat" />}
				/>
				<Route
					path="/chat"
					element={!auth.isLogin ? <Navigate to="/login" /> : <Chatbot archive={false} />}
				/>
				<Route path="/contact" element={!auth.isLogin ? <Navigate to="/login" /> : <Contact />} />
				<Route path="/history" element={!auth.isLogin ? <Navigate to="/login" /> : <History />} />
				<Route
					path="/signup"
					element={<Signup authFailed={authFailed} setAuthFailed={setAuthFailed} />}
				/>
				<Route path="/reset-password" element={<ResetPassword setAuthFailed={setAuthFailed} />} />
				<Route
					path="/new-password"
					element={<NewPassword authFailed={authFailed} setAuthFailed={setAuthFailed} />}
				/>
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
			<Footer
				bottomItems={[headerFooterDisplayItem]}
				accessibility="fully compliant"
				termsLinkProps={{
					href: "#",
				}}
			/>
		</div>
	)
}
