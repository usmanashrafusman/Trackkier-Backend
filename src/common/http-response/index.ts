import SuccessfulResponse from "./SuccessfulResponse";

export interface DeleteResponse {
    isDeleted:boolean
}

export interface PaginationResponse<T> {
    total:number
    result:T[]
}
export {
    SuccessfulResponse
}