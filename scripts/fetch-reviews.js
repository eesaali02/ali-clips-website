const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PLACE_ID = 'PLACE_ID_HERE'; // Replace after finding your Place ID (see README)
const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
    console.error('GOOGLE_PLACES_API_KEY environment variable is not set');
    process.exit(1);
}

const url = 'https://maps.googleapis.com/maps/api/place/details/json'
    + '?place_id=' + PLACE_ID
    + '&fields=reviews'
    + '&reviews_sort=newest'
    + '&key=' + API_KEY;

https.get(url, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        const result = JSON.parse(body);
        if (result.status !== 'OK') {
            console.error('Places API error:', result.status, result.error_message || '');
            process.exit(1);
        }

        const reviews = (result.result.reviews || [])
            .filter(r => r.rating === 5)
            .map(r => ({
                author:        r.author_name,
                rating:        r.rating,
                text:          r.text,
                time:          r.time,
                relative_time: r.relative_time_description
            }));

        const out = { updated: new Date().toISOString(), reviews };
        fs.writeFileSync(
            path.join(__dirname, '..', 'reviews.json'),
            JSON.stringify(out, null, 2)
        );
        console.log('Wrote ' + reviews.length + ' five-star review(s) to reviews.json');
    });
}).on('error', err => {
    console.error('Request failed:', err.message);
    process.exit(1);
});
