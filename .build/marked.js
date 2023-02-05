const fs = require('fs');
const fm = require("front-matter");
const marked = require("marked");
const Handlebars = require("handlebars");
const template = fs.readFileSync('.build/templates/post.handlebars', "utf8");
const render = Handlebars.compile(template);

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
        const hljs = require("highlight.js");
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        return hljs.highlight(code, {language: validLanguage}).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

const getPost = postPath => {
    const data = fs.readFileSync(postPath, "utf8");
    const content = fm(data);
    const meta = content.attributes;
    const body = marked.parse(content.body);
    const html = render({meta, body});
    return {meta, html};
};

module.exports = getPost;