import { Button } from "@codegouvfr/react-dsfr/Button"
import ReactToPrint from "react-to-print"
import React from "react"
import { useDispatch } from "react-redux"

export const PrintTools = React.forwardRef(({ messages }, ref) => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch({ type: "RESET_ARCHIVE_TAB" })
	}

	return (
		<div className="flex w-screen">
			<Button
				iconId="fr-icon-arrow-left-s-line-double"
				className="fr-mt-4w fr-ml-6w fr-mx-1w"
				onClick={handleClick}
				priority="tertiary"
			/>
			<ReactToPrint
				bodyClass="print-agreement"
				content={() => ref.current}
				trigger={() => (
					<Button iconId="fr-icon-printer-line" className="fr-mt-4w" priority="tertiary" />
				)}
			/>
		</div>
	)
})
