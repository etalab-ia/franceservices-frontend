import { NOT_SET } from '@constants/status'
import copy from '../../icons/usertools/copy.svg'
import redo from '../../icons/usertools/redo.svg'
import { generateStream } from './hooks'
import { setQuestionFromRegeneration } from './setData'

const getLastArchiveMessage = (archive) => {
  return archive.messages[archive.messages.length - 1].text
}

const getLastMessage = (archive, stream, isArchive) => {
  const base = isArchive ? getLastArchiveMessage(archive) : stream.historyStream

  return base[base.length - 1]
}

/*
 ** Regenerate answer
 */
// TODO: rm user.choices
// TODO WHEN BACK IS READY: retrieve archive message
/* async function handleRedo(state, dispatch) {
	const { archive, feedback, user, stream } = state
	const archiveIndex = archive.length - 1
	const isArchive = user.choices.newQuestion !== NOT_SET
	let newLimit = isArchive ? archive[archiveIndex].limit : user.question.limit
	let newText = getLastMessage(archive[archiveIndex], stream, isArchive)
	let newMode = feedback.reasons.length ? "simple" : "rag"
	const { } = useApiUrls()

	if (feedback.reasons.includes("Trop long")) {
		newText = "Résume ce texte : " + newText
		newLimit -= 2
	} else if (feedback.reasons.includes("Incohérent")) newText = "Reformule ce texte : " + newText
	else if (feedback.reasons.includes("Manque de sources")) {
		newLimit += 2
		newMode = "rag"
		user.choices.newQuestion !== NOT_SET
			? (newText = getLastArchiveMessage(archive[archiveIndex]))
			: newText
	} else newMode = "rag"

		const question = setQuestionFromRegeneration(newMode, newText, newLimit, user.question.musNotSids)

		generateStream(question, dispatch, user.chatId, streamUrl)

	return dispatch({ type: "SET_ARCHIVE_LIMIT", nextLimit: newLimit })
} */

function handleCopy(stream) {
  const joinedRes = stream.historyStream[stream.historyStream.length - 1]

  return navigator.clipboard.writeText(joinedRes)
}

export function userChatToolsFunc(state, dispatch) {
  const userChatToolsProps = [
    // {
    // 	name: "redo",
    // 	image: redo,
    // 	alt: "Re-générer la réponse",
    // 	title: "Re-générer la réponse",
    // 	onClick: () => handleRedo(state, dispatch),
    // },
    // {
    // 	name: "copy",
    // 	image: copy,
    // 	alt: "Copier la réponse",
    // 	title: "Copier la réponse",
    // 	onClick: () => handleCopy(state.stream),
    // },
  ]

  return userChatToolsProps
}
