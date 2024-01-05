export interface Feedback {
	reasons: string[]
	isConfirmed: boolean
    isGood: number | undefined
}

export const InitialFeedback: Feedback = {
    reasons: [],
    isConfirmed: false,
    isGood: undefined,
}