import { Button } from "@codegouvfr/react-dsfr/Button";
import ReactToPrint from "react-to-print";
import { Display } from "../Chat/Display";
import { DisplaySheets } from "../Sheets/DisplaySheets";
import { useDispatch } from "react-redux";
import React from 'react';

export const Print = React.forwardRef(({ messages, archive }, ref) => {
	const	dispatch = useDispatch();

	const	handleClick = () => {
		dispatch({ type: 'RESET_ARCHIVE_TAB' });
	}

	return (
		<>
			<div className="flex w-screen">
				<Button
					iconId="fr-icon-arrow-left-s-line-double"
					className="ml-14"
					onClick={handleClick}
					priority="tertiary"
				/>
				<ReactToPrint
					bodyClass="print-agreement"
					content={() => ref.current}
					trigger={() => (
					<Button
						iconId="fr-icon-printer-line"
						className="ml-4"
						priority="tertiary"
					/>
					)}
				/>
			</div>
			<div ref={ref} className="col-message">
				<div className='row-message'>
					<div className='my-10 w-3/5 px-6 mx-14 border'>
						<Display
							messages={messages}
							archive={archive}
						/>
					</div>
					<DisplaySheets />
				</div>
			</div>
		</>
	);
})

  