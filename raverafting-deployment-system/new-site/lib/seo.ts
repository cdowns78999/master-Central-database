import { Metadata } from 'next';

/**
 * get404Metadata - Generates the canonical SEO metadata for the 404 Fail page.
 * Mirrors the original WordPress Yoast/Facebook Thumb Fixer config.
 */
export function get404Metadata(): Metadata {
    const title = "404 Fail | RaverRafting";
    const description = "Mission Compromised. We searched the entire rave, but this post went MIA. Time to regroup at the main stage.";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            images: [
                {
                    url: "/images/404-default.png",
                    width: 1200,
                    height: 630,
                    alt: "404 Fail - RaveRafting",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/404-default.png"],
        },
    };
}
