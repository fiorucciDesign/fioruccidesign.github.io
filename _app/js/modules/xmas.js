module.exports = function () {

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

    "use strict";

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variables rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = "xmas",
            defaults = {
                propertyName: "value"
            };

        // The actual plugin constructor
        function Xmas ( element, options ) {
            this.element = element;

            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend( Xmas.prototype, {
            init: function() {

                // Place initialization logic here
                // You already have access to the DOM element and
                // the options via the instance, e.g. this.element
                // and this.settings
                // you can add more functions like the one below and
                // call them like the example below

                var wH = $(window).height();
                var panelsTotal = 11;

                this.positionPanels();
                this.initScroll();
                // this.glitterTime();
                this.dev();
                // this.glitter();
            },


            dev: function( ) {

            },

            glitterTime: function( ) {
              var winH = $(window).height();
              var winW = $(window).width();
              var i;
              console.log('?')
              $(document).ready(function() {
                // window.setInterval(function(){
                  for (i = 0; i < 40; i++) {
                    var l = Math.floor(Math.random() * winW);
                    var t = Math.floor(Math.random() * winH);
                    var moveRan = 1 + Math.floor(Math.random() * (2 - 1 + 1))

                    $('<div class="glitterTime-speckle gT-s-move-'+moveRan+'" style="top: '+t+'px; left: '+l+'px;"></div>')
                      .appendTo('.glitterTime')
                      // .delay(3000)
                      // .queue(function() {
                      //   $(this).remove();
                      // });
                  }
                // }, 1000);
              });

            },


            glitter: function() {

              window.setInterval(function(){
                var wH = $(window).height();
                var wW = $(window).width();
                var i;
                for (i = 0; i < 20; i++) {
                              var t = Math.floor(Math.random() * wH) + 1;
                var l = Math.floor(Math.random() * wW) + 1;
                  console.log(i)
                  $('body').prepend('<div class="glitter" style="left: '+l+'px; top:'+t+'px;"></div>')
                }
              }, 8000);

            },

            positionPanels: function ( triggerAreas ) {
              var i;
              $(document).ready(function() {

                var winHeight = $(window).height();
                var winWidth = $(window).width();

                // Panels
                var panelsLength = $('.panel').length;
                $('.panel').css('height', winHeight + 'px');


                // Panes
                // Pane Width Unit
                var unit = Math.round(winHeight * (5/7)/2);
                // var fullPaneWidth = unit*4;
                $('.panes').css('width', unit*2 + 'px');
                $('.panes').css('margin-left', -unit + 'px' );
                $('.pane').css(unit + 'px');

                // Heroes
                var heroWidth = unit*2;
                // $('.panel-hero div').width(heroWidth);

                // Gutters
                // Gutter sizes
                var docHeight = $('.content').height();
                $('.xHero').width(winWidth);
                $('.xHero').height(winHeight);
                $('.xHero div').width('1923px');
                // Gutter mask container
                $('.xHeroContainer-mask').css({
                  'height': winHeight + 'px',
                });

                var i;
                for (i = 1; i < $('.scene').length; i++) {
                  var h = $('.scene-' + i).height();
                  $('.gutter-' + i).width(h*2);
                }
              });
            },

            initScroll: function( triggerAreas ) {

              var winHeight = $(window).height();
              var controller = new ScrollMagic.Controller();


              var getTweenStyle = function (el, style) {

                var tweenStyle1 = new TimelineMax()
                .add([
                  TweenMax.to($('.pane-0 > div', el), 1, {y:"100%"}),
                  TweenMax.to($('.pane-1 > div', el), 1, {x:"100%"}),
                  TweenMax.to($('.pane-2 > div', el), 1, {y:"-100%"}),
                  TweenMax.to($('.pane-3 > div', el), 1, {x:"-100%"}),
                ]);

                console.log(style)

                if ( style == 1 ) {
                  return ( tweenStyle1 );
                }
              }

              $(document).ready(function() {

                var tweenIntro = new TimelineMax()
                .add([
                  TweenMax.to($('.intro-window-1'), 1, {x:"-100%"}),
                  TweenMax.to($('.intro-window-2'), 1, {x:"100%"})
                ]);

                // init intro scroll
                  var introScroll = new ScrollMagic.Scene({
                    triggerElement: ".panel-0",
                    duration: "100%",
                    triggerHook: 0,
                  })
                  .on("enter", function (event) {
                    $('.panel-0').addClass('panel-active');
                  })
                  .on("leave", function (event) {
                    $('.panel-0').removeClass('panel-active');
                  })
                  .setTween( tweenIntro )
                  .addTo(controller);


                // init scroll for each pane
                $('.panel-panes').each(function(index, obj) {

                  var i = index;
                  var $el = $(this);
                  var triggerElement = $(this).attr('data-trigger');
                  var tweenStyle = $el.attr('data-tweenStyle');
                  var fetchedTweenStyle = getTweenStyle(this, tweenStyle);
                  var panelPanes = new ScrollMagic.Scene({
                    triggerElement: "." + triggerElement,
                    duration: "100%",
                    triggerHook: 0.5,
                  })
                  .on("enter", function (event) {
                    $el.addClass('panel-active');
                  })
                  .on("leave", function (event) {
                    $el.removeClass('panel-active');
                  })
                  .setTween( fetchedTweenStyle )
                  .addTo(controller);

                });

                $('.fg').each(function(index, obj) {
                  $(this).height(winHeight*2);
                  var i = index + 2;
                  //foregrounds
                  var panelPanes = new ScrollMagic.Scene({
                    triggerElement: ".scene-" + i,
                    duration: "300%",
                    triggerHook: 1,
                  })
                  .on("enter", function (event) {

                  })
                  .on("leave", function (event) {

                  })
                  .setTween($('.scene-' + i + ' .fg div'), 1, {y:"200%"})
                  .addIndicators({name: "fg"})
                  .addTo(controller);
                });

                $('.scene-cta').each(function(index, obj) {
                  var i = index + 1;
                  //foregrounds
                  var panelPanes = new ScrollMagic.Scene({
                    triggerElement: ".scene-" + i,
                    duration: "300%",
                    triggerHook: 0,
                    offset: 100,
                  })
                  .on("enter", function (event) {
                    $('.scene-' + i + ' .scene-cta').addClass('scene-cta-active');
                  })
                  .on("progress", function (event) {
                    if (event.scrollDirection === "FORWARD" && event.progress > 0.7) {
                      $('.scene-' + i + ' .scene-cta').removeClass('scene-cta-active');
                    }
                  })
                  .on("leave", function (event) {
                    // console.log('e',event)
                    $('.scene-' + i + ' .scene-cta').removeClass('scene-cta-active');
                  })
                  .addIndicators({name: "fg"})
                  .addTo(controller);

                });

                // init scroll for each hero
                $('.panel-hero').each(function(index, obj) {

                  var i = index;
                  var $el = $(this);
                  var triggerElement = parseInt($(this).attr('data-trigger')) + 1;
                  var pinEl = parseInt($(this).attr('data-trigger'));
                  var setPin = new ScrollMagic.Scene({
                    triggerElement: ".panel-" + pinEl,
                    triggerHook: 0,
                  })
                  .setPin(".panel-" + pinEl)
                  .on("enter", function (event) {
                    $el.addClass('panel-active');
                  })
                  .on("leave", function (event) {
                    $el.removeClass('panel-active');
                  })
                  .addTo(controller);

                });

                var pinOutro = new ScrollMagic.Scene({
                  triggerElement: ".panel-outro",
                  triggerHook: 0,
                })
                .setPin(".panel-outro")
                .addTo(controller);

                var outroSwipe = new ScrollMagic.Scene({
                  triggerElement: ".panel-20",
                  duration: '100%',
                })
                .setTween(".panel-outro-swipe", 1, {x: '200%'})
                .addIndicators()
                .addTo(controller);

                var ctaDown = new ScrollMagic.Scene({
                  triggerElement: ".scene-0",
                  triggerHook: 0,
                  offset: 50,
                })
                .on("enter", function (event) {
                  $('.cta-down').addClass('cta-down-active');
                })
                .on("leave", function (event) {
                  $('.cta-down').removeClass('cta-down-active');
                })
                .addTo(controller);

                $('.gutter-l').each(function(index, obj) {
                  console.log('gutter-l')
                  var scene = index + 1;
                  var triggerEl = ".scene-" + scene;
                  var xHeroL = new ScrollMagic.Scene({
                    triggerElement: triggerEl,
                    duration: $(triggerEl).height(),
                    triggerHook: 1,
                  })
                  .setTween(".xHeroContainer-l .gutter-" + scene, 1, {x: '-100%'})
                  .addTo(controller);
                });

                $('.gutter-r').each(function(index, obj) {
                  var scene = index + 1;
                  console.log('gutter-r')
                  var triggerEl = ".scene-" + scene;
                  var xHeroR = new ScrollMagic.Scene({
                    triggerElement: triggerEl,
                    duration: $(triggerEl).height(),
                    triggerHook: 1,
                  })
                  .setTween(".xHeroContainer-r .gutter-" + scene, 1, {x: '100%'})
                  .addTo(controller);
                });

                $('body').on('click', '.cta-down', function(e) {
                  var wH = $(window).height()
                  e.preventDefault();
                  $('body,html').animate({ scrollTop: wH + (wH/2) }, 800);
                });

              });
            },
        } );


        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn.xmas = function( options ) {

          new Xmas( this, options )
            // return this.each( function() {
            //     if ( !$.data( this, "plugin_" + pluginName ) ) {
            //         $.data( this, "plugin_" +
            //             pluginName, new Xmas( this, options ) );
            //     }
            // } );
        };

$('.this').xmas();

} )( jQuery, window, document );

}
