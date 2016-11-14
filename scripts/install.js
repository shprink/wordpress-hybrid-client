#!/usr/bin/env node

var fs = require('fs-extra');

copy('../dist/config.cson', '../config/config.cson');
copy('../dist/menu.json', '../config/menu.json');
copy('../dist/config.xml', '../config.xml');
copy('../dist/config.scss', '../config/config.scss');
copy('../dist/index.js', '../config/index.js', true);
copy('../dist/templates', '../config/templates');
copy('../release.sh.dist', '../release.sh');

function copy(source, target, overwrite) {
    if (!overwrite && fs.existsSync(target)) {
        console.log('the destination already exist, will not overwrite: ' + target);
        return;
    }
    fs.copy(source, target, function(err) {
        if (err) return console.error(err)
        console.log('success: ' + target)
    })
}
