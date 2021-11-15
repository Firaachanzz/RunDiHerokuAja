const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    WA_DEFAULT_EPHEMERAL
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const speed = require('performance-now')
const { spawn, exec, execSync } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const twitterGetUrl = require("twitter-url-direct")
const _gis = require('g-i-s')
const fetch = require('node-fetch');
const request = require('request');
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const axios = require("axios")
const fs = require("fs-extra")
const { promisify, util } = require('util')
const imageToBase64 = require('image-to-base64');
const qrcodes = require('qrcode');
const googleIt = require('google-it')
const os = require('os');
const hx = require('hxz-api')
const imgbb = require('imgbb-uploader');

//------ FUNCTION -------
const { color, bgcolor } = require('./lib/warna')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close , sleep} = require('./lib/functions')
const { fetchJson, fetchText , kyun} = require('./lib/fetcher')
const { Tiktokdl } = require('./lib/tiktok.js')
const { yta, ytv, upload } = require("./lib/ytdl");
const { uptotele, uploadFile, RESTfulAPI, uploadImages } = require('./lib/uploadimage')
const Exif = require('./lib/exif');
const exif = new Exif();
const { smsg } = require('./lib/simple')
const premium = require("./lib/premium");
const { mediafiredl } = require('./lib/mediafiredl')
const Mthumb = fs.readFileSync('./media/gura.jpeg')
const Mfake = fs.readFileSync ('./media/gura.jpeg')
const Bfake = fs.readFileSync ('./media/gura.jpeg','base64')

//----- DATABASE -------
let setting = JSON.parse(fs.readFileSync('./setting.json'))
let _scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))
let welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
let anlink = JSON.parse(fs.readFileSync('./database/antilink.json'))
let _premium = JSON.parse(fs.readFileSync('./database/user/premium.json'));

//----- SINGKAT -------
prefix = setting.prefix
owner = setting.owner
lolkey = setting.lolkey
mot = '࿊⃟✮'
ownerName = setting.ownerName
rply = '_©KirBotz_'
fake = '©KirBotz'
valkey = 'rivalgans'
tamnel = fs.readFileSync('./media/gura.jpeg')
kirabot = fs.readFileSync("./media/akira.jpg")

const getcmd = (id) => {
  let position = null;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === id) {
      position = i;
    }
  });
  if (position !== null) {
    return _scommand[position].chats;
  }
};  
const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _scommand.push(obj)
    fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
}
const akira = fs.readFileSync ('./media/gura.jpeg')
const ftrol = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 123,
                            status: 1,
                            surface : 1,
                            message: `KirBotz`, 
                            orderTitle: `KirBotz`,
                            thumbnail: akira, //Gambarnye
                            sellerJid: '0@s.whatsapp.net' 
                          }
                        }
                      }
const getCommandPosition = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _scommand[position].chats
    }
}



const checkSCommand = (id) => {
    let status = false
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            status = true
        }
    })
    return status
}

module.exports = gura = async (gura, mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
m = smsg(gura, mek)

const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')

const cmd = (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId && m.quoted.sender === gura.user.jid) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'listResponseMessage' && mek.message.listResponseMessage.singleSelectReply.selectedRowId && m.quoted.sender === gura.user.jid) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getcmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== null && getcmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? getcmd(mek.message.stickerMessage.fileSha256.toString('hex')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
body = (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) && m.quoted.sender === gura.user.jid) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'listResponseMessage' && mek.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) && m.quoted.sender === gura.user.jid) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getcmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== null && getcmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? (getcmd(mek.message.stickerMessage.fileSha256.toString('hex')).startsWith(prefix) ? getcmd(mek.message.stickerMessage.fileSha256.toString('hex')) : '') : ""
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const on = process.uptime()
chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1)
const arg = chats.slice(command.length + 2, chats.length)
const isCmd = body.startsWith(prefix)

mess = {
wait: 'Wait...',
search: 'Searching...',eror: 'Error',
success: '✔️ Berhasil ✔️',
error: {
stick: 'Ulangi bang',
Iv: 'Link tidak valid'
},
only: {
prem : 'Premium special features! Chat owner to get Premium access!',
group: 'Fitur Dapat digunakan di Dalam Group!',
ownerG: 'Fitur Dapat digunakan oleh Owner Group!',
ownerB: 'Fitur Khusus Owner Bot!',
admin: 'Fitur dapat Digunakan oleh Admin Group!',
Badmin: 'Fitur dapat Digunakan Setelah Bot menjadi ADMIN!'
}
}

const totalchat = await gura.chats.all()
const botNumber = gura.user.jid
const ownerNumber = setting.ownerNumber
const ownerName = setting.ownerName
const botName = setting.botName
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? gura.user.jid : isGroup ? mek.participant : mek.key.remoteJid
const senderNumber = sender.split("@")[0]
const groupMetadata = isGroup ? await gura.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const itsMe = mek.key.fromMe ? true : false
const isAntilink = isGroup ? anlink.includes(from) : false
const isPremium = premium.checkPremiumUser(sender, _premium)
const isWelkom = isGroup ? welkom.includes(from) : false
const isOwner = ownerNumber.includes(sender)
const conts = mek.key.fromMe ? gura.user.jid : gura.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? gura.user.name : conts.notify || conts.vname || conts.name || '-'
const q = args.join(' ')

const listmsg = (from, title, desc, list) => { // ngeread nya pake rowsId, jadi command nya ga keliatan
let po = gura.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "CLICK HERE","listType": "SINGLE_SELECT","sections": list}}, {})
  return gura.relayWAMessage(po, {waitForAck: true})
}
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const fakevo = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    imageMessage: {
      mimetype: 'image/jpeg',
      caption: 'GuraBot',
      jpegThumbnail: fs.readFileSync('./media/gura.jpeg'),
      viewOnce: true
    }
  }
}
gura.updatePresence(from, Presence.recording)
gura.chatRead(from, "read")
const reply = (teks) => {
   gura.sendMessage(from,teks,text,{quoted: fakevo})
}
const sendMess = (hehe, teks) => {
	gura.sendMessage(hehe, teks, text)
}

const mentions = (teks, memberr, id) => {
	(id == null || id == undefined || id == false) ? gura.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : gura.sendMessage(from, teks.trim(), extendedText, {quoted:mek, contextInfo: {"mentionedJid": memberr}})
}
const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
const buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1,
};
gura.sendMessage(
id,
buttonMessage,
MessageType.buttonsMessage,
options
);
};
 ///Button Video
const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
kma = vid1
mhan = await gura.prepareMessage(from, kma, video)
const buttonMessages = {
videoMessage: mhan.message.videoMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 5
}
gura.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
const runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
                }
      if (isGroup && !mek.key.fromMe && isAntilink) {
if (budy.includes("://chat.whatsapp.com/")) {
if (isGroupAdmins) return reply('Your is Admin!! Bot not Found kick You :D')
console.log(color('[KICK]', 'red'), color('Received a link!', 'yellow'))
reply(`「 *LINK GRUP TERDETEKSI* 」\n\n_Link Group terdeteksi!!_\n_Kamu akan di kick dari Group!!_`)
setTimeout(() => {
gura.groupRemove(from, [sender])
}, 2000);
}
}
                
colors = ['red','white','black','blue','yellow','green']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))

function monospace(string) {
return '```' + string + '```'
} 
function jsonformat(string) {
return JSON.stringify(string, null, 2)
}
function randomNomor(angka){
return Math.floor(Math.random() * angka) + 1
}
const nebal = (angka) => {
return Math.floor(angka)
}

async function sendStickerFakeSize(buffer) {
fsize = await gura.prepareMessage(from, buffer, sticker)
costick = await gura.prepareMessageFromContent(from,{
"stickerMessage": {
"url": fsize.message.stickerMessage.url,
"fileSha256": fsize.message.stickerMessage.fileSha256.toString('base64'),
"fileEncSha256": fsize.message.stickerMessage.fileEncSha256.toString('base64'),
"mediaKey": fsize.message.stickerMessage.mediaKey.toString('base64'),
"mimetype": fsize.message.stickerMessage.mimetype,
"height": fsize.message.stickerMessage.height,
"width": fsize.message.stickerMessage.width,
"directPath": fsize.message.stickerMessage.directPath,
"fileLength": `9999999999999`,
"mediaKeyTimestamp": fsize.message.stickerMessage.mediaKeyTimestamp.low,
"isAnimated": fsize.message.stickerMessage.isAnimated
}
}, {quoted:mek})
gura.relayWAMessage(costick)
}
		
