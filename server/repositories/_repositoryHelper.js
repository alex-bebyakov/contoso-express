import _ from 'lodash';
import Promise from 'bluebird';

export default {
    stubData
};

function stubData(data, delay = 500) {
    return Promise.delay(delay)
        .then(() => {
            return data;
        });
}

