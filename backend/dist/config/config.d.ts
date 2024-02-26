declare const config: {
    readonly node_env: any;
    readonly server: {
        readonly port: any;
        readonly url: any;
    };
    readonly cors: {
        readonly cors_origin: any;
    };
    readonly jwt: {
        readonly access_token: {
            readonly secret: any;
            readonly expire: any;
        };
        readonly refresh_token: {
            readonly secret: any;
            readonly expire: any;
            readonly cookie_name: any;
        };
    };
};
export default config;
