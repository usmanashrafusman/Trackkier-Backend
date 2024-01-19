import { Transform } from "class-transformer"

export const TransformToNumber = () => {
    return Transform(({ value }) => {
        return Number(value)
    })
}