import * as Promise from 'bluebird';
import pathHelper from './pathHelper';
import {EmailOptions, EmailTemplateData} from "../../index";
import {EmailTemplate} from 'email-templates'
import {createTransport, SentMessageInfo} from 'nodemailer'
import config from '../config'

export default {
    sendEmail
};

function sendEmail(templateName: string, templateData: EmailTemplateData,adress:string) {
    return renderTemplate(templateName, templateData)
        .then(data => {
            let emailData: EmailOptions={
                from: 'noreplay@'+config.app.appName,
                to: adress,
                subject: data.subject,
                html: data.html
            }
             return new Promise((resolve, reject) => {
               return createTransport(config.email).sendMail(emailData, function (error, info: SentMessageInfo) {
                    if (error) return reject(error);
                    return resolve(info);
                });
            });
        });
}

function renderTemplate(name: string, templateData: EmailTemplateData): Promise<any> {
    let templateDir = pathHelper.getRelative('templates',name)
    let template = new EmailTemplate(templateDir);
    return new Promise<any>((resolve, reject) => {
        template.render(templateData, function (error, value) {
            if (!error) return resolve(value);
            return reject(error);
        });
    });
}
