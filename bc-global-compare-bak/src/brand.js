import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';
import { api } from '@bigcommerce/stencil-utils';

export default class Brand extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        this.initBannerAndDescription();
        this.getRelatedBlog();
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.brandProductsPerPage;
        const requestOptions = {
            template: {
                productListing: 'brand/product-listing',
                sidebar: 'brand/sidebar',
            },
            config: {
                shop_by_brand: true,
                brand: {
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            showMore: 'brand/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    initBannerAndDescription() {
        let brandName = this.getBrandName();

        api.getPage('/brand-content-'+ brandName +'/', {}, (err, content) => {

            if(!err && !this.isHTMLPage(content) ){
                $('.brand-description-text').html(content);

                if($('[data-slick]').length){
                    $('[data-slick]').slick();
                }
            }

        });
    }

    isHTMLPage(content) {
        return content.indexOf('<html') > -1 && content.indexOf('<body') > -1 && content.indexOf('<header') > -1;
    }

    getBrandName() {
        return window.location.href.split('?')[0].split('/').reverse()[0].replace('.html','').toLowerCase();
    }

    getRelatedBlog() {

        let brandName = this.getBrandName();

        let $blogArea = $('.brand-related-blogs');

        $.ajax({
            url: '/blog/tag/' + brandName,
            type: 'GET',
            dataType: 'html'
        }).done(function(data) {
            var blogPage = $('.page', data);

            // if there are blogs under this tag
            if( blogPage.find('article').length ){
                $blogArea.html( blogPage.html() );
            }


            //console.log(blogPage.html());
            // var blogPage = $('.page', data).filter(function() {
            //         //console.log( $(this).find('.form-label').text().trim()  );
            //         //console.log(Boolean( $(this).find('.form-label').text().trim().indexOf('Colour') > -1 ) );
            //         return $(this);//.find('.form-label').text().trim().indexOf('Colour') > -1 ;
            //     })
            //     .find('.form-option');
            // // Append swatches;console.log(thisSwatches);
            // if (thisSwatches.length > 0) {
            //     thisSwatches.wrapAll('<div class="cnz-swatch"></div>').parent().appendTo(thistarget);
            //
            //     var colorTitle = thisSwatches.first().addClass('active').find('.form-option-variant').attr('title')
            //     thistarget.find('.card-sub-title').html(colorTitle);
            //
            //     thisSwatches.each(function(index, ele){
            //         $(ele).click(function(){
            //             var colorTitle = $(this).find('.form-option-variant').attr('title');
            //             $(this).addClass('active').siblings().removeClass('active');
            //             thistarget.find('.card-sub-title').html(colorTitle);
            //         });
            //     });
            // } // end if
        }); // end ajax done
    }
}
