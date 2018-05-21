# mr-dev-neal

npm packages collection for org : @mr-dev-neal

## packages list

* bc-global-compare
> npm i @mr-dev-neal/bc-global-compare -S

save comparing products into cookie, so you can comparing products from different pages.

* bc-get-cmspage
> npm i @mr-dev-neal/bc-get-cmspage -S

* your products url format is `your-store.com/product1`  `your-store.com/product2`
* and you want to add a cms description block for all your products
* then create some cms block called `product1-description`  `product2-description`
* if you don't want to create description for a product then just simply don't create.
* then go to `product.js`
* do this
```js
import getPage from '@mr-dev-neal/bc-get-cmspage'

$target = $('.where-you-want-it-be');

if( /* you want to replace all content inside $target ? */  ){
  isReplace = true;
}else{
  isReplace = false;
}

getPage('description', $target, isReplace);
```
