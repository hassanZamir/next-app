declare namespace NodeJS {
    interface ProcessEnv {
        PROXY_MODE: string;
        STATIC_PATH: string;
        API_URL: string;
        API_KEY: string;
        PUSHER_KEY: string,
        MEDIA_BASE_URL: string,
        TRULIOO_FE_KEY: string,
        TRULIOO_MS_URL: string,
        DYNAMIC_PRICING_FORM: string,
    }
}

declare namespace jest {
    interface Options {
        media?: string;
        modifier?: string;
        supports?: string;
    }

    interface Matchers<R> {
        toHaveStyleRule(property: string, value?: Value, options?: Options): R;
    }
}
