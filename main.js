const Discord = require('discord.js-selfbot-v13');
const fs = require('fs');
const chalk = require('chalk');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase("db");

setTimeout(async function () 
{
    if (control == 1) {
		
        db.set("tokenswitch", 0)
        db.set("msgauth", 'undefined')
        db.set("lastmsgauth", 'undefined')


        let shutdowncontrol = 0; 
        let sonDeger = shutdowncontrol; 

        const beklemeSuresi = 20000; //

        const kontrol = setInterval(() => {
            if (shutdowncontrol === sonDeger) { 
                console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("FOUND SHUTDOWN ERROR PLEASE WAIT, IM RECONNECTING ") + chalk.green("[+] "));
                process.exit(1);
            } else {
                sonDeger = shutdowncontrol;
            }
        }, beklemeSuresi);

        const getdataclient = new Discord.Client({
            checkUpdate: false,
        });

        let tokenauth = 0;

        async function getdatafunc() {
            const tokendata = fs.readFileSync('getdata.txt', 'utf-8').split('\r\n').filter(Boolean);
            getdataclient.login(tokendata[0])

                const getdataid = db.get("channelid")[1];

                const emojiRegex = /<:[a-zA-Z0-9_]+:[0-9]+>|<a:[a-zA-Z0-9_]+:[0-9]+>/g;

            getdataclient.on('messageCreate', async message => {



                if (message.author.bot) {
                    console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('BOT MESSAGE DETECTED') + chalk.green("[+]"));
                    return;
                }// bot msg test
                    const getdataid = db.get("channelid")[1];
                    if (message.channel.id === getdataid) {
                        if (emojiRegex.test(message.content)) {
							const emoji = message.content.match(emojiRegex);
                            console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('EMOJI DETECTED ' + emoji) + chalk.green(" [+]"));
                        }
                        else {
                            db.set("msgdata", message.content)
                            db.set("lastmsgauth", db.get("msgauth"))
                            db.set("msgauth", message.author.id)
                            console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('DATA COLLECTED ') + chalk.red(db.get("msgdata") + " " + db.get("msgauth") + " ") + chalk.green("[+]"));
                            tokenauth = tokenauth + 1;
                        }
                    }
                });

        }
        getdatafunc();

        var time = Date.now()

        let buildnumber = (Math.random() + 1).toString(8).substring(13);

        const totaltoken = fs.readFileSync('tokens.txt', 'utf-8').split('\r\n').filter(Boolean);
        console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("Version ") + chalk.green("[3.0.0]"));
        console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("Loaded ") + chalk.green(totaltoken.length) + chalk.rgb(230, 184, 0)(" Tokens ") + chalk.green("[+] "));
        console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("Status ") + chalk.green("[+] "));
        console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("Build Number ") + chalk.green("[" + (buildnumber) + "]"));
        console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("MS ") + chalk.green("[" + (Date.now() - time) + "]"));
        console.log("")


        setInterval(async function () {


            if (tokenauth === 1) {
                tokenauth = tokenauth - 1

                const client = new Discord.Client({
                    checkUpdate: false,
                });


                async function loginTokens() {
                    const tokens = fs.readFileSync('tokens.txt', 'utf-8').split('\r\n').filter(Boolean);
                    client.on('ready', async () => {
                        console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("NAME ") + chalk.rgb(230, 184, 0)(`${client.user.tag}`));
                        console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("ID ") + chalk.rgb(230, 184, 0)(`${client.user.id}`));
                        console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("NUMBER ") + chalk.rgb(230, 184, 0)(db.get("tokenswitch")));
                    });

                    if (db.get("msgauth") === db.get("lastmsgauth")) {
                        shutdowncontrol = shutdowncontrol + 1
                        await client.login(tokens[db.get("tokenswitch")]); 
                        console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('AUTHOR DETECTED AS SAME ') + chalk.green("[+]"));
                        const sendchannel = await client.channels.fetch(db.get("channelid")[0]);
                        sendchannel.send(db.get("msgdata"));
                        console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('MESSAGE CHANNEL SEND ') + chalk.green("[+]"));
                    } else {
                        shutdowncontrol = shutdowncontrol + 1
                        console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('AUTHOR DETECTED AS DIFFERENT ') + chalk.green("[+]"));
                        let tokenSwitch = db.get("tokenswitch");
                        db.set("tokenswitch", tokenSwitch + 1); 

                        if (db.get("tokenswitch") >= tokens.length) { 
                            db.set("tokenswitch", 0)
                            console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('TOKEN CONVERT 0 NUMBER ') + chalk.green("[+]"));
                        }

                        await client.login(tokens[db.get("tokenswitch")]); 
                        const sendchannel = await client.channels.fetch(db.get("channelid")[0]);
                        sendchannel.send(db.get("msgdata"))
                        console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('MESSAGE CHANNEL SEND ') + chalk.green("[+]"));
                    }
                    /*   i++;
                       lastMessageAuthor = message.author.id;
                       if (i >= tokens.length) {
                           i = 0;
                       }
                       try {
                           await client.login(tokens[i]);
                       } catch (err) {
                           console.error(err); // err fix
                       } */

                }

                loginTokens();

            }
			

        }, 1000);

    }
}, 2000)

process.on('unhandledRejection', err => {
    console.log(err);
    console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("I FOUND ERROR RETRYING.. ") + chalk.green("[+]"));
    process.exit(1);
});