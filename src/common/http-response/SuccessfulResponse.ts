import { HttpStatus } from "@nestjs/common"
import { IReponseMessage, IResponse, IResponseData } from "src/common/config"

type Messages = IReponseMessage[] | string

class SuccessfulResponse<T> implements IResponse<T> {
    data: IResponseData<T>
    success = true
    status = HttpStatus.OK
    messages: IReponseMessage[]

    private constructor(){}

    public static send<T>(data: IResponseData<T>, msg?: Messages){
        let messages :IReponseMessage[]= []
        const success = true;
        const status = HttpStatus.OK;
      
        if (typeof msg === "string") {
            const message: IReponseMessage = {
                code: HttpStatus.OK,
                message: msg
            }
            messages.push(message);
        } else if (Array.isArray(msg)) {
            messages = msg
        }
        return {
            success,
            status,
            data,
            messages
        }
    }
}

export default SuccessfulResponse;