async function sendStickerWm(from, path, quoted, packStick, authorStick, type, emote) {
let size =(type == null || type == undefined || type == false) ? 'full' : 'crop'
return await WSF.createSticker(path, { type: size ,pack: packStick,author: authorStick,categories: emote ? emote : ["❤"," 😍"," 😘"," 💕"," 😻"," 💑"," 👩‍❤‍👩"," 👨‍❤‍👨"," 💏"," 👩‍❤‍💋‍👩"," 👨‍❤‍💋‍👨"," 🧡"," 💛"," 💚"," 💙"," 💜"," 🖤"," 💔"," ❣"," 💞"," 💓"," 💗"," 💖"," 💘"," 💝"," 💟"," ♥"," 💌"," 💋"," 👩‍❤️‍💋‍👩"," 👨‍❤️‍💋‍👨"," 👩‍❤️‍👨"," 👩‍❤️‍👩"," 👨‍❤️‍👨"," 👩‍❤️‍💋‍👨"," 👬"," 👭"," 👫"," 🥰"," 😚"," 😙"," 👄"," 🌹"," 😽"," ❣️"," ❤️","😀"," 😃"," 😄"," 😁"," 😆"," 😅"," 😂"," 🤣"," 🙂"," 😛"," 😝"," 😜"," 🤪"," 🤗"," 😺"," 😸"," 😹"," ☺"," 😌"," 😉"," 🤗"," 😊","☹"," 😣"," 😖"," 😫"," 😩"," 😢"," 😭"," 😞"," 😔"," 😟"," 😕"," 😤"," 😠"," 😥"," 😰"," 😨"," 😿"," 😾"," 😓"," 🙍‍♂"," 🙍‍♀"," 💔"," 🙁"," 🥺"," 🤕"," ☔️"," ⛈"," 🌩"," 🌧","😯"," 😦"," 😧"," 😮"," 😲"," 🙀"," 😱"," 🤯"," 😳"," ❗"," ❕"," 🤬"," 😡"," 😠"," 🙄"," 👿"," 😾"," 😤"," 💢"," 👺"," 🗯️"," 😒"," 🥵","👋","🎊"," 🎉"," 🎁"," 🎈"," 👯‍♂️"," 👯"," 👯‍♀️"," 💃"," 🕺"," 🔥"," ⭐️"," ✨"," 💫"," 🎇"," 🎆"," 🍻"," 🥂"," 🍾"," 🎂"," 🍰","🌃"]}).then((buffer) => gura.sendMessage(from, buffer, MessageType.sticker, { quoted: quoted}))
}

const hour_now = moment().format('HH')
var ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐏𝐚𝐠𝐢'
if (hour_now >= '03' && hour_now <= '10') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠'
} else if (hour_now >= '10' && hour_now <= '14') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠'
} else if (hour_now >= '14' && hour_now <= '17') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐨𝐫𝐞'
} else if (hour_now >= '17' && hour_now <= '18') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦'
} else if (hour_now >= '18' && hour_now <= '23') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦'
} else {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦'
}

const sendStickerFromUrl = async(to, url) => {
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Downloading sticker...'))
var names = getRandom('.webp')
var namea = getRandom('.png')
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, namea, async function () {
let filess = namea
let asw = names
require('../lib/exif.js')
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
exec(`webpmux -set exif ./core/stickers/data.exif ${asw} -o ${asw}`, async (error) => {
let media = fs.readFileSync(asw)
gura.sendMessage(to, media, sticker,{quoted : mek})
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Succes send sticker...'))
fs.unlinkSync(asw)
fs.unlinkSync(filess)
});
});
});
}

const sendStickerUrl = async(to, url) => {
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Downloading sticker...'))
var names = getRandom('.webp')
var namea = getRandom('.png')
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, namea, async function () {
let filess = namea
let asw = names
require('../lib/exif.js')
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
exec(`webpmux -set exif ./core/stickers/data.exif ${asw} -o ${asw}`, async (error) => {
let media = fs.readFileSync(asw)
gura.sendMessage(from, media, sticker, {quoted:mek})
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Succes send sticker...'))
});
});
});
}
 
const hideTag = async function(from, text){
	       let anu = await gura.groupMetadata(from)
	       let members = anu.participants
	       let ane = []
	       for (let i of members){
	       ane.push(i.jid)
}
	       gura.sendMessage(from, {text:text, jpegThumbnail:fs.readFileSync('./media/akira.jpg')}, 'extendedTextMessage', {contextInfo: {"mentionedJid": ane}})
}  
const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const sendFileFromUrl = async(link, type, options) => {
           hasil = await getBuffer(link)
	       gura.sendMessage(from, hasil, type, options).catch(e => {
	       fetch(link).then((hasil) => {
	       gura.sendMessage(from, hasil, type, options).catch(e => {
	       gura.sendMessage(from, { url : link }, type, options).catch(e => {
	       reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
	       console.log(e)
})
})
})
})
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
gura.sendMessage(to, media, type, { quoted:mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
fs.unlinkSync(filename)
});
}



 const uploadImages = (buffData, type) => {
// eslint-disable-next-line no-async-promise-executor
return new Promise(async (resolve, reject) => {
const { ext } = await fromBuffer(buffData)
const cmd = text.toLowerCase()
const filePath = 'utils/tmp.' + ext
const _buffData = type ? await resizeImage(buffData, false) : buffData
fs.writeFile(filePath, _buffData, { encoding: 'base64' }, (err) => {
if (err) return reject(err)
console.log('Uploading image to telegra.ph server...')
const fileData = fs.readFileSync(filePath)
const form = new FormData()
form.append('file', fileData, 'tmp.' + ext)
fetch('https://telegra.ph/upload', {
method: 'POST',
body: form
})
.then(res => res.json())
.then(res => {
if (res.error) return reject(res.error)
resolve('https://telegra.ph' + res[0].src)
})
.then(() => fs.unlinkSync(filePath))
.catch(err => reject(err))
})
})
}
setTimeout(() => {
            gura.setStatus(`Aktip Selama ${runtime(on)} Subscribe YT : KirBotz×`)
        })
