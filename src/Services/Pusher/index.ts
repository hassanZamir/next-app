let _localPusher: any = null;
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
                          
                        const channel = _localPusher.subscribe(name);
                        resolve(channel);
                    }).catch((err) => {
                        reject("FAILED LOAD PUSHER");
                    });
            } else {
                const channel = await _localPusher.subscribe(name);
                resolve(channel);
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
