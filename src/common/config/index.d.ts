interface IReponseMessage {
    code: number,
    message: string
}
interface IResponseData<T> {
    entity?: T,
    entities?: T
}

export interface IResponse<T> {
    data?: IResponseData<T>
    success: boolean
    status: HttpStatus
    messages: IReponseMessage[]
    error?: {
        code?: string,
        message: string,
        statusCode: number
    }
}