const Akira =`*Hai Kak* \`\`\`@${pushname}\`\`\`
*🌹ℍ𝔼𝕃𝕃𝕆𝕎𝕆ℝ𝕃𝔻🌹*

*──────" 𝕭𝖔𝖙 𝕴𝖓𝖋𝖔 "──────*
_Name_ : *${botName}*
_Owner_ : *${ownerName}*
_Prefix_ : *${prefix}*
_Lib_ : *Baileys*
_Runtime_ : *${runtime(on)}*
*────────────────────*

*──────" 𝖀𝖘𝖊𝖗 𝕴𝖓𝖋𝖔 "──────*
_Name : ${pushname}_
_Creator_ : *https://wa.me/${sender.split("@")[0]}*
*────────────────────*

「 𝐎𝐖𝐍𝐄𝐑 」
	${mot} *${prefix}bc*
	${mot} *${prefix}restart*
	
「 𝐆𝐑𝐎𝐔𝐏 」
	${mot} *${prefix}welcome*
	${mot} *${prefix}antilink*
	${mot} *${prefix}add*
	${mot} *${prefix}kick*
	${mot} *${prefix}promote*
	${mot} *${prefix}demote*
	${mot} *${prefix}infogroup*
	${mot} *${prefix}tagall*
	${mot} *${prefix}hidetag*
	${mot} *${prefix}listonline*
	
「 𝐒𝐄𝐀𝐑𝐂𝐇 」
	${mot} *${prefix}lirik*
	${mot} *${prefix}otaku*
	${mot} *${prefix}komiku*
	${mot} *${prefix}chara*
	${mot} *${prefix}playstore*
	
「 𝐎𝐓𝐇𝐄𝐑 」
	${mot} *${prefix}sc*
	${mot} *${prefix}runtime*
	${mot} *${prefix}speed*
	${mot} *${prefix}owner*
	
「 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 」
	${mot} *${prefix}tiktokdl*
	${mot} *${prefix}tiktokmp3*
	${mot} *${prefix}tiktokmp4*
	${mot} *${prefix}ytmp3*
	
「 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 」
	${mot} *${prefix}sticker*
	${mot} *${prefix}toimg*
	${mot} *${prefix}nulis teks*
	${mot} *${prefix}meme*
	${mot} *${prefix}shorturl*
	${mot} *${prefix}cuttly*
	${mot} *${prefix}tinyurl*
	
「 𝐌𝐀𝐊𝐄𝐑 」
	${mot} *${prefix}blackpink text*
	${mot} *${prefix}neon text*
	${mot} *${prefix}greenneon text*
	${mot} *${prefix}advanceglow text*
	${mot} *${prefix}futureneon text*
	${mot} *${prefix}sandwriting text*
	${mot} *${prefix}sandsummer text*
	${mot} *${prefix}sandengraved text*
	${mot} *${prefix}metaldark text*
	${mot} *${prefix}neonlight text*
	${mot} *${prefix}holographic text*
	${mot} *${prefix}text1917 text*
	${mot} *${prefix}minion text*
	${mot} *${prefix}deluxesilver text*
	${mot} *${prefix}newyearcard text*
	${mot} *${prefix}bloodfrosted text*
	${mot} *${prefix}halloween text*
	${mot} *${prefix}jokerlogo text*
	${mot} *${prefix}fireworksparkle text*
	${mot} *${prefix}natureleaves text*
	${mot} *${prefix}bokeh text*
	${mot} *${prefix}toxic text*
	${mot} *${prefix}strawberry text*
	${mot} *${prefix}box3d text*
	${mot} *${prefix}roadwarning text*
	${mot} *${prefix}breakwall text*
	${mot} *${prefix}icecold text*
	${mot} *${prefix}luxury text*
	${mot} *${prefix}cloud text*
	${mot} *${prefix}summersand text*
	${mot} *${prefix}horrorblood text*
	${mot} *${prefix}thunder text*
	${mot} *${prefix}anime*
	${mot} *${prefix}asupan*
	${mot} *${prefix}ppcp*
	${mot} *${prefix}chiisaihentai*
	${mot} *${prefix}trap*
	${mot} *${prefix}blowjob*
	${mot} *${prefix}yaoi*
	${mot} *${prefix}ecchi*
	${mot} *${prefix}hentai*
	${mot} *${prefix}yaoi*
	${mot} *${prefix}ahegao*
	${mot} *${prefix}hololewd*
	${mot} *${prefix}sideoppai*
	${mot} *${prefix}animefeets*
	${mot} *${prefix}animebooty*
	${mot} *${prefix}animethighss*
	${mot} *${prefix}hentaiparadise*
	${mot} *${prefix}animearmpits*
	${mot} *${prefix}hentaifemdom*
	${mot} *${prefix}lewdanimegirls*
	${mot} *${prefix}biganimetiddies*
	${mot} *${prefix}animebellybutton*
	${mot} *${prefix}hentai4everyone*
	${mot} *${prefix}bj*
	${mot} *${prefix}ero*
	${mot} *${prefix}cum*
	${mot} *${prefix}feet*
	${mot} *${prefix}yuri*
	${mot} *${prefix}trap*
	${mot} *${prefix}lewd*
	${mot} *${prefix}feed*
	${mot} *${prefix}eron*
	${mot} *${prefix}solo*
	${mot} *${prefix}gasm*
	${mot} *${prefix}poke*
	${mot} *${prefix}anal*
	${mot} *${prefix}holo*
	${mot} *${prefix}tits*
	${mot} *${prefix}kuni*
	${mot} *${prefix}kiss*
	${mot} *${prefix}erok*
	${mot} *${prefix}smug*
	${mot} *${prefix}baka*
	${mot} *${prefix}solog*
	${mot} *${prefix}feetg*
	${mot} *${prefix}lewdk*
	${mot} *${prefix}waifu*
	${mot} *${prefix}pussy*
	${mot} *${prefix}femdom*
	${mot} *${prefix}cuddle*
	${mot} *${prefix}eroyuri*
	${mot} *${prefix}cum_jpg*
	${mot} *${prefix}erofeet*
	${mot} *${prefix}holoero*
	${mot} *${prefix}classic*
	${mot} *${prefix}erokemo*
	${mot} *${prefix}fox_girl*
	${mot} *${prefix}futanari*
	${mot} *${prefix}lewdkemo*
	${mot} *${prefix}wallpaper*
	${mot} *${prefix}pussy_jpg*
	${mot} *${prefix}kemonomimi*
	${mot} *${prefix}nsfw_avatar*
	${mot} *${prefix}loli*
	${mot} *${prefix}husbu*
	${mot} *${prefix}milf*
	${mot} *${prefix}cosplay*
	${mot} *${prefix}wallml*
	${mot} *${prefix}wasted*
	${mot} *${prefix}tahta*
	${mot} *${prefix}pornhub*
	${mot} *${prefix}glitch*
	${mot} *${prefix}avenger*
	${mot} *${prefix}space*
	${mot} *${prefix}ninjalogo*
	${mot} *${prefix}marvelstudio*
	${mot} *${prefix}lionlogo*
	${mot} *${prefix}wolflogo*
	${mot} *${prefix}steel3d*
	${mot} *${prefix}wallgravity*
	${mot} *${prefix}wetglass*
	${mot} *${prefix}multicolor3d*
	${mot} *${prefix}watercolor*
	${mot} *${prefix}luxurygold*
	${mot} *${prefix}galaxywallpaper*
	${mot} *${prefix}lighttext*
	${mot} *${prefix}beautifulflower*
	${mot} *${prefix}puppycute*
	${mot} *${prefix}royaltext*
	${mot} *${prefix}heartshaped*
	${mot} *${prefix}birthdaycake*
	${mot} *${prefix}galaxystyle*
	${mot} *${prefix}hologram3d*
	${mot} *${prefix}glossychrome*
	${mot} *${prefix}greenbush*
	${mot} *${prefix}metallogo*
	${mot} *${prefix}noeltext*
	${mot} *${prefix}glittergold*
	${mot} *${prefix}textcake*
	${mot} *${prefix}starsnight*
	${mot} *${prefix}wooden3d*
	${mot} *${prefix}textbyname*
	${mot} *${prefix}writegalacy*
	${mot} *${prefix}galaxybat*
	${mot} *${prefix}snow3d*
	${mot} *${prefix}birthdayday*
	${mot} *${prefix}goldplaybutton*
	${mot} *${prefix}silverplaybutton*
	${mot} *${prefix}freefire*
	${mot} *${prefix}shadow*
	${mot} *${prefix}cup*
	${mot} *${prefix}cup1*
	${mot} *${prefix}romance*
	${mot} *${prefix}smoke*
	${mot} *${prefix}burnpaper*
	${mot} *${prefix}lovemessage*
	${mot} *${prefix}undergrass*
	${mot} *${prefix}love*
	${mot} *${prefix}coffe*
	${mot} *${prefix}woodheart*
	${mot} *${prefix}woodenboard*
	${mot} *${prefix}summer3d*
	${mot} *${prefix}wolfmetal*
	${mot} *${prefix}nature3d*
	${mot} *${prefix}underwater*
	${mot} *${prefix}golderrose*
	${mot} *${prefix}summernature*
	${mot} *${prefix}letterleaves*
	${mot} *${prefix}glowingneon*
	${mot} *${prefix}fallleaves*
	${mot} *${prefix}flamming*
	${mot} *${prefix}harrypotter*
	${mot} *${prefix}carvedwood*
	${mot} *${prefix}tiktok*
	${mot} *${prefix}arcade8bit*
	${mot} *${prefix}battlefield4*
	${mot} *${prefix}pubg*

*──────" 𝕰𝖓𝖉𝖎𝖓𝖌 𝕺𝖋 𝕸𝖊𝖓𝖚 "──────*
`
//--------- COMMAND ----------
switch(command) {

case 'menu':
thu = await gura.getStatus(`${sender.split('@')[0]}@s.whatsapp.net`, MessageType.text)
menuh = `${ucapanWaktu} 𝐊𝐚𝐤 @${sender.split("@")[0]}`
gura.sendMessage(from, { contentText: `${menuh}`, footerText: `_*• Contact Owner*_\n_📮Whatsapp_ : *@${owner}*\n_💌Email_ : *tesheroku123@gmail.com*\n\n_*User Info :*_\n_Name_ : *${pushname}*\n_Bio_ : *${thu.status}*\n_Creator_ : *https://wa.me/${sender.split("@")[0]}*\n\n_*Bot Info :*_\n_Name_ : *${botName}*\n_Owner_ : *${ownerName}*\n_Lib_ : *Baileys*\n_Prefix_ : *${prefix}*\n_Runtime_ : *${runtime(on)}*\n_Language_ : *Javascript*\n\n\nMade On Date - 1-11-2021`, buttons: [{ buttonId: `${prefix}menua`, buttonText: { displayText: '𝐍𝐞𝐱𝐭' }, type: 1 },{ buttonId: `${prefix}owner`, buttonText: { displayText: '𝐎𝐰𝐧𝐞𝐫' }, type: 1 }], headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: tamnel, contextInfo: {mentionedJid: [sender, ownerNumber]}}}, 'buttonsMessage')
break
case 'menua':
gura.sendMessage(from, {"contentText": `${Akira}`,"footerText": 'KirBotz',
"buttons": [
{buttonId: `.sewabot`, buttonText: {displayText: 'SEWABOT'}, type: 1},
{buttonId: `.donasi`, buttonText: {displayText: 'DONASI'}, type: 1}],
"headerType": "DOCUMENT", "documentMessage": {
            "url": "https://mmg.whatsapp.net/d/f/Ano5cGYOFQnC51uJaqGBWiCrSJH1aDCi8-YPQMMb1N1y.enc",
            "mimetype": "application/pdf",
            "title": "KirBotz.pdf",
            "fileSha256": "8Xfe3NQDhjwVjR54tkkShLDGrIFKR9QT5EsthPyxDCI=",
            "fileLength": "999999999999",
            "pageCount": 999,
            "mediaKey": "XWv4hcnpGY51qEVSO9+e+q6LYqPR3DbtT4iqS9yKhkI=",
            "fileName": "KirBotz Bot WhatsApp",
            "fileEncSha256": "NI9ykWUcXKquea4BmH7GgzhMb3pAeqqwE+MTFbH/Wk8=",
            "directPath": "/v/t62.7119-24/35160407_568282564396101_3119299043264875885_n.enc?ccb=11-4&oh=d43befa9a76b69d757877c3d430a0752&oe=61915CEC",
            "mediaKeyTimestamp": "1634472176",
            "jpegThumbnail": "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"
  }}, MessageType.buttonsMessage,{ quoted: mek, sendEphemeral: true, contextInfo:{"forwardingScore":999,"isForwarded":true, "externalAdReply":{"title": `Hai Kak ${pushname}`, "body": `${ucapanWaktu}`, mediaType: 2, "thumbnailUrl": "https://telegra.ph/file/5d4301000e27dd1c952a5.jpg'","previewType": "VIDEO","mediaUrl": `https://youtu.be/BH4ipz4O-sQ/`}}})
  break
