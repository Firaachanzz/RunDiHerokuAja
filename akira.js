const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    Browsers,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor, biocolor } = require('./lib/warna')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const welcome = require('./message/group')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./gura.js')
nocache('../gura.js', module => console.log(color('[UPDATE]', 'cyan'), color(`'${module}'`, 'green'), 'File Telah Berubah!'))
require('./akira.js')
nocache('../akira.js', module => console.log(color('[UPDATE]', 'cyan'), color(`'${module}'`, 'green'), 'File Telah Berubah!'))

const starts = async (gura = new WAConnection()) => {
	gura.logger.level = 'warn'
    gura.version = [2, 2143, 3]
	// MENG WE EM
    console.log(color(figlet.textSync('KrBtz', {
		font: 'Bloody',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))
    console.log(bgcolor(' WhatsApp BOT', 'red'))	
	console.log(biocolor(`==========< Bio >==========`))	
	console.log(biocolor(`=>  Bot Creator By Akira`))
	console.log(biocolor(`=>  Wa : 087705048235`))
	console.log(biocolor(`=>  Gt : Kirbotz`))
	console.log(biocolor(`=>  Yt : KirBotz×`))
	console.log(biocolor(`=>  New Base`))		
	console.log(biocolor(`===============>`))
	console.log(biocolor(` `))					
	console.log(bgcolor(`❗Subrek YT : KirBotz×`, 'red'))
	console.log(color('[EXEC]', 'cyan'), color('Owner Aktif Sekarang!..', 'green'))
	gura.browserDescription = ["KirBotz", "Firefox", "3.0.0"];

	gura.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Scan qr Nya Bro....'))
	})

	fs.existsSync(`./${setting.sessionName}.json`) && gura.loadAuthInfo(`./${setting.sessionName}.json`)
	gura.on('connecting', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color('!Mengkonek....'));
	})
	
	gura.on('open', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color('Bot is now online!'));
	})

	await gura.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(gura.base64EncodedAuthInfo(), null, '\t'))

    gura.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	gura.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})
	
	gura.on('group-participants-update', async (anu) => {
		await welcome(gura, anu)
	})
	
	gura.on('chat-update', async (message) => {
		require('./gura.js')(gura, message)
	})
}

starts()