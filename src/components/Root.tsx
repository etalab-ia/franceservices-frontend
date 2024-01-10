import { Badge } from "@codegouvfr/react-dsfr/Badge"
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display"
import { Footer } from "@codegouvfr/react-dsfr/Footer"
import { Header } from "@codegouvfr/react-dsfr/Header"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { quickAccessItemsFunc } from "../constants/header"
import { navFunc } from "../constants/router"
import { Chatbot } from "../pages/Chatbot"
import { Contact } from "../pages/Contact"
import { History } from "../pages/History"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Meeting } from "../pages/Meeting"
import { NewPassword } from "../pages/NewPassword"
import { ResetPassword } from "../pages/ResetPassword"
import { Signup } from "../pages/Signup"
import { InitialUserAuth, UserAuth } from "../utils/auth"
import { useAppDispatch } from "../utils/hooks"
import { checkConnexion } from "../utils/localStorage"

export const Root = () => {
	const navigationData = navFunc()
	const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
	const [authFailed, setAuthFailed] = useState(false)
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		checkConnexion(setUserAuth).finally(() => setIsLoading(false))
	}, [dispatch])

	if (isLoading) {
		return <div className="bg-red"></div>
	}

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