case 'allmenu':
	menunyai = `
*🌹ℍ𝔼𝕃𝕃𝕆𝕎𝕆ℝ𝕃𝔻🌹*

*──────" 𝕭𝖔𝖙 𝕴𝖓𝖋𝖔 "──────*
_Name_ : *${botName}*
_Owner_ : *${ownerName}*
_Prefix_ : *${prefix}*
_Lib_ : *Baileys*
_Runtime_ : *${runtime(on)}*
*────────────────────*

*──────" 𝖀𝖘𝖊𝖗 𝕴𝖓𝖋𝖔 "──────*
_Name : ${pushname}_
_Bio : ${thu.status}_
_Creator_ : *https://wa.me/${sender.split("@")[0]}*
*────────────────────*

「 𝐎𝐖𝐍𝐄𝐑 」
	${mot} *${prefix}bc*
	${mot} *${prefix}restart*
	
「 𝐆𝐑𝐎𝐔𝐏 」
	${mot} *${prefix}welcome*
	${mot} *${prefix}antilink*
	${mot} *${prefix}add*
	${mot} *${prefix}kick*
	${mot} *${prefix}promote*
	${mot} *${prefix}demote*
	${mot} *${prefix}infogroup*
	${mot} *${prefix}tagall*
	${mot} *${prefix}hidetag*
	${mot} *${prefix}listonline*
	
「 𝐒𝐄𝐀𝐑𝐂𝐇 」
	${mot} *${prefix}lirik*
	${mot} *${prefix}otaku*
	${mot} *${prefix}komiku*
	${mot} *${prefix}chara*
	${mot} *${prefix}playstore*
	
「 𝐎𝐓𝐇𝐄𝐑 」
	${mot} *${prefix}sc*
	${mot} *${prefix}runtime*
	${mot} *${prefix}speed*
	${mot} *${prefix}owner*
	
「 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 」
	${mot} *${prefix}tiktokdl*
	${mot} *${prefix}tiktokmp3*
	${mot} *${prefix}tiktokmp4*
	${mot} *${prefix}ytmp3*
	
「 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 」
	${mot} *${prefix}sticker*
	${mot} *${prefix}toimg*
	${mot} *${prefix}nulis teks*
	${mot} *${prefix}meme*
	${mot} *${prefix}shorturl*
	${mot} *${prefix}cuttly*
	${mot} *${prefix}tinyurl*
	
「 𝐌𝐀𝐊𝐄𝐑 」
	${mot} *${prefix}blackpink text*
	${mot} *${prefix}neon text*
	${mot} *${prefix}greenneon text*
	${mot} *${prefix}advanceglow text*
	${mot} *${prefix}futureneon text*
	${mot} *${prefix}sandwriting text*
	${mot} *${prefix}sandsummer text*
	${mot} *${prefix}sandengraved text*
	${mot} *${prefix}metaldark text*
	${mot} *${prefix}neonlight text*
	${mot} *${prefix}holographic text*
	${mot} *${prefix}text1917 text*
	${mot} *${prefix}minion text*
	${mot} *${prefix}deluxesilver text*
	${mot} *${prefix}newyearcard text*
	${mot} *${prefix}bloodfrosted text*
	${mot} *${prefix}halloween text*
	${mot} *${prefix}jokerlogo text*
	${mot} *${prefix}fireworksparkle text*
	${mot} *${prefix}natureleaves text*
	${mot} *${prefix}bokeh text*
	${mot} *${prefix}toxic text*
	${mot} *${prefix}strawberry text*
	${mot} *${prefix}box3d text*
	${mot} *${prefix}roadwarning text*
	${mot} *${prefix}breakwall text*
	${mot} *${prefix}icecold text*
	${mot} *${prefix}luxury text*
	${mot} *${prefix}cloud text*
	${mot} *${prefix}summersand text*
	${mot} *${prefix}horrorblood text*
	${mot} *${prefix}thunder text*
	${mot} *${prefix}anime*
	${mot} *${prefix}asupan*
	${mot} *${prefix}ppcp*
	${mot} *${prefix}chiisaihentai*
	${mot} *${prefix}trap*
	${mot} *${prefix}blowjob*
	${mot} *${prefix}yaoi*
	${mot} *${prefix}ecchi*
	${mot} *${prefix}hentai*
	${mot} *${prefix}yaoi*
	${mot} *${prefix}ahegao*
	${mot} *${prefix}hololewd*
	${mot} *${prefix}sideoppai*
	${mot} *${prefix}animefeets*
	${mot} *${prefix}animebooty*
	${mot} *${prefix}animethighss*
	${mot} *${prefix}hentaiparadise*
	${mot} *${prefix}animearmpits*
	${mot} *${prefix}hentaifemdom*
	${mot} *${prefix}lewdanimegirls*
	${mot} *${prefix}biganimetiddies*
	${mot} *${prefix}animebellybutton*
	${mot} *${prefix}hentai4everyone*
	${mot} *${prefix}bj*
	${mot} *${prefix}ero*
	${mot} *${prefix}cum*
	${mot} *${prefix}feet*
	${mot} *${prefix}yuri*
	${mot} *${prefix}trap*
	${mot} *${prefix}lewd*
	${mot} *${prefix}feed*
	${mot} *${prefix}eron*
	${mot} *${prefix}solo*
	${mot} *${prefix}gasm*
	${mot} *${prefix}poke*
	${mot} *${prefix}anal*
	${mot} *${prefix}holo*
	${mot} *${prefix}tits*
	${mot} *${prefix}kuni*
	${mot} *${prefix}kiss*
	${mot} *${prefix}erok*
	${mot} *${prefix}smug*
	${mot} *${prefix}baka*
	${mot} *${prefix}solog*
	${mot} *${prefix}feetg*
	${mot} *${prefix}lewdk*
	${mot} *${prefix}waifu*
	${mot} *${prefix}pussy*
	${mot} *${prefix}femdom*
	${mot} *${prefix}cuddle*
	${mot} *${prefix}eroyuri*
	${mot} *${prefix}cum_jpg*
	${mot} *${prefix}erofeet*
	${mot} *${prefix}holoero*
	${mot} *${prefix}classic*
	${mot} *${prefix}erokemo*
	${mot} *${prefix}fox_girl*
	${mot} *${prefix}futanari*
	${mot} *${prefix}lewdkemo*
	${mot} *${prefix}wallpaper*
	${mot} *${prefix}pussy_jpg*
	${mot} *${prefix}kemonomimi*
	${mot} *${prefix}nsfw_avatar*
	${mot} *${prefix}loli*
	${mot} *${prefix}husbu*
	${mot} *${prefix}milf*
	${mot} *${prefix}cosplay*
	${mot} *${prefix}wallml*
	${mot} *${prefix}wasted*
	${mot} *${prefix}tahta*
	${mot} *${prefix}pornhub*
	${mot} *${prefix}glitch*
	${mot} *${prefix}avenger*
	${mot} *${prefix}space*
	${mot} *${prefix}ninjalogo*
	${mot} *${prefix}marvelstudio*
	${mot} *${prefix}lionlogo*
	${mot} *${prefix}wolflogo*
	${mot} *${prefix}steel3d*
	${mot} *${prefix}wallgravity*
	${mot} *${prefix}wetglass*
	${mot} *${prefix}multicolor3d*
	${mot} *${prefix}watercolor*
	${mot} *${prefix}luxurygold*
	${mot} *${prefix}galaxywallpaper*
	${mot} *${prefix}lighttext*
	${mot} *${prefix}beautifulflower*
	${mot} *${prefix}puppycute*
	${mot} *${prefix}royaltext*
	${mot} *${prefix}heartshaped*
	${mot} *${prefix}birthdaycake*
	${mot} *${prefix}galaxystyle*
	${mot} *${prefix}hologram3d*
	${mot} *${prefix}glossychrome*
	${mot} *${prefix}greenbush*
	${mot} *${prefix}metallogo*
	${mot} *${prefix}noeltext*
	${mot} *${prefix}glittergold*
	${mot} *${prefix}textcake*
	${mot} *${prefix}starsnight*
	${mot} *${prefix}wooden3d*
	${mot} *${prefix}textbyname*
	${mot} *${prefix}writegalacy*
	${mot} *${prefix}galaxybat*
	${mot} *${prefix}snow3d*
	${mot} *${prefix}birthdayday*
	${mot} *${prefix}goldplaybutton*
	${mot} *${prefix}silverplaybutton*
	${mot} *${prefix}freefire*
	${mot} *${prefix}shadow*
	${mot} *${prefix}cup*
	${mot} *${prefix}cup1*
	${mot} *${prefix}romance*
	${mot} *${prefix}smoke*
	${mot} *${prefix}burnpaper*
	${mot} *${prefix}lovemessage*
	${mot} *${prefix}undergrass*
	${mot} *${prefix}love*
	${mot} *${prefix}coffe*
	${mot} *${prefix}woodheart*
	${mot} *${prefix}woodenboard*
	${mot} *${prefix}summer3d*
	${mot} *${prefix}wolfmetal*
	${mot} *${prefix}nature3d*
	${mot} *${prefix}underwater*
	${mot} *${prefix}golderrose*
	${mot} *${prefix}summernature*
	${mot} *${prefix}letterleaves*
	${mot} *${prefix}glowingneon*
	${mot} *${prefix}fallleaves*
	${mot} *${prefix}flamming*
	${mot} *${prefix}harrypotter*
	${mot} *${prefix}carvedwood*
	${mot} *${prefix}tiktok*
	${mot} *${prefix}arcade8bit*
	${mot} *${prefix}battlefield4*
	${mot} *${prefix}pubg*

*──────" 𝕰𝖓𝖉𝖎𝖓𝖌 𝕺𝖋 𝕸𝖊𝖓𝖚 "──────*`
var imgs = await gura.prepareMessage('0@c.us', kirabot, image, { thumbnail: kirabot })
            var imgCatalog = imgs.message.imageMessage
            var ctlg = await gura.prepareMessageFromContent(from, {
                "productMessage": {
                    "product": {
                        "productImage": imgCatalog,
                        "productId": "4457725420906655",
                        "title": `𝒜𝓁𝓁 𝑀𝑒𝓃𝓊`,
                        "description": menunyai,
                        "footerText": `©KirBotz`,
                        "currencyCode": "IDR",
                        "priceAmount1000": "100000000",
                        "productImageCount": 1,
                        "firstImageId": 1,
                        "salePriceAmount1000": "35000000",
                        "retailerId": `SUBSCRIBE YT : KirBotz×`,
                        "url": "https://wa.me/6287705048235"
                    },
                    "businessOwnerJid": "6287705048235@s.whatsapp.net",
                }
            }, { quoted: ftrol, mimetype: 'image/jpeg' })
            gura.relayWAMessage(ctlg)
            break
