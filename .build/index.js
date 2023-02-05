const fs = require('fs');
const fg = require('fast-glob');
const getPost = require('./marked');

// Base directory where the site will be generated
// We're using .dist so it doesn't show up in Obsidian
const output = '.build/dist/';
if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
}

const entries = fg.sync(['**/*.md'], { dot: false, ignore: ['node_modules'] });
console.log(entries);


// Start building Urls
entries.forEach((post) => {
    // Get post
    const {meta, html} = getPost(post);
    if(!meta.publish){
        // Don't publish pages that are not flagged for publish
        return;
    }

    // we replace the journal directory so that it matches the urls structure I want
    // this has potential to have collisions in the future, but that's on me
    const url = post.replace('journal/', '').replace('.md', '');
    console.log(url);

    // Base directory for url
    const urlDirectory = output + url;
    if (!fs.existsSync(urlDirectory)) {
        fs.mkdirSync(urlDirectory, { recursive: true });
    }

    // Generate HTML
    fs.writeFile(
        `${urlDirectory}/index.html`,
        html,
        (e) => { if(e){ console.log(e) }
    });

    // Generate HomePage

    // Generate Sitemap

})