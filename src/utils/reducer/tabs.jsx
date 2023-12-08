import { NOT_SET } from "../../constants/status"

export const	tabsReducer = (state = { activeTab: 0, archiveTab: NOT_SET }, action) => {
	switch (action.type) {
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.nextActiveTab,
			}
		case 'SET_ARCHIVE_TAB':
			console.log('set case')
			return {
				...state,
				archiveTab: action.nextArchiveTab,
			}
		case 'RESET_ARCHIVE_TAB':
			console.log('reset case')
			return {
				...state,
				archiveTab: NOT_SET,
			}
	  	default: { return state };
	}
}