case 'owner':
let inilist = []
for (let i of ownerNumber) {
const vname = gura.contacts[i] != undefined ? gura.contacts[i].vname || gura.contacts[i].notify : undefined
inilist.push({
"displayName": 'Akira',
"vcard": 'BEGIN:VCARD\n'
+ 'VERSION:3.0\n'
+ `FN:${ownerName}\n`
+ `ORG: Creator ${ownerName} ;\n`
+ `TEL;type=CELL;type=VOICE;waid=${owner}:${owner}\n`
+ 'END:VCARD'.trim()
})
}
hehe = await gura.sendMessage(from, {
"displayName": `${inilist.length} kontak`,
"contacts": inilist 
}, 'contactsArrayMessage', { quoted: ftrol })
button = [
  {buttonId: '.menu', buttonText: {displayText: 'MENU'}, type: 1}
]
 buttons = {
    contentText: 'Nih Kak Owner ku ><',
    footerText: `*©KirBotz*`,
    buttons: button,
    headerType: 1
}
await gura.sendMessage(from, buttons, MessageType.buttonsMessage, {quoted: ftrol})
break
//// bokep menu
case 'bokep1':				 
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
				qute = fs.readFileSync('./krb.jpg') 
				   gura.sendMessage(from, qute, image, { quoted: mek, caption: '*SEMOGA DI BERI HIDAYAH*\nLink Download \n\nhttps://www.mediafire.com/file/h2nygxbyb6n9cyo/VID-20210107-WA1468.mp4/file' })
				   break
				   
