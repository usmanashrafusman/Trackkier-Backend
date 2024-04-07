import SuccessfulResponse from "./SuccessfulResponse";

export interface DeleteResponse {
    isDeleted:boolean
}

export interface PaginationReponse<T> {
    total:number
    result:T[]
}
export {
    SuccessfulResponse
}