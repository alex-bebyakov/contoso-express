import * as _ from 'lodash';
import * as toastr from 'toastr';

export default {
    showMessage: showMessage,
    showWarning: showWarning,
    showError: showError,
    registerKeyListener: registerKeyListener,
    unRegisterKeyListener: unRegisterKeyListener
};

function setToasterOptions() {
    toastr.options.positionClass = 'toast-bottom-right';
}

setToasterOptions();

function showError(err) {
    let errorMessage = err;

    if (_.isError(err)) {
        errorMessage = err.message;
    }

    toastr.error(errorMessage);
}

function showWarning(message) {
    toastr.warning(message);
}

function showMessage(message) {
    toastr.success(message);
}

//TODO support multiple callbacks
function registerKeyListener(callback) {
    document.onkeyup = (e: any) => {
        e = e || window.event;
        callback(e);
    };
}

function unRegisterKeyListener() {
    document.onkeyup = null;
}