//settinggroup
case 'infogrup':
       case 'infogroup':
       case 'grupinfo':
       case 'groupinfo':
              if (!isGroup) return reply(mess.only.group)
              try {
              var pic = await gura.getProfilePicture(from)
              } catch {
              var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
}
              let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelkom ? 'Aktif' : 'Mati'}\n*AntiLink :* ${isAntilink ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
              gura.sendMessage(from, await getBuffer(pic), image, {quoted: ftrol, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
              break
case 'anime':
            reply(mess.wait)
            fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-gambar-anime.txt')
            .then(res => res.text())
            .then(body => {
            let tod = body.split("\n");
            let pjr = tod[Math.floor(Math.random() * tod.length)];
            imageToBase64(pjr)
            .then((response) => {
            media =  Buffer.from(response, 'base64');
            gura.sendMessage(from,media,image,{quoted:mek,caption:'NIH'})
            }
            )
            .catch((error) => {
            console.log(error); 
            }
            )
            });
            break
case 'tagall':
       if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isGroup) return reply(mess.only.group)
              let arr = [];
              let txti = `*[ TAG ALL ]*\n\n${q ? q : ''}\n\n`
              for (let i of groupMembers){
              txti += `=> @${i.jid.split("@")[0]}\n`
              arr.push(i.jid)
}
              mentions(txti, arr, true)
              break
case 'asupan':
                    get_result = await getBuffer(`https://itsmevall.herokuapp.com/api/asupan?apikey=${valkey}`)
                    pll = `𝗔𝘀𝘂𝗽𝗮𝗻𝗻𝘆𝗮 𝗞𝗮𝗸 シ︎`
   sendButVideo(from, pll, `Klik Next Untuk Melanjutkan`, get_result, [                      
          {
            buttonId: `${prefix+command}`,
            buttonText: {
              displayText: `Next シ︎`,
            },
            type: 1,
          },
        ]);                 
                    break
case 'add':
		if (!isGroup) return reply(mess.only.group)
		if (!isGroupAdmins) return reply(mess.only.admin)
		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		if (args.length < 1) return reply('Yang mau di add jin ya?')
		if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
		try {
	      num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
		gura.groupAdd(from, [num])
	} catch (e) {
		console.log('Error :', e)
			reply('Gagal menambahkan target, mungkin karena di private')
					}
		break
case 'buypremium':
            run = process.uptime() 
            teks = `*Ketik .owner Untuk Membeli Premium*`
            reply(teks)
            break
case 'online':
       case 'listonline':
       case 'here':                
             if (!isGroup) return reply(`Only group`)
             try {
             let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
             let online = [...Object.keys(gura.chats.get(ido).presences), gura.user.jid]
             gura.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, { quoted: mek, contextInfo: { mentionedJid: online }})
             } catch (e) {
             reply(`${e}`)
}
             break
case 'hidetag':
      if (!isGroupAdmins && !itsMe && !isOwner) return 
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
             try {
             quotedText = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
             hideTag(from, `${quotedText}`)
             } catch {
             hideTag(from, `${q}`)
}
             break
case 'promote':
case 'pm':
if (!isGroupAdmins && !itsMe && !isOwner) return 
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
	teks = 'Perintah di terima, anda menjdi admin :\n'
	for (let _ of mentioned) {
		teks += `@${_.split('@')[0]}\n`
	}
	mentions(teks, mentioned, true)
	gura.groupMakeAdmin(from, mentioned)
} else {
	mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
	gura.groupMakeAdmin(from, mentioned)
}
break
case 'demote':
case 'dm' : 
if (!isGroupAdmins && !itsMe && !isOwner) return 
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
	teks = 'Perintah di terima, anda tidak menjadi admin :\n'
	for (let _ of mentioned) {
		teks += `@${_.split('@')[0]}\n`
	}
	mentions(teks, mentioned, true)
	gura.groupDemoteAdmin(from, mentioned)
} else {
	mentions(`Perintah di terima, Menurunkan : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
	gura.groupDemoteAdmin(from, mentioned)
}
break
case 'kick':
if (!isGroup) return reply(mess.only.group)
if (!itsMe && !isGroupAdmins) return reply(mess.only.admin)
if(!q)return reply(`Format Error!\n\nExample : ${prefix + command} @tag`)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
y = q.split('@')[1] + '@s.whatsapp.net'
gura.groupRemove(from, [y])
reply(`Succses kick target!`)
break
case 'welcome':
        if (!isGroupAdmins && !isOwner)return reply('Lu Bukan Admin Ngentod')
               if (!isGroup) return reply('Khusus Group')
               if (args.length < 1) return reply('!welcome enable/disable')
               if ((args[0]) === 'enable') {
               if (isWelkom) return reply('Udah aktif')
               welkom.push(from)
               fs.writeFileSync('./database/group/welcome.json', JSON.stringify(welkom))
               reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
               } else if ((args[0]) === 'disable') {
               welkom.splice(from, 1)
               fs.writeFileSync('./database/group/welcome.json', JSON.stringify(welkom))
               reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
               } else {
               reply('Enable untuk mengaktifkan, disable untuk menonaktifkan')
}
               break
case 'antilink':
                if (!isGroup) return reply('Khusus Group')
              if (!isBotGroupAdmins) return reply(`Bot Harus jadi Admin`)
              if (!q) return reply(`Pilih enable atau disable`)
              if (args[0].toLowerCase() === 'enable'){
              if (isAntilink) return reply(`Udah aktif`)
              anlink.push(from)
              fs.writeFileSync('./database/antilink.json', JSON.stringify(anlink))
              reply('*「 ANTILINK DI AKTIFKAN 」*\n\nYang Ngirim Link Group Bakal Ke Kick!')
              } else if (args[0].toLowerCase() === 'disable'){
              let anu = anlink.indexOf(from)
              anlink.splice(anu, 1)
              fs.writeFileSync('./database/antilink.json', JSON.stringify(anlink))
              reply('*「 ANTILINK DI NONAKTIFKAN 」*')
              } else {
              reply(`Pilih enable atau disable`)
}
        break
///
case 'toimg':
              if (!isQuotedSticker) return reply(`Reply sticker dengan caption .toimg
*Note :*`)
              reply(mess.wait)
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await gura.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply('Gagal, pada saat mengkonversi sticker ke gambar')
              buffer = fs.readFileSync(ran)
              gura.sendMessage(from, buffer, image, {quoted: ftrol, caption: 'Nih'})
              fs.unlinkSync(ran)
})
              break
case 'linkgc':
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return 
		    linkgc = await gura.groupInviteCode (from)
		    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
		    gura.sendMessage(from, yeh, text, {quoted: mek})
                    break
case 'join':
        try {
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
          hen = args[0];
          if (!q) return reply("Masukan link group");
          var codeInvite = hen.split("https://chat.whatsapp.com/")[1];
          if (!codeInvite) return reply("pastikan link sudah mekar!");
          var response = await gura.acceptInvite(codeInvite);
          reply("SUKSES");
        } catch {
          reply("LINK ERROR!");
        }
        break
case 'gifstiker': case 's':
case 'stickergif': case 'sticker': case 'stiker':
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await gura.downloadAndSaveMediaMessage(encmedia)
ran = '666.webp'
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
 console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
 console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply('error')
})
.on('end', function () {
console.log('Finish')
gura.sendMessage(from, fs.readFileSync(ran), sticker, {quoted:ftrol})
 fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await gura.downloadAndSaveMediaMessage(encmedia)
ran = '999.webp'
reply(monospace(mess.wait))
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
})
.on('end', function () {
console.log('Finish')
Rapa.sendMessage(from, fs.readFileSync(ran), sticker, {quoted:rep})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else {
reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
}
break
case 'speed':
	case 'ping':
			const timestamp = speed();
			const latensi = speed() - timestamp
			exec(`neofetch --stdout`, (error, stdout, stderr) => {
			const child = stdout.toString('utf-8')
			const teks = child.replace(/Memory:/, "Ram:")
			const pingnya = `_*${latensi.toFixed(4)} Detik*_`
			reply(pingnya)
			})
			break
case 'runtime':
    case 'test':
            run = process.uptime() 
            teks = `*${kyun(run)}*`
            reply(teks)
            break
case 'ppcp':
              case 'ppcouple':
              if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
               anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/ppcouple?apikey=IkyOgiwara`)
			buff1 = await getBuffer(anu.result.male)
			buttons = [{buttonId: `!ytkirbotz`,buttonText:{displayText: `Subrek YT : KirBotz×`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff1, "imageMessage", { thumbnail: buff1, })).imageMessage
              buttonsMessage = {footerText:'©KirBotz', imageMessage: imageMsg,
              contentText:`COWO`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gura.relayWAMessage(prep)
              buff2 = await getBuffer(anu.result.female)
              buttons = [{buttonId: `!ytkirbotz`,buttonText:{displayText: `Subrek YT : KirBotz×`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff2, "imageMessage", { thumbnail: buff2, })).imageMessage
              buttonsMessage = {footerText:'©KirBotz', imageMessage: imageMsg,
              contentText:`CEWE`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
             setTimeout( async () => {
 gura.relayWAMessage(prep)
}, 5000)
break
case 'lirik':
            if(!q) return reply('lagu apa?')
            let song = await hx.lirik(q)
            sendMediaURL(from,song.thumb,song.lirik)
            break
    case 'otaku':
            if(!q) return reply('judul animenya?')
            let anime = await hx.otakudesu(q)
            rem = `*Judul* : ${anime.judul}
*Jepang* : ${anime.jepang}
*Rating* : ${anime.rate}
*Produser* : ${anime.produser}
*Status* : ${anime.status}
*Episode* : ${anime.episode}
*Durasi* : ${anime.durasi}
*Rilis* : ${anime.rilis}
*Studio* : ${anime.studio}
*Genre* : ${anime.genre}\n
*Sinopsis* :
${anime.desc}\n\n*Link Batch* : ${anime.batch}\n*Link Download SD* : ${anime.batchSD}\n*Link Download HD* : ${anime.batchHD}`
            ram = await getBuffer(anime.img)
            gura.sendMessage(from,ram,image,{quoted:mek,caption:rem})
            break
    case 'komiku':
            if(!q) return reply(`judulnya?\n${prefix}komiku mao gakuin`)
            let komik = await hx.komiku(q)
            result = `*Title* : ${komik.title}\n
*Title Indo* : ${komik.indo}\n
*Update* : ${komik.update}\n
*Desc* : ${komik.desc}\n
*Chapter Awal* : ${komik.chapter_awal}
*Chapter Akhir* : ${komik.chapter_akhir}`
            sendMediaURL(from, komik.image,result)
            break
    case 'chara':
            if(!q) return reply(`gambar apa?\n${prefix}chara nino`)
            let im = await hx.chara(q)
            let acak = im[Math.floor(Math.random() * im.length)]
            let li = await getBuffer(acak)
            await gura.sendMessage(from,li,image,{quoted: mek})
            break
    case 'pinterest':
            if(!q) return reply('gambar apa?')
            let pin = await hx.pinterest(q)
            let ac = pin[Math.floor(Math.random() * pin.length)]
            let di = await getBuffer(ac)
            await gura.sendMessage(from,di,image,{quoted: mek})
            break
    case 'playstore':
            if(!q) return reply('lu nyari apa?')
            let play = await hx.playstore(q)
            let store = '❉─────────────────────❉\n'
            for (let i of play){
            store += `\n*「 _PLAY STORE_ 」*\n
- *Nama* : ${i.name}
- *Link* : ${i.link}\n
- *Dev* : ${i.developer}
- *Link Dev* : ${i.link_dev}\n❉─────────────────────❉`
            }
            reply(store)
            break
case 'chiisaihentai':
                case 'trap':
                case 'blowjob':
                case 'yaoi':
                case 'ecchi':
                case 'hentai':
                case 'ahegao':
                case 'hololewd':
                case 'sideoppai':
                case 'animefeets':
                case 'animebooty':
                case 'animethighss':
                case 'hentaiparadise':
                case 'animearmpits':
                case 'hentaifemdom':
                case 'lewdanimegirls':
                case 'biganimetiddies':
                case 'animebellybutton':
                case 'hentai4everyone':
              buff = await getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=DashBot`)
              buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              buttonsMessage = {footerText:'✗✗✗ Akira', imageMessage: imageMsg,
              contentText:`Subrek : KirBotz×`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: ftrol})
              gura.relayWAMessage(prep)
       
                    break
case 'bj':
                case 'ero':
                case 'cum':
                case 'feet':
                case 'yuri':
                case 'trap':
                case 'lewd':
                case 'feed':
                case 'eron':
                case 'solo':
                case 'gasm':
                case 'poke':
                case 'anal':
                case 'holo':
                case 'tits':
                case 'kuni':
                case 'kiss':
                case 'erok':
                case 'smug':
                case 'baka':
                case 'solog':
                case 'feetg':
                case 'lewdk':
                case 'waifu':
                case 'pussy':
                case 'femdom':
                case 'cuddle':
                case 'hentai':
                case 'eroyuri':
                case 'cum_jpg':
                case 'blowjob':
                case 'erofeet':
                case 'holoero':
                case 'classic':
                case 'erokemo':
                case 'fox_girl':
                case 'futanari':
                case 'lewdkemo':
                case 'wallpaper':
                case 'pussy_jpg':
                case 'kemonomimi':
                case 'nsfw_avatar':
               buff = await getBuffer(`https://api.lolhuman.xyz/api/random2/${command}?apikey=DashBot`)
                buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              buttonsMessage = {footerText:'✗✗✗ Akira', imageMessage: imageMsg,
              contentText:`Subrek : KirBotz×`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: ftrol})
              gura.relayWAMessage(prep)
        
                    break
case 'loli':
       case 'husbu':
       case 'milf':
       case 'cosplay':
       case 'wallml':
              let wipu = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`)).data
              let wipi = wipu[Math.floor(Math.random() * (wipu.length))]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(wipi))
		      buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1}]
              imageMsg = ( await gura.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'✗✗✗ Akira', imageMessage: imageMsg,
              contentText:`klik Next untuk ke gambar selanjut nya`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gura.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break
case 'nulis':
        case 'tulis':
               if (args.length < 1) return reply('Yang mau di tulis apaan?')
               teks = args.join(' ')
               reply(mess.wait)
               nulis = encodeURIComponent(teks)
               res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
               if (res.data.error) return reply(res.data.error)
               buff = Buffer.from(res.data.result.split(',')[1], 'base64')
               gura.sendMessage(from, buff, image, {quoted: mek, caption: mess.success}).catch(e => {
               return reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim File_')
})
               break
case 'blackpink':
                case 'neon':
                case 'greenneon':
                case 'advanceglow':
                case 'futureneon':
                case 'sandwriting':
                case 'sandsummer':
                case 'sandengraved':
                case 'metaldark':
                case 'neonlight':
                case 'holographic':
                case 'text1917':
                case 'minion':
                case 'deluxesilver':
                case 'newyearcard':
                case 'bloodfrosted':
                case 'halloween':
                case 'jokerlogo':
                case 'fireworksparkle':
                case 'natureleaves':
                case 'bokeh':
                case 'toxic':
                case 'strawberry':
                case 'box3d':
                case 'roadwarning':
                case 'breakwall':
                case 'icecold':
                case 'luxury':
                case 'cloud':
                case 'summersand':
                case 'horrorblood':
                case 'thunder':
                    if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api.lolhuman.xyz/api/textprome/${command}?apikey=DashBot&text=${ini_txt}`).then((gambar) => {
                        gura.sendMessage(from, gambar, image, {thumbnail: Buffer.alloc(0), caption: `Subrek : KirBotz×`, quoted : ftrol})
                    })
                    break
case 'wasted':
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
		    var imgbb = require('imgbb-uploader')
		    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
			ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
			owgi = await gura.downloadAndSaveMediaMessage(ger)
			data = await imgbb("91904762b2cd230ce1d861279bd6bf1d", owgi)
			buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/wasted?url=${data.display_url}&apikey=IkyOgiwara`)
			gura.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
		    } else {
			reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}wasted`)
		    }
		    break
		    case 'tahta':
		if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
		    buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/harta-tahta?text=${q}&apikey=IkyOgiwara`)
	      buttons = [{buttonId: `!ytkirbotz`,buttonText:{displayText: `Subrek YT : KirBotz×`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              buttonsMessage = {footerText:'©KirBotz', imageMessage: imageMsg,
              contentText:`Subrek YT : KirBotz×`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gura.relayWAMessage(prep)
break
case 'sewabot':
              gopeynya = 'https://telegra.ph/file/5d4301000e27dd1c952a5.jpg'
            buff = await getBuffer(gopeynya)
            teksnya = `

`
  buttons = [{buttonId: `${prefix}owner`,buttonText:{displayText: `👥 OWNER`},type:1}, { buttonId: `${prefix}payment`, buttonText: { displayText: '💳 PAYMENT' }, type: 1 }]
              imageMsg = (await gura.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              buttonsMessage = {footerText:'✗✗✗ Akira', imageMessage: imageMsg,
              contentText: teksnya,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: ftrol})
              gura.relayWAMessage(prep)
      break
case 'payment':
               list = []
               listmenu = [`gopay`]
               listmenuu = [`BAYAR DENGAN GOPAY`]
               nombor = 1
               startnum = 0
               for (let x of listmenu) {
               const yy = {title: '⬡-->' + nombor++,
    rows: [
       {
        title: `${listmenuu[startnum++]}`,
        description: ``,
        rowId: `${prefix}${x}`
      }
    ]
   }
        list.push(yy)
           }
               listmsg(from, `hai kak ${pushname} \n\nSilahkan pilih metode pembayaran di bawah ya !`,`  `, list)
               break
case 'gopay':
              fotogopay = `https://telegra.ph/file/5d4301000e27dd1c952a5.jpg`
            buff = await getBuffer(fotogopay)
            teksnya =`
Hai kak ${pushname}

Silahkan scan kode pembayaran di atas sesuai nominal!
AN: Akira

NOTE* JANGAN LUPA KIRIM BUKTI TRANSFER KEPADA OWNER!
`
  buttons = [{buttonId: `${prefix}bukti`,buttonText:{displayText: `KIRIM BUKTI TF`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              buttonsMessage = {footerText:'SUBREK YT : KirBotz×', imageMessage: imageMsg,
              contentText: teksnya,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: ftrol})
              gura.relayWAMessage(prep)
      break
case 'bukti':
    titid = `
hai kak ${pushname}

Jika sudah tf sesuai nominal silahkan kirim bukti ke owner ku ya!
              
wa.me/6287705048235`
   sendButMessage(from, titid, `SUBREK YT : KirBotz× `, [
          {
            buttonId: `${prefix}ytkirbotz`,
            buttonText: {
              displayText: `⬡ SUBREK ⬡`,
            },
            type: 1,
          },]);
        break;
		case 'tinyurl':
		if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
		    anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/tinyurl?url=${q}&apikey=IkyOgiwara`)
		    gura.sendMessage(from, `${anu.result}`, text, {quoted: mek})
		    break
		case 'cuttly':
		if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
		    anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cuttly?url=${q}&apikey=IkyOgiwara`)
		    gura.sendMessage(from, `• Hasil: ${anu.result.hasil}\n• Dibuat Pada: ${anu.result.create_at}`, text, {quoted: mek})
		    break
		case 'shorturl':
		if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
		    anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/shrturl?url=${q}&apikey=IkyOgiwara`)
		    gura.sendMessage(from, `${anu.result}`, text, {quoted: mek})
		    break
		    case 'meme':
case 'memek':
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}buypremium* untuk membeli premium`)
 buff = await getBuffer ('https://leyscoders-api.herokuapp.com/api/memeindo?apikey=IkyOgiwara')

buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `NEXT`},type:1}]
              imageMsg = (await gura.prepareMessageMedia(buff, "imageMessage", { thumbnail: buff, })).imageMessage
              buttonsMessage = {footerText:'©KirBotz', imageMessage: imageMsg,
              contentText:`klik Next untuk ke gambar selanjut nya`,buttons,headerType:4}
              prep = await gura.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gura.relayWAMessage(prep)
    
