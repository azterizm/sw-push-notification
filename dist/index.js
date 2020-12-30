"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const web_push_1 = __importDefault(require("web-push"));
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
app.use(body_parser_1.default.json());
// put these .env in prod
const publicVapidKey = 'BLBhSQ6P2koy8NhplCWpol0sgxuuB2Ai7N3BPtvBv9ZSJEZym4HzhS17_6rJYgQSjdEkWMSQbvrXgIICbJJwx0Y';
const privateVapidKey = '0XENFr8bh5G0bULD6ZKa6XUQDs0s5zZOJpZC_NR5yz4';
web_push_1.default.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
    console.log('subscription', subscription);
    // send 201
    res.status(201).json({});
    // create payload
    const payload = JSON.stringify({ title: 'Push Test' });
    // pass object into sendNotification
    web_push_1.default.sendNotification(subscription, payload)
        .catch(err => console.error(err));
});
app.post('/test', (_, res) => {
    const subscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/erbeHm-klCI:APA91bE8m_FsPz99ySe1JIJBk1Z6uUIZ1EUa0kKnGHcfGpgpoT2Jb3oq9WcxoWnlPepDuw_vhNtJCKwwTE1UxP0FPWpMiHycrmb4m1ClMC2r8gGf9oAqT5b4FAHFDm-gN6aUc1w2iD0f',
        expirationTime: null,
        keys: {
            p256dh: 'BEtfa5qJ2Bo7hQRiswWvhadpVf2UH5KF6t39yAiuAevlj03hkl6uDkDkCRvb8FcXsrtF3BMQBrPDQj03bPFIZVU',
            auth: 'F3yuY8315owY5IRlVINWUQ'
        }
    };
    const payload = JSON.stringify({ title: 'I am from SERVER!' });
    web_push_1.default.sendNotification(subscription, payload).then(() => {
        res.status(201).json({});
    }).catch(() => {
        res.status(404).send('Could not find the person you were looking for.');
    });
});
app.listen(port, () => console.log('Server at', port));
//# sourceMappingURL=index.js.map