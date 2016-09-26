import helper from './_controllerHelper';
import config from '../config';

export default {
    home
};

async function home(req, res) {
    try {
        let user: any = {};

        if (config.auth.useAuth) {
            user = JSON.stringify(req.user);
        } else {
            user = JSON.stringify({id: null});
        }

        return helper.renderView('home', {user}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}