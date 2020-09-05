let _localPusher: any = null;
let _channel: any = null;
const pusherKey = process.env.PUSHER_KEY;

const getChannel = (name: string) => {
    return new Promise(async (resolve, reject) => {
        const pusherId = typeof window !== "undefined" && pusherKey;
        if (pusherId && name) {
            if (!_localPusher) {
                import('pusher-js')
                    .then((pusherModule: any) => {
                        const Pusher = pusherModule.default;
                        const _localPusher = new Pusher(pusherId, {
                            cluster: 'ap4',
                            encrypted: true
                        } as any);
                        
                        if (!_channel) _channel = _localPusher.subscribe(name);
                        resolve(_channel);
                    }).catch((err) => {
                        reject("FAILED LOAD PUSHER");
                    });
            } else {
                if (!_channel) _channel = _localPusher.subscribe(name);
                resolve(_channel);
            }
        } else {
            reject("PUSHER KEY NOT SET");
        }
    });
}

const subscribe = (key: string, channel: any, callback: any) => {
    channel.bind(key, callback);
}

export const NotificationPusher = {
    getChannel: getChannel,
    subscribe: subscribe
}
