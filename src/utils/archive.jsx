import { Tag } from "@codegouvfr/react-dsfr/Tag";

export const    setArchive = (dispatch, stream, user, type) => {
	const	themesArrays = user.sheets.map((sheet) => sheet.theme && sheet.theme.split(', '));
	const	uniqueThemesSet = Array.from(new Set(themesArrays.flat()));
	const	selected = uniqueThemesSet.filter((theme) => theme !== "" && theme !== undefined);

	if (user.choices.oldQuestion === user.choices.newQuestion && type === 'qr')
		return ;
	
	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextTags: selected,
		nextSheets: user.sheets,
		nextAdditionalSheets: user.additionalSheets,
		nextMessages: [{ text: user.originQuestion, sender: 'user' }, { text: stream.historyStream, sender: 'agent' }],
		nextType: type
	});

	// TODO: improve isNewQuestion
	dispatch({
		type: 'SET_USER_CHOICES',
		nextKey: 'oldQuestion',
		nextValue: user.choices.newQuestion
	});
}

export const	archiveHeaders = ["Nom de la conversation", "Thèmes", "Date", "Source", "Type"];

const	setArchiveTags = (array) => {
	const	tags = array.map((theme, index) => {
		return <Tag key={index} className="fr-m-1w">{theme} </Tag>
	});

	return tags;
}

export const	setArchiveBody = (item, index, userQuestion, dispatch) => {
	const	title = userQuestion.length > 78 ? userQuestion.slice(0, 78) + '...' : userQuestion;
	const	tags = setArchiveTags(item.tags);
	const	type = item.type === 'qr' ? 'Question' : 'Rendez-vous';
  
	const handleClick = () => {
		dispatch({ type: 'SET_ARCHIVE_TAB', nextArchiveTab: index, nextType: item.type });
	};
  
	const commonDivProps = {
	  key: index,
	  onClick: handleClick,
	  className: "cursor-pointer"
	};
  
	return [
		<div {...commonDivProps}>{title}</div>,
		<div {...commonDivProps}>{tags}</div>,
	 	<div {...commonDivProps}>{item.date}</div>,
		<div {...commonDivProps}>{item.source}</div>,
		<div {...commonDivProps}>{type}</div>,
	];
  };
  