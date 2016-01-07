/**
 * Created by zysd on 16/1/7.
 */



Meteor.startup(function(){

    process.env.MAIL_URL="smtp://hailiangwin%40gmail.com:957920147@smtp.gmail.com:465/";

    //Meteor.Mailgun.config({
    //    username: 'postmaster@sandbox8f1ed73fb55d450aa1621ee54a6b869f.mailgun.org',
    //    password: 'd28a69c958319577c7be302f044a933b'
    //});
});

// In your server code: define a method that the client can call
Meteor.methods({
    sendEmail1: function (mailFields) {
        console.log("about to send email...");
        //check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        //
        //Meteor.Mailgun.send({
        //    to: mailFields.to,
        //    from: mailFields.from,
        //    subject: mailFields.subject,
        //    text: mailFields.text,
        //    html: mailFields.html
        //});

        //Email.send({
        //    to: 'llwoll@126.com',
        //    from: 'hailiangwin@gmail.com',
        //    subject: 'hello',
        //    text: 'tiantianxiangshang'
        //});
        console.log("email sent!");
    }
});