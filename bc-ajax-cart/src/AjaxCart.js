import $ from 'jquery';
import PageManager from '../../PageManager';
import utils from '@bigcommerce/stencil-utils';

import ProgressButton from '../utils/ProgressButton';

export default class AjaxCart extends PageManager {



  bindAjaxBtn($btn, func){

    let progressButton = new ProgressButton();
    let parseResp =this._parseResponse;

    $btn.on('click', function(e){

      let $button = $(this);

      let form = $button.closest('form');
      let quantity = $button.closest('form').find('input.product-quantity').val();

      // Bail out if browser doesn't support FormData
      if (window.FormData === undefined) {
        return;
      }

      const formData = new FormData(form[0]);

      e.preventDefault();


      // Update the button state
      progressButton.progress($button);

      // Ajax add item to cart
      utils.api.cart.itemAdd(formData, (err, response) => {
        // Parse the ajax response so we can pass it to the message.
        response = parseResp(err, response, this.productTitle, quantity);

        // Reset the button state
        progressButton.complete($button);

        let addToCartBtn = $button.find('.button-text');

        // Update the mini cart & clear inputs if success
        if (response.status === 'success') {

          addToCartBtn.html('Added');

          $('.button-cart-toggle').click();

          setTimeout(() => {
              addToCartBtn.html('Add to cart');
          }, 1500);
        }else{
          addToCartBtn.html('Error');

          setTimeout(() => {
              addToCartBtn.html('Add to cart');
          }, 1500);
        }

        if(func){
          func($button);
        }
      });

    });
  }


  _parseResponse(err, response, title, quantity) {
    let message = '';
    let status = '';

    if (err || response.data.error) {
      status = 'error';

      if (response.data.error) {
        message = response.data.error;
      } else {
        message = this.context.messagesProductGeneral;
      }

    } else {
      status = 'success';
      // message = this.context.messagesProductAddSuccess;
      // message = message.replace('*product*', `"${title}"`);
    }

    return {
      status: status,
      message: message
    }
  }
}
