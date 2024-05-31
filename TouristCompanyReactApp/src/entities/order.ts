import { TTour } from "./tour";

export type TOrder = TTour & {
    status: string
    date: string
}