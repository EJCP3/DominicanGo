const fetch = require('node-fetch') || globalThis.fetch;
fetch('http://localhost:4321/destinos')
    .then(res => res.text())
    .then(html => {
        const matches = html.match(/view-transition-name:[^";]*/g);
        const counts = {};
        matches?.forEach(m => counts[m] = (counts[m] || 0) + 1);
        const duplicates = Object.entries(counts).filter(x => x[1] > 1);
        console.log("DUPLICATES FOUND:", duplicates);
    })
    .catch(console.error);
