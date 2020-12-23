import { ResponseCode, ResponseStatus } from "./genericTypes"

export const handleResponse = (status: string | number): boolean => {
    if ( status === ResponseCode.SUCCESS || status === ResponseStatus.SUCCESS) {
        return true
    } else {
        return false
    }
}

export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);