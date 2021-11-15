const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')
join = '\`\`\`New Member\`\`\` \n \`\`\`Nama :\`\`\` \n \`\`\`Askot : \`\`\` \n \`\`\`Umur :\`\`\` \n \`\`\`Status :\`\`\` \n\n - [ Semoga betah ya:) ] -'
leave = '\`\`\`Sayonaraa\`\`\`'

teks = `${join}`
let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (gura, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await gura.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await gura.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(gura.user.jid)) {
            gura.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik .menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(gura.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await gura.groupMetadata(anu.jid)
           /*
           https://api.dhamzxploit.my.id/api/canvas/welcome?pp=https://telegra.ph/file/205076f59c7c9e76b5a64.jpg&name=${encodeURI(anu_user)}&bg=https://telegra.ph/file/3d0c3581d7676d6cfbdd2.png&grupname=${encodeURI(mdata.subject)}&member=${memeg}
           https://api.dhamzxploit.my.id/api/canvas/goodbye?pp=https://telegra.ph/file/205076f59c7c9e76b5a64.jpg&name=${encodeURI(anu_user)}&bg=https://telegra.ph/file/3d0c3581d7676d6cfbdd2.png&member=${memeg}
           */
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = gura.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`https://api.dhamzxploit.my.id/api/canvas/welcome?pp=https://telegra.ph/file/205076f59c7c9e76b5a64.jpg&name=${encodeURI(anu_user)}&bg=https://telegra.ph/file/3d0c3581d7676d6cfbdd2.png&grupname=${encodeURI(mdata.subject)}&member=${memeg}`)
        gura.sendMessage(anu.jid, { contentText: `Asalamualaikum @${anu.participants[0].split("@")[0]} \nwelkam tu tiki" land  \nJangan lupa intro asu \nNama : \nUmur : \nAskot : \nStatus :\n \nSEMOGA ORA BETAH :v`, footerText: '✗✗✗ Akira', buttons: [{ buttonId: `!selamatdatang`, buttonText: { displayText: 'HAMLO CUK' }, type: 1 }], headerType: 6, locationMessage: { degreesLatitude: 0, degreesLongitude: 0, jpegThumbnail: buff }}, 'buttonsMessage')
       } 

      if (anu.action == "remove" && !mem.includes(gura.user.jid)) {

        mdata = await gura.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = gura.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff2 = await getBuffer(`https://api.dhamzxploit.my.id/api/canvas/goodbye?pp=https://telegra.ph/file/205076f59c7c9e76b5a64.jpg&name=${encodeURI(anu_user)}&bg=https://telegra.ph/file/3d0c3581d7676d6cfbdd2.png&member=${memeg}`)
        gura.sendMessage(anu.jid, { contentText: `Ngapain Keluar? Mo Ngocok Pasti @${anu.participants[0].split("@")[0]}🗿`, footerText: '✗✗✗ gura', buttons: [{ buttonId: `!bay`, buttonText: { displayText: 'PENAKKE NGOCOKMU' }, type: 1 }], headerType: 6, locationMessage: { degreesLatitude: 0, degreesLongitude: 0, jpegThumbnail: buff2 }}, 'buttonsMessage')    
        }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
