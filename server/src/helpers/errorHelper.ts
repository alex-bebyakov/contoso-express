import {IAppError} from "../../index";
import textValue from './/textValueHelper';

export default {
    getAppErrorMessage
};

function getAppErrorMessage(error:IAppError): string {
    if (!error) return '';
    if (error.isAppError) {
        if (!error.message) {
            let message = textValue.error(error.type, error.code, error.data);
            if (!message) {
                message = `Cannot find error message for type:${error.type} code:${error.code}`;
            }
            error.message = message;
        }
        if (error.uiShow) return error.message;
    }
    return 'Server Error';
}