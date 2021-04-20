const browserSync = require('browser-sync').create();
const asciidoctor = require('@asciidoctor/core')();
const asciidoctorReveiljs = require('@asciidoctor/reveal.js');

asciidoctorReveiljs.register();

asciidoctor.convertFile('index.adoc', {backend: 'revealjs'});

browserSync.init({
    server: './',
    files: [
        {
            match: '*.adoc',
            fn: function (event, _file) {
                if (event === 'change') {
                    asciidoctor.convertFile('index.adoc', {backend: 'revealjs'});
                    browserSync.reload('index.html');
                }
            }
        }
    ]
});
