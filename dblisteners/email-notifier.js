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
                    reportedBy = currentDoc.reportedBy,
                    emailSend = false,
                    mailOptions;
             
                // setup e-mail data with unicode symbols
                if(currentDoc.statusOfIncident == 'Opened'){

                        mailOptions = {
                        from: '', // sender address 
                        //to: 'quality.test@oasishospital.org', // list of receivers
                        to: '', // list of receivers
                        subject: 'Incident Created', // Subject line 
                        //text: 'Incident Report has been created', // plaintext body 
                        html: '<p><b>Incident has been Created </b></p>'
                              +'<p><b>Incident Id: </b>'+currentDoc.friendlyId+'</p>'
                              +'<p><b>Reported By: </b>'+currentDoc.reportedBy+'</p>'
                              +'<p><b>Location of Incident: </b>'+currentDoc.locationOfIncident+'</p>'
                              +'<p><b>Date of Incident: </b>'+currentDoc.dateOfIncident+'</p>'
                              +'<p><b>Incident Reported To: </b>'+currentDoc.reportedTo+'</p>'
                              +'<p><b>Incident Type Category: </b>'+currentDoc.categoryName+'</p>'
                              +'<p><b>Incident Type Item: </b>'+currentDoc.categoryItem+'</p>'
                              +'<p><b>Incident Description: </b>'+currentDoc.incidentDescription+'</p>'
                              +'<b>Incident:</b>'+link 
                    // html body 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                    console.log(error);
                                }else{
                                    console.log('Message sent: ' + info.response);
                                }
                    });

                        mailOptions = {
                        from: '', // sender address 
                        to: reportedBy, // list of receivers
                        subject: 'Incident Created', // Subject line 
                        //text: 'Incident Report has been created', // plaintext body 
                        html: '<p><b>Hello, </b></p>'
                              +'<p>Thank you for reporting this incident!</p>'
                              +'<p>Reporting incidents will help us correct the situation and also help us prevent similar incidents in the future.</p>'
                              +'<p>Here is a copy of the incident you reported, for your reference only.</p>'
                              +'<br>'
                              +'<br>'
                              +'<p><b>Incident Id: </b>'+currentDoc.friendlyId+'</p>'
                              +'<p><b>Reported By: </b>'+currentDoc.reportedBy+'</p>'
                              +'<p><b>Location of Incident: </b>'+currentDoc.locationOfIncident+'</p>'
                              +'<p><b>Date of Incident: </b>'+currentDoc.dateOfIncident+'</p>'
                              +'<p><b>Incident Reported To: </b>'+currentDoc.reportedTo+'</p>'
                              +'<p><b>Incident Type Category: </b>'+currentDoc.categoryName+'</p>'
                              +'<p><b>Incident Type Item: </b>'+currentDoc.categoryItem+'</p>'
                              +'<p><b>Incident Description: </b>'+currentDoc.incidentDescription+'</p>'
                              +'<b>Incident:</b>'+link
                              +'<br>'
                              +'<br>'
                              +'<p><b>Please do not reply or forward this e-mail!<b></p>'
                              +'<p>If you have further questions, please do not hesitate to contact the Quality Department.For any technical issues, kindly contact the IT department.</p>'
                              +'<p>Thank you again for your time and effort in reporting this incident!</p>'

                    // html body 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                    console.log(error);
                                }else{
                                    console.log('Message sent: ' + info.response);
                                }
                    });
                }
                 else
                {
                    mailOptions = {
                        from: '', // sender address 
                        //to: 'quality.test@oasishospital.org', // list of receivers 
                        to: '',
                        subject: 'Incident Updated', // Subject line 
                        //text: 'Incident Report has been updated', // plaintext body 
                        html:   '<p><b>Incident has been Updated </b></p>'
                                +'<p><b>Incident Id: </b>'+currentDoc.friendlyId+'</p>'
                                +'<p><b>Date of Incident: </b>'+currentDoc.dateOfIncident+'</p>'
                                +'<p><b>Incident Type Category: </b>'+currentDoc.categoryName+'</p>'
                                +'<p><b>Incident Type Item: </b>'+currentDoc.categoryItem+'</p>'
                                +'<b>Incident has been updated:</b>'+link 
                    // html body 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                    console.log(error);
                                }else{
                                    console.log('Message sent: ' + info.response);
                                }
                    });
                
                }
                if(reviewers.length > 0){
                     
                        reviewers.forEach(function(reviewer){
                           maindb.get(reviewer,function(err, body){
                            if(body.notificationSend === false){
                                
                                mailOptions = {
                                from: '', // sender address 
                                to: body.reviewerEmail, // list of receivers
                                //to: 'binin.pottassery@oasishospital.org', 
                                subject: 'Request for Review of Incident', // Subject line 
                                //text: 'Incident Report has been updated', // plaintext body 
                                html: '<p><b>Hello, </b></p>'
                                       +'<p>Kindly provide your feedback/comment to the following incident</p>'
                                       +'<br>'
                                       +'<p><b>Incident Id: </b>'+currentDoc.friendlyId+'</p>'
                                       +'<p><b>Reported By: </b>'+currentDoc.reportedBy+'</p>'
                                       +'<p><b>Location of Incident: </b>'+currentDoc.locationOfIncident+'</p>'
                                       +'<p><b>Date of Incident: </b>'+currentDoc.dateOfIncident+'</p>'
                                       +'<p><b>Incident Reported To: </b>'+currentDoc.reportedTo+'</p>'
                                       +'<p><b>Incident Type Category: </b>'+currentDoc.categoryName+'</p>'
                                       +'<p><b>Incident Type Item: </b>'+currentDoc.categoryItem+'</p>'
                                       +'<p><b>Incident Description: </b>'+currentDoc.incidentDescription+'</p>'
                                       +'<b>Incident:</b>'+link
                                       +'<br>'
                                       +'<br>'
                                       +'<p><b><u>Instructions:</u></b></p>'
                                       +'<p>1. Log-in to the Incident Reporting system</p>'
                                       +'<p>2. Click on "Current Incidents" tab.</p>'
                                       +'<p>3. Click on "Incidents as Reviewer" tab on the upper right corner of the page.</p>'
                                       +'<p>4. Select Incident and click on "Edit"</p>'
                                       +'<p>5. Click on "Feedback" tab, and then click on "+ New Feedback"</p>'
                                       +'<p>6. A screen will appear. Enter your feedback into this screen. Click "Add" to save feedback/comments.</p>'                                                                     
                                       +'<br>'
                                       +'<br>'
                                       +'<p><b>Please do not reply or forward this e-mail!<b></p>'
                                       +'<p>If you have further questions, please do not hesitate to contact the Quality Department.For any technical issues, kindly contact the IT department.</p>'
                                       +'<p>Thank you in advance for your feedback/comments to this incident!</p>' 
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
               
                if(currentDoc.statusOfIncident == 'Closed'){

                        mailOptions = {
                        from: '', // sender address 
                        to: reportedBy, // list of receivers
                        subject: 'Incident Closed', // Subject line 
                        text: 'Incident Report has been Closed', // plaintext body 
                        html: '<p><b>Hello, </b></p>'
                               +'<p>We just wanted to let you know that we looked into the incident you reported. It is now closed for your review</p>'
                               +'<br>'
                               +'<p><b>Incident Id: </b>'+currentDoc.friendlyId+'</p>'
                               +'<p><b>Reported By: </b>'+currentDoc.reportedBy+'</p>'
                               +'<p><b>Location of Incident: </b>'+currentDoc.locationOfIncident+'</p>'
                               +'<p><b>Date of Incident: </b>'+currentDoc.dateOfIncident+'</p>'
                               +'<p><b>Incident Reported To: </b>'+currentDoc.reportedTo+'</p>'
                               +'<p><b>Incident Type Category: </b>'+currentDoc.categoryName+'</p>'
                               +'<p><b>Incident Type Item: </b>'+currentDoc.categoryItem+'</p>'
                               +'<p><b>Incident Description: </b>'+currentDoc.incidentDescription+'</p>'
                               +'<b>Incident:</b>'+link
                               +'<br>'
                               +'<br>'
                               +'<p>To view summary of the incident, please follow these instructions:</p>'
                               +'<p><b><u>Instructions:</u></b></p>'
                               +'<p>1. Log-in to the Incident Reporting system</p>'
                               +'<p>2. Click on "History" tab.</p>'
                               +'<p>3. Select Incident and click on "Edit"</p>'
                               +'<p>4. Click on any of the tabs to view the incident in further detail.</p>'
                               +'<p>5. Click on "Summary" tab, to review summary</p>'                                                                                                 
                               +'<br>'
                               +'<br>'
                               +'<p><b>Please do not reply or forward this e-mail!<b></p>'
                               +'<p>If you have further questions, please do not hesitate to contact the Quality Department.For any technical issues, kindly contact the IT department.</p>'
                               +'<p>Thank you once again for your time and effort in reporting this incident!</p>' 
                    // html body 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                    console.log(error);
                                }else{
                                    console.log('Message sent: ' + info.response);
                                }
                    });
            }
                
                // NB! No need to recreate the transporter object. You can use 
                // the same transporter object for all e-mails

                // send mail with defined transport object 
                /*if(emailSend === false){
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                    console.log(error);
                                }else{
                                    console.log('Message sent: ' + info.response);
                                }
                    });
                }*/
        } catch (ex) {
            console.log('Error sending email-notification: ',ex);
        }
    }
};
