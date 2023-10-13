import { useEffect } from "react";

export const	scrollToBottom = () => {
	const	chatElement = document.getElementById("chat");

	chatElement.scrollTop = chatElement.scrollHeight;
};

export const useKeyPress = (callback) => {
	useEffect(() => {
	  	const handleKeyPress = (e) => {
			if (e) {
			  callback(e);
			}
	  	};
	  	document.addEventListener('keypress', handleKeyPress);
  
	  	return () => {
			document.removeEventListener('keypress', handleKeyPress);
	  	};
	}, [callback]);
};