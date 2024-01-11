import { indexesUrl } from "../constants/api"
import { useFetch } from "./hooks"

export const setHeaders = (isEventSource: boolean) => {
	const token = localStorage.getItem("authToken")

	const headers = isEventSource
		? {
				Authorization: `Bearer ${token}`,
		  }
		: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
		  }

	return headers
}

/***************************
		USER QUESTION
 **************************/

export const setContactData = (subject: string, text: string, institution: string) => {
	const data = {
		subject: subject,
		text: text,
		institution: institution,
	}

	return JSON.stringify(data)
}

export const setUserQuestion = (question) => {
	const data = {
		institution: question.institution,
		query: question.query,
		user_text: "",
		context: question.context,
		links: question.links,
		temperature: question.temperature,
		model_name: question.model_name,
		limit: question.limit,
		mode: question.mode,
		sources: question.sources,
		must_not_sids: question.must_not_sids,
	}

	return data
}

export const setQuestionFromRegeneration = (
	mode: "string",
	text,
	limit: number,
	must_not_sids: string[]
) => {
	const data = {
		model_name: "albert-light",
		mode: mode,
		query: text,
		limit: limit,
		context: "",
		institution: "",
		links: "",
		temperature: 20,
		must_not_sids: must_not_sids,
	}

	return data
}

export const setQuestionWithContext = (question: string, context) => {
	const administrations = context.administrations.length
		? "Les administrations concernées par cette question sont : " +
		  context.administrations.map((adminstration) => adminstration)
		: ""
	const themes = context.themes.length
		? "La question porte sur les thèmes suivants : " + context.themes.map((theme) => theme)
		: ""
	const questionWithContext = question + "\n" + administrations + "\n" + themes

	return questionWithContext
}

/***************************
		SP SHEETS
 **************************/

const setIndexesBody = (data, name, limit: number, streamId: number) => {
	const body = JSON.stringify({
		name: name,
		query: data.question,
		limit: limit,
		similarity: "e5",
		institution: "",
		must_not_sids: data.must_not_sids,
		stream_id: streamId,
	})

	return body
}

export const getIndexes = async (
	data,
	dispatch,
	indexType: "sheets" | "chunks",
	chunkSize: number,
	streamId: number
) => {
	const actionType = indexType === "sheets" ? "SET_SHEETS" : "SET_CHUNKS"

	try {
		const res = await useFetch(indexesUrl, "POST", {
			data: setIndexesBody(data, indexType, chunkSize, streamId),
			headers: setHeaders(false),
		})

		dispatch({ type: actionType, [indexType]: res })
	} catch (error) {
		console.error("An error occurred: ", error)
	}
}

export const setIndexesData = (data, setTiles, dispatch, streamId) => {
	setTiles([])

	if (!data || !data.question || data.question.length === 0) return

	getIndexes(data, dispatch, "sheets", 10, streamId)
}

export const setTilesFromSheets = (sheets, setTiles) => {
	if (!sheets || !sheets.length) return setTiles([])

	setTiles([])

	sheets.map((sheet) => {
		const url = sheet.url
		const parsedUrl = new URL(url)
		let domain = parsedUrl.hostname

		domain = domain.replace(/^www\./, "")
		domain = domain.replace(/^entreprendre\./, "")

		const newTile = {
			linkProps: { to: sheet.url },
			title: (
				<>
					<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
						{sheet.surtitre}
					</p>
					<p>{sheet.title}</p>
				</>
			),
			desc: domain,
		}
		setTiles((prevTiles) => [...prevTiles, newTile])
	})
}
