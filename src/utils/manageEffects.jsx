export const	scrollToBottom = () => {
	const	chatElement = document.getElementById("chat");

	chatElement.scrollTop = chatElement.scrollHeight;
};