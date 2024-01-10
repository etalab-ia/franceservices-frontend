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
import { History } from "../pages/History"
import { Home } from "../pages/Home"
import { Footer } from "@codegouvfr/react-dsfr/Footer"
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display"
import { Meeting } from "../pages/Meeting"
import { Contact } from "../pages/Contact"
import { InitialUserAuth, UserAuth } from "../utils/auth"
import { useAppDispatch } from "../utils/hooks"

export const Root = () => {
	const navigationData = navFunc()
	const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
	const [authFailed, setAuthFailed] = useState(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		checkConnexion(setUserAuth)
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
				navigation={userAuth.isLogin && navigationData}
				quickAccessItems={userAuth.isLogin ? quickAccessItemsFunc(userAuth, setUserAuth) : []}
			/>
			<Routes>
				<Route
					path="/login"
					element={
						!userAuth.isLogin ? (
							<Login
								authFailed={authFailed}
								setAuthFailed={setAuthFailed}
								setUserAuth={setUserAuth}
							/>
						) : (
							<Navigate to="/home" />
						)
					}
				/>
				<Route
					path="/meeting"
					element={!userAuth.isLogin ? <Navigate to="/login" /> : <Meeting />}
				/>
				<Route path="/home" element={!userAuth.isLogin ? <Navigate to="/login" /> : <Home />} />
				<Route
					path="/"
					element={!userAuth.isLogin ? <Navigate to="/login" /> : <Navigate to="/chat" />}
				/>
				<Route
					path="/chat"
					element={!userAuth.isLogin ? <Navigate to="/login" /> : <Chatbot archive={false} />}
				/>
				<Route
					path="/contact"
					element={
						!userAuth.isLogin ? <Navigate to="/login" /> : <Contact setUserAuth={setUserAuth} />
					}
				/>
				<Route
					path="/history"
					element={!userAuth.isLogin ? <Navigate to="/login" /> : <History />}
				/>
				<Route
					path="/signup"
					element={
						<Signup
							authFailed={authFailed}
							setAuthFailed={setAuthFailed}
							userAuth={userAuth}
							setUserAuth={setUserAuth}
						/>
					}
				/>
				<Route
					path="/reset-password"
					element={
						<ResetPassword
							setAuthFailed={setAuthFailed}
							userAuth={userAuth}
							setUserAuth={setUserAuth}
						/>
					}
				/>
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
