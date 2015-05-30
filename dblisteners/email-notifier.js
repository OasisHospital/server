var nodemailer = require('nodemailer');

module.exports = function(change, maindb) {
    if (change.doc && change.doc.incidentOpen && change.doc.incidentOpen === true) {
        try {

                var currentDoc = change.doc,
                    id = change.doc._id,
                    transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: '',
                            pass: ''
                        }
                    }),
                    
                    idSplit = id.split("_"),
                    idNum = idSplit[1],
                    link = 'http://oasisincident/#/incident/edit/'+idNum,
                    reviewers = currentDoc.reviewers,
                    emailSend = false,
                    mailOptions;
             
                // setup e-mail data with unicode symbols
                if(currentDoc.statusOfIncident == 'Opened'){

                        mailOptions = {
                        from: 'quality.incident@oasishospital.org', // sender address 
                        to: 'quality.test@oasishospital.org', // list of receivers 
                        subject: 'Incident Created', // Subject line 
                        text: 'Incident Report has been created', // plaintext body 
                        html: '<b>An Incident has been created:</b>'+link 
                    // html body 
                    };
                }
                else if(reviewers.length > 0){
                     
                        reviewers.forEach(function(reviewer){
                           maindb.get(reviewer,function(err, body){
                            if(body.notificationSend === false){
                                
                                mailOptions = {
                                from: 'quality.incident@oasishospital.org', // sender address 
                                to: body.reviewerEmail, // list of receivers 
                                subject: 'Request for Review of Incident', // Subject line 
                                text: 'Incident Report has been updated', // plaintext body 
                                html: '<b>Please provide your feedback for the following incident:</b>'+link 
                                // html body 
                            };
                                transporter.sendMail(mailOptions, function(error, info){
                                    if(error){
                                            console.log(error);
                                    }else{
                                            console.log('Message sent: ' + info.response);
                                    }
                                });

                                body.notificationSend = true;
                            
                                maindb.insert(body, body._id, function(err) {
                                    if (err) {
                                        console.log('Error updating url for file:'+body.id, err);
                                    }
                                });
                            }
                        });
                    });
                    emailSend = true;
                }
                else
                {
                    mailOptions = {
                        from: 'quality.incident@oasishospital.org', // sender address 
                        to: 'quality.test@oasishospital.org', // list of receivers 
                        subject: 'Incident Updated', // Subject line 
                        text: 'Incident Report has been updated', // plaintext body 
                        html: '<b>Incident has been updated:</b>'+link 
                    // html body 
                    };
                
                }
                // NB! No need to recreate the transporter object. You can use 
                // the same transporter object for all e-mails

                // send mail with defined transport object 
                if(emailSend === false){
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                    console.log(error);
                                }else{
                                    console.log('Message sent: ' + info.response);
                                }
                    });
                }
        } catch (ex) {
            console.log('Error sending email-notification: ',ex);
        }
    }
};
