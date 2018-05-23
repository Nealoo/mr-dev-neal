var utils = require ('@bigcommerce/stencil-utils');
var $ = require ('jquery');

function isHTMLPage(content) {
    return content.indexOf('<html') > -1 && content.indexOf('<body') > -1 && content.indexOf('<header') > -1;
}

function getUrlName() {

    let urlArray = window.location.href.split('?')[0].split('/').reverse();

    let getName = string => {
        return string.replace('.html','').toLowerCase();
    };

    if( urlArray[0] ){
        return getName(urlArray[0]);
    }else{
        return getName(urlArray[1]);
    }

}

function getCmsPageContent(name, $target, doReplace) {
    utils.api.getPage('/'+ getUrlName() +'-'+name, {}, (err, content) => {
        if(!err && !isHTMLPage(content) ){
            if(doReplace){
                $target.html(content);
            }else{
                $target.append(content);
            }
        }
    });
}

module.exports = getCmsPageContent;

// v 0.0.2 todo list
// add callback, run after loaded.
// add get blog by name and by tag function
// add get cms page by complete name function

// insert cms block to specific page by its url name

// code in brand.js

// good points:
// keep updating for all, update once, run everywhere
// easy to manage

// add bc-help package
// generate mr-bc-help.txt  then add into gitignore
// inject description :
// {{inject "productJson" product}}
// if(productJson.description){
//   console.log(JSON.parse( productJson.description.replace(/<p>|<\/p>|<div>|<\/div>/gm,'') ));
// }

// workshop presentation time:
// must show a auto install css, auto add js to global.js 's plugin
// maybe go to top
