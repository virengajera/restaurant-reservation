const config = require('../config/vars');
const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const os = require('os')
const path = require('path')
const process = require('process')


module.exports = function(options, templateName, jsonSrc, type) {
    
    // setup e-mail data
    // defaulting to smtp
    type = (type) ? type : "SMTP";
    // setting header options
    this.mailOptions = {};
    // default to from of config if not passed
    this.mailOptions.from = (options.from) ? options.from : config.mailer.from;
    this.mailOptions.to = options.to; // list of receivers (comma separated)
    this.mailOptions.subject = options.subject;
    this.mailOptions.html = '';
    this.mailOptions.attachments = options.attachments;
    if(options.bcc) this.mailOptions.bcc = options.bcc;
    if(options.cc) this.mailOptions.cc = options.cc;


    if(templateName){
       
        const templatePath = path.join(process.cwd(),'views','mails',templateName)
        let htmls = '';
        
        contents =  fs.readFileSync(templatePath,"utf-8");
        pageBuilder = handlebars.compile(contents);
        htmls  += pageBuilder(jsonSrc);

        this.mailOptions.html = htmls;
    }

    transOptions = {
       /*  "host": config.mailer.host, // hostname
        "secureConnection": config.mailer.smtp.secureConnection, // use SSL
        "port": config.mailer.port,// port for secure SMTP}; */
        "service": config.mailer.service,
        "host": config.mailer.host,
        "auth": {
            "user": config.mailer.auth.user,
            "pass":config.mailer.auth.pass,
        }

    };

    // transport object
    if (typeof type === 'string' && type.toLowerCase() == 'smtp')
        var transport = nodemailer.createTransport(transOptions);
    else
        var transport = nodemailer.createTransport(type, transOptions);

    // function to fire the email
    this.sendEmail = function(cb){
        // send mail with defined transport object
        transport.sendMail(this.mailOptions, function(error, response){
            if(error){
                console.log('mailer error--');
                console.log(error);
                console.log(this.mailOptions);
            }else{
                console.log('mailer successful--');
                console.log(response.message);
            }
            // shut down the connection pool
            transport.close();
            cb(error, response);

        });
    };

};


