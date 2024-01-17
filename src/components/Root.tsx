import { Badge } from "@codegouvfr/react-dsfr/Badge"
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display"
import { Footer } from "@codegouvfr/react-dsfr/Footer"
import { Header } from "@codegouvfr/react-dsfr/Header"
import { useEffect, useState, useContext } from "react"
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
import { isMFSContext } from "../utils/context/isMFSContext"
import Error404 from "../pages/404"
import { useApiUrls } from "../constants/api"

export const Root = () => {
	const navigationData = navFunc()
	const [userAuth, setUserAuth] = useState<UserAuth>(InitialUserAuth)
	const [authFailed, setAuthFailed] = useState(false)
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const isMFS = useContext(isMFSContext)
	const { userUrl, signoutUrl } = useApiUrls()

	useEffect(() => {
		checkConnexion(setUserAuth, userUrl).finally(() => setIsLoading(false))
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
				quickAccessItems={
					userAuth.isLogin ? quickAccessItemsFunc(userAuth, setUserAuth, signoutUrl) : []
				}
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
				{isMFS ? (
					<Route
						path="/meeting"
						element={!userAuth.isLogin ? <Navigate to="/login" /> : <Meeting />}
					/>
				) : (
					<Route path={"/meeting"} element={<Navigate to="/404" />} />
				)}
				<Route path="/home" element={!userAuth.isLogin ? <Navigate to="/login" /> : <Home />} />
				<Route
					path="/"
					element={!userAuth.isLogin ? <Navigate to="/login" /> : <Navigate to="/home" />}
				/>
				<Route path="/404" element={<Error404 />} />
				{!isMFS ? (
					<Route
						path="/chat"
						element={!userAuth.isLogin ? <Navigate to="/login" /> : <Chatbot archive={false} />}
					/>
				) : (
					<Route path={"/chat"} element={<Navigate to="/404" />} />
				)}
				<Route
					path="/contact"
					element={
						!userAuth.isLogin ? <Navigate to="/login" /> : <Contact setUserAuth={setUserAuth} />
					}
				/>
				{isMFS ? (
					<Route
						path="/history"
						element={!userAuth.isLogin ? <Navigate to="/login" /> : <History />}
					/>
				) : (
					<Route path={"/history"} element={<Navigate to="/404" />} />
				)}
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
				<Route path="*" element={<Error404 />} />
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