break
case 'pornhub':
                case 'glitch':
                case 'avenger':
                case 'space':
                case 'ninjalogo':
                case 'marvelstudio':
                case 'lionlogo':
                case 'wolflogo':
                case 'steel3d':
                case 'wallgravity':
                    if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
                    txt1 = args[0]
                    txt2 = args[1]
                    getBuffer(`https://api.lolhuman.xyz/api/textprome2/${command}?apikey=DashBot&text1=${txt1}&text2=${txt2}`).then((gambar) => {
                        gura.sendMessage(from, gambar, image, {thumbnail: Buffer.alloc(0), caption: `Subrek : KirBotz×`, quoted : ftrol})
                    })
                    break
case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
                case 'goldplaybutton':
                case 'silverplaybutton':
                case 'freefire':
                    if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=DashBot&text=${ini_txt}`).then((gambar) => {
                        gura.sendMessage(from, gambar, image, {thumbnail: Buffer.alloc(0), caption: `Subrek : KirBotz×`, quoted : ftrol}) 
                    })
                    break
case 'shadow':
                case 'cup':
                case 'cup1':
                case 'romance':
                case 'smoke':
                case 'burnpaper':
                case 'lovemessage':
                case 'undergrass':
                case 'love':
                case 'coffe':
                case 'woodheart':
                case 'woodenboard':
                case 'summer3d':
                case 'wolfmetal':
                case 'nature3d':
                case 'underwater':
                case 'golderrose':
                case 'summernature':
                case 'letterleaves':
                case 'glowingneon':
                case 'fallleaves':
                case 'flamming':
                case 'harrypotter':
                case 'carvedwood':
                    if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
                    ini_txt = args.join(" ")
                    getBuffer(`https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=DashBot&text=${ini_txt}`).then((gambar) => {
                        gura.sendMessage(from, gambar, image, {thumbnail: Buffer.alloc(0), caption: `Subrek : KirBotz×`, quoted : ftrol})
                    })
                    break
                case 'tiktok':
                case 'arcade8bit':
                case 'battlefield4':
                case 'pubg':
                    if (args.length == 0) return reply(`Example: ${prefix + command} LoL Human`)
                    txt1 = args[0]
                    txt2 = args[1]
                    getBuffer(`https://api.lolhuman.xyz/api/photooxy2/${command}?apikey=DashBot&text1=${txt1}&text2=${txt2}`).then((gambar) => {
                        gura.sendMessage(from, gambar, image, {thumbnail: Buffer.alloc(0), caption: `Subrek : KirBotz×`, quoted : ftrol})
                    })
                    break
