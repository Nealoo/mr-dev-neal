import $ from 'jquery';
import _ from 'lodash';
import swal from 'sweetalert2';

const removeMessage = 'At least 2 products are needed to make a valid comparison.';//this.context.compareRemoveMessage;

function decrementCounter(counter, item) {

    //update counter to cookieCounter
    counter = getCounterCookie();

    const index = counter.indexOf(item);

    if (index > -1) {
        counter.splice(index, 1);
        if(counter.length){
            createCookie('cookiesCompare', counter, 1);
        }else{
            createCookie('cookiesCompare', [], 1);
        }
    }
}

function incrementCounter(counter, item) {

    //update counter to cookieCounter
    counter = getCounterCookie();

    if(counter.indexOf(item) == -1){
        counter.push(item);
        createCookie('cookiesCompare', counter, 1);
    }

}

function resetCounterCookie(productId){
    let newProCookie = productId.replace('/compare/','').split('/');
    createCookie('cookiesCompare', newProCookie, 1);
}

function updateCounterNav(counter, $link, urlContext) {

    //update counter to cookieCounter
    counter = getCounterCookie();

    if (counter.length !== 0) {
        if (!$link.is('visible')) {
            $link.addClass('show');
        }
        $link.attr('href', `${urlContext.compare}/${counter.join('/')}`);
        $link.find('span.countPill').html(counter.length);
    } else {
        $link.removeClass('show');
    }
}

function getCounterCookie(){
    let thisCookie = readCookie('cookiesCompare');
    if(thisCookie){
        if(thisCookie.indexOf(',') > -1){
            thisCookie = thisCookie.split(',');
        }else{
            thisCookie = Array(thisCookie);
        }
    }else{
        return [];
    }
    return thisCookie;
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

export default function (urlContext) {
    let products;

    // tick the checkbox for all the checkbox
    let CompareCookieProduct = getCounterCookie();
    CompareCookieProduct.forEach(function(prdt){
        $('#compare-'+prdt).click();
    });

    const $checked = $('body').find('input[name="products\[\]"]:checked');
    const $compareLink = $('a[data-compare-nav]');

    // if ($checked.length !== 0) {
    //     products = _.map($checked, element => element.value);

    //     updateCounterNav(products, $compareLink, urlContext);
    // }
    if (getCounterCookie().length !== 0) {
        products = _.map($checked, element => element.value);

        updateCounterNav(products, $compareLink, urlContext);
    }

    const compareCounter = products || [];

    $('body').on('click', '[data-compare-id]', event => {
        const product = event.currentTarget.value;
        const $clickedCompareLink = $('a[data-compare-nav]');

        if (event.currentTarget.checked) {
            incrementCounter(compareCounter, product);
        } else {
            decrementCounter(compareCounter, product);
        }

        updateCounterNav(compareCounter, $clickedCompareLink, urlContext);
    });

    $('body').on('submit', '[data-product-compare]', event => {
        const $this = $(event.currentTarget);
        // const productsToCompare = $this.find('input[name="products\[\]"]:checked');

        // if (productsToCompare.length <= 1) {
        if (getCounterCookie().length <=1) {
            swal({
                text: 'You must select at least two products to compare',
                type: 'error',
            });
            event.preventDefault();
        }
    });

    $('body').on('click', 'a[data-compare-nav]', () => {
        // const $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

        // if ($clickedCheckedInput.length <= 1) {
        if (getCounterCookie().length <=1) {
            swal({
                text: 'You must select at least two products to compare',
                type: 'error',
            });

            return false;
        }
    });



    $('body').on('click', '[data-comparison-remove]', event => {

        if (getCounterCookie().length <= 2) {
            swal({
                text: removeMessage,
                type: 'error',
            });
            event.preventDefault();
        }else{
            console.log('call reset cookie');
            resetCounterCookie( $(event.currentTarget).attr('href') );
        }
    });
}
