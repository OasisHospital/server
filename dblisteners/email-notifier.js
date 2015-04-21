var nodemailer = require('nodemailer');

module.exports = function(change, maindb) {
    if (change.doc && change.doc.incidentOpen && change.doc.incidentOpen === true &&
         change.doc.notificationSend === false) {
        try {

                var currentDoc = change.doc,
                    transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'quality.test@oasishospital.org',
                        pass: 'Oasis@123'
                    }
                });
 
                // NB! No need to recreate the transporter object. You can use 
                // the same transporter object for all e-mails 
 
                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: 'quality.test@oasishospital.org', // sender address 
                    to: 'binin.pottassery@oasishospital.org', // list of receivers 
                    subject: 'Incident Created', // Subject line 
                    text: 'Incident Report has been created', // plaintext body 
                    html: '<b>An Incident has been created</b>' 
                    // html body 
                };
 
                // send mail with defined transport object 
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                                console.log(error);
                            }else{
                                console.log('Message sent: ' + info.response);
                            }
                });
        } catch (ex) {
            console.log('Error sending email-notification: ',ex);
        }
    }
};
