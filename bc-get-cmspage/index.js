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
