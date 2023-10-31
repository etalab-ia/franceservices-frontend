import { ressourceButtons } from "../../constants/ressources";
import { NOT_SET } from "../../constants/status";

export const	archiveReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_ARCHIVE': {
			if (state.length === 0)
				return state;
	  
			const	lastIndex = state.length - 1;
			const	source = state[lastIndex].question.model_name === 'albert-light' ? 'service-public.fr' : 'transformation.gouv.fr';
	  
			return [
			  	...state.slice(0, lastIndex),
			  	{
					...state[lastIndex],
					date: action.nextDate,
					themes: action.nextThemes,
					source: source,
					selectedArchive: NOT_SET,
					messages: state[lastIndex].messages
					? [...state[lastIndex].messages, action.nextMessages]
					: [action.nextMessages],
			 	},
			];
		}
		case 'SET_ARCHIVE_QUESTION': {
			const	lastIndex = state.length - 1;
			
			return [
				...state.slice(0, lastIndex),
				{
				  ...state[lastIndex],
				  question: action.nextQuestion
			   },
		  ];
		}
		case 'SET_ARCHIVE_CHOICES': {
			return [
				...state,
				{ choices: action.nextChoices }
			]
		}
	  	default: { return state };
	}
}