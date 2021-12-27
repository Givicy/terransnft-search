import { Analytics } from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

export const analytics = Analytics({
    app: 'terransnft-search-app',
    plugins: [
        {
            name: 'terransnft-search-plugin',
            page: ({ payload }) => {
                console.log('page view', payload);
            },
            track: ({ payload }) => {
                console.log('track', payload);
            }
        },
        googleAnalytics({ trackingId: 'UA-215931387-1' })
    ]
});