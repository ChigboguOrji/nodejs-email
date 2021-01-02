const app = require('../')
const req = require('supertest')(app)

describe('Mail Tests', () => {
    it('200 - Pings server status', async () => {
        const res = await req.get('/')
        expect(res.statusType).toBe(2)
        expect(res.status).toBe(200)
    })

    it('404 - Tests invalid routes', async () => {
        const res = await req.get('/invalid-route')
        expect(res.statusType).toBe(4)
        expect(res.status).toBe(404)
        expect(res.body.message).toBeTruthy()
    })
    
    it('200 - Sends message', async () => {
        const payload = {
            title: 'Mailing via nodemailer in nodejs apps',
            msg: 'Hey there! I am Chigbogu Bright Orji, a passionate web developer, I have experiences in JavaScript/Nodejs and currently taking up golang. This email was a test mail sent from my server.',
            recipients: ['brightorji60@gmail.com', 'babyorji@gmail.com']
        }
        const res = await req.post('/send').send(payload)
        expect(res.statusType).toBe(2)
        expect(res.status).toBe(200)
        expect(res.body.message).toBeTruthy()
    })
})