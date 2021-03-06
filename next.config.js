const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const nextRuntimeDotenv = require("next-runtime-dotenv");

const withConfig = nextRuntimeDotenv({ public: ["CloudinaryMS_URL", "TRULIOO_FE_KEY", "API_URL", "API_KEY", "PUSHER_KEY", "MEDIA_BASE_URL"] });

const nextConfig = {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
        },
        browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
        },
    },
    publicRuntimeConfig: {
        PROXY_MODE: process.env.PROXY_MODE,
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        STATIC_PATH: process.env.STATIC_PATH,
        PUSHER_KEY: process.env.PUSHER_KEY,
        MEDIA_BASE_URL: process.env.MEDIA_BASE_URL,
        CloudinaryMS_URL: process.env.CloudinaryMS_URL,
        TRULIOO_FE_KEY: process.env.TRULIOO_FE_KEY,

    },
    env: {
        PUSHER_KEY: process.env.PUSHER_KEY,
        API_URL: process.env.API_URL,
        MEDIA_BASE_URL: process.env.MEDIA_BASE_URL,
        CloudinaryMS_URL: process.env.CloudinaryMS_URL,
        TRULIOO_FE_KEY: process.env.TRULIOO_FE_KEY,
        TRULIOO_MS_URL: process.env.TRULIOO_MS_URL,
        DYNAMIC_PRICING_FORM: process.env.DYNAMIC_PRICING_FORM,
    }
};

module.exports = withConfig(
    withPlugins([[withCSS], [withSass], [withBundleAnalyzer]], nextConfig)
);
