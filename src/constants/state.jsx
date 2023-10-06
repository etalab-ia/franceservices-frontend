import { Input } from "@codegouvfr/react-dsfr/Input";

export const	initialQuestion = {
	institution: '',
	title: '',
	user_text: '',
	context: '',
	links: '',
	temperature: 0.1,
}

const			initialFields = [
	{
		title: "title",
		value: "Titre du message",
		isChecked: false,
	},
	{
		title: "institution",
		value: "Administration concernée",
		isChecked: false,
	}
];

export const	bodyInput = <Input
	textArea={true}
	label="Corps du message"
	name="user_text"
	nativeTextAreaProps= {{
		name: "user_text",
		style:{backgroundColor: "#E3E3FD", height: "500px"}}
	}
/>

export const	initialState = {
	question: initialQuestion,
	availableFields: initialFields,
	messages: [],

	userFields: [bodyInput],
	sheets: [],
	experiences: [],
	response: [],
	import: [],
	institutions: [],

	isDisable: true,
	isStoppable: true,

	generate: false,
	userEdition: false,
	isEditable: false,
	activeTab: 0,
	isLogin: false,
	username: "",
	email: "",
	userToken: "",
	loginFailed: false,
}