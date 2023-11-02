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
					choices: action.nextChoices,
					date: action.nextDate,
					tags:action.nextTags,
					source: source,
					agentResponse: action.nextAgentResponse,
			 	},
			];
		}
		case 'SET_ARCHIVE_QUESTION': {
			return [
				...state,
				{ question: action.nextQuestion },
		  ];
		}
	  	default: { return state };
	}
}