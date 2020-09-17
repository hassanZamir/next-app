const getChannel = (name: string, config: { cluster: string, encrypted: boolean, authTransport?: string, authEndpoint?: string, auth?: any}) => {
    return new Promise(async (resolve, reject) => {
        const pusherKey = process.env.PUSHER_KEY;
        const pusherId = typeof window !== "undefined" && pusherKey;

        if (pusherId && name) {
            import('pusher-js')
                .then((pusherModule: any) => {
                    const Pusher = pusherModule.default;
                    const _pusher = new Pusher(pusherId, config);
                    resolve(_pusher.subscribe(name));
                }).catch((err) => {
                    reject("FAILED LOAD PUSHER");
                });
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
