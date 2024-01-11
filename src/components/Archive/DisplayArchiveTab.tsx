import { Print } from "../Print/Print"
import { useEffect, useRef, useState } from "react"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { ArchiveContainer } from "./ArchiveContainer"
import { Chat } from "../../../types"
import { useFetch } from "../../utils/hooks"
import { getChatsUrl } from "../../constants/api"

export function DisplayArchiveTabs() {
	const [chatsId, setChatsId] = useState<Chat[]>([]) // All previous user's chat
	const [archiveTab, setArchiveTab] = useState<number | null>(null)
	const ref = useRef<HTMLDivElement>(null)
	const token = localStorage.getItem("authToken")

	const getChatsId = async () => {
		const res = await useFetch(getChatsUrl, "GET", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: null,
		})

		res.map((item) => {
			const newItem = {
				name: item.chat_name,
				type: item.chat_type,
				creationDate: item.created_at,
				updatedDate: item.updated_at,
				id: item.id,
				userId: item.user_id,
			}
			setChatsId((prevState) => [...prevState, newItem])
		})
	}

	useEffect(() => {
		getChatsId()
	}, [])

	useEffect(() => {
		console.log("id: ", chatsId)
	}, [chatsId])

	useEffect(() => {
		console.log("archive tab: ", archiveTab)
		// GET /chat/archive/${chat_id}
		// res = GET /last stream
		// setStream(res)
	}, [archiveTab])

	return (
		<GlobalRowContainer extraClass="fr-grid-row--center items-center">
			{archiveTab === null ? (
				<ArchiveContainer chatsId={chatsId} setArchiveTab={setArchiveTab} />
			) : (
				<Print ref={ref} selectedChat={chatsId[archiveTab]} setArchiveTab={setArchiveTab} />
			)}
		</GlobalRowContainer>
	)
}
