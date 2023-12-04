import React from 'react';
import { PrintTools } from "./PrintTools";
import { Chatbot } from "../../pages/Chatbot";

export const Print = React.forwardRef(({ messages, archive }, ref) => {
    return (
        <>
            <PrintTools ref={ref} />
            <div ref={ref}>
				<Chatbot archive={archive}/>
            </div>
        </>
    );
});
