// This context keeps track of wether the user is browsing albert.etalab.gouv.fr or franceservices.etalab.gouv.fr
// because the front doesn't display the same content depending on the domain name

import { createContext, useState, useEffect } from "react"

export const isMFSContext = createContext<boolean>(false)

export const MFSProvider = ({ children }) => {
	const [isMFS, setIsMFS] = useState<boolean>(false)

	useEffect(() => {
		const hostname = window.location.hostname
		//setIsMFS(hostname === "franceservices.etalab.gouv.fr")
		console.log("hostname", hostname)
		setIsMFS(hostname === "localhost")
	}, [])

	return <isMFSContext.Provider value={isMFS}>{children}</isMFSContext.Provider>
}
