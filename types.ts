import { store } from "./src/utils/reducer/reducer"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