//download
case 'tiktokdl': 
       case 'ttdl':
             
             if (!q) return reply('Linknya?')
             if (!q.includes('tiktok.com')) return reply(mess.error.Iv)
             reply(mess.wait)
             anu = await Tiktokdl(`${q}`)
            .then((data) => { sendMediaURL(from, data.result.watermark) })
            .catch((err) => { reply(String(err)) })
             break
      case 'tiktokmp4':
             
             if (!q) return reply('Linknya?')
             if (!q.includes('tiktok.com')) return reply(mess.error.Iv)
             reply(mess.wait)
             anu = await Tiktokdl(`${q}`)
            .then((data) => { sendMediaURL(from, data.result.nowatermark) })
            .catch((err) => { reply(String(err)) })
             break
case 'tiktokmp3':
if (!q) return reply('Linknya?')
if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.Iv)
if (args.length < 1) return reply('Link?')
lin = args[0]
reply(mess.wait)
hx.ttdownloader(lin).then(async (res) => {
console.log('[ TIKTOK ] downloader')
anu = res.nowm
fto = Mthumb
gura.sendMessage(from, fto, image, {quoted:mek, caption:`*TIKTOK MP3*\n\n•> Nowm : ${res.nowm}\n•> Wm : ${res.wm}\n•> Audio : ${res.audio}\n\n_Please wait, the media file is being sent it may take a few minutes_`, thumbnail:Bfake, contextInfo:{forwardingScore: 989, isForwarded: true}})
khs = await getBuffer(anu)
gura.sendMessage(from, khs, audio, {quoted:mek, mimetype:'audio/mp4', filename:'KirBotz.mp3', ptt:true})
})
break
case 'ytmp3':
if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
let isLinks = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
if (!isLinks) return reply(mess.error.Iv)
reply(mess.wait)
try {
yta(args[0])
.then(async(res) => {
const { dl_link, thumb, title, filesizeF, filesize } = res
axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then(async(a) => {
if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `*Data Successfully Obtained!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_For the duration of more than the limit is presented in the form of a link_`)
const captions = `*YT MP3*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Please wait, the media file is being sent it may take a few minutes_`
buff = await getBuffer(dl_link)
fak = await getBuffer(thumb)
gura.sendMessage(from, fak, MessageType.image, {quoted:mek, caption:captions})
gura.sendMessage(from, buff, MessageType.audio, {
"contextInfo": {
mimetype: 'audio/mp4',
text: 'KirBotz',
"forwardingScore": 1000000000,
isForwarded: true,
sendEphemeral: true,
"externalAdReply": {
"title": `${title}`,
"body": `${title}`,
"previewType": "PHOTO",
"thumbnailUrl": `${thumb}`,
"thumbnail": fak,
"sourceUrl": args[0]
}}, quoted:mek, ptt:true
}).catch(() => reply(mess.error.api))
})
})
} catch (err) {
reply(mess.error.api)
}
break
///
case 'restart':
             if(!isOwner && !isMe) return reply('Anda Bukan Owner')
             reply(mess.wait)
             exec(`node main`)
             reply('_Restarting Bot Success_')
             break
case 'bc':
             if(!isOwner && !isMe) return reply('Anda Bukan Owner')
             if (args.length < 1) return reply('teks?')
             anu = await gura.chats.all()
             if (isMedia && !mek.message.videoMessage || isQuotedImage) {
             const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
             bc = await gura.downloadMediaMessage(encmedia)
             for (let _ of anu) {
             	tes = `${body.slice(4)}`
             	gura.sendMessage(_.jid, bc, { contentText: `${tes}`, footerText: `_*${botName} Broadcast*_`, buttons: [{buttonId: `${prefix}menu`,buttonText:{displayText: '𝐌𝐞𝐧𝐮'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: tamnel, contextInfo: {mentionedJid: [sender]}}}, 'buttonsMessage')
}
             reply('Suksess broadcast')
             } else {
             for (let _ of anu) {
             	textt = `${body.slice(4)}`
             gura.sendMessage(_.jid, { contentText: `${textt}`, footerText: `_*${botName} Broadcast*_`, buttons: [{buttonId: `${prefix}menu`,buttonText:{displayText: '𝐌𝐞𝐧𝐮'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: tamnel, contextInfo: {mentionedJid: [sender]}}}, 'buttonsMessage')
}
             reply('Suksess broadcast')
}
             break
case 'setimg':
        	if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length == 0) {
          	boij = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
			delb = await gura.downloadMediaMessage(boij)
			fs.writeFileSync(`./media/gura.jpeg`, delb)
			reply('Sukses')
        	} else {
            reply(`Kirim gambar dengan caption ${prefix}setimg`)
          	}
			break
case 'ytkirbotz':
reply('*Subrek YT : https://youtube.com/channel/UC7NslQroUqQYzo2wDFBOUMg*')
break
case 'sc':
case 'sourcecode':
reply('https://youtu.be/5wTTTBreHLI\n*Tonton Video Nya Sc Di Desk*')
break
default:
if (budy.startsWith('>')){
console.log('Eval Owner>_<', 'green')
if (!isOwner && !itsMe) return reply(mess.only.ownerB)
try {
return gura.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted:mek})
} catch(err) {
e = String(err)
reply(e)
}
}

if (budy.startsWith('$')){
if (!itsMe && !isOwner) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${fake} :~ ${err}`)
if (stdout) {
reply(stdout)
}
})
}

}
if (isGroup && budy != undefined) {
	} else {
	console.log(color('[TEXT]', 'red'), 'Akira', color(sender.split('@')[0]))
	}		
	} catch (e) {
e = String(e)
if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Message : %s', color(e, 'green'))
}
	// console.log(e)
	}
}