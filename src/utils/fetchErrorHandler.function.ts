import axios from "axios";

export const fetchErrorHandler = (error: unknown) => {
    let status: number | undefined;
    let message: string;
    if (axios.isAxiosError(error)) {
        if (error.response) {
            status = error.response.status;
            message = error.response.data.error.message;
        } else {
            message = error.message;
        }
    } else {
        //@ts-ignore
        message = error.message;
    }
    const errorObj = {status, message}
    console.log(errorObj);
    return errorObj;
};