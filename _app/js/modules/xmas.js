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

        var scrollCalculation = {

          fromRight: function(el, panelIndex, triggerAreas, scrollDirection) {


              var elWidth = $(el).width();
              var elHeight = $(el).height();
              console.log(elHeight)
              var triggerTop = triggerAreas[panelIndex][0]
              var scrollTop = $(window).scrollTop() - triggerTop;
              var x = (scrollTop/elHeight)*100;
              var l = elWidth - (x/100)*elWidth;
              if ( scrollDirection == "FORWARD" ) {
                return l;
              } else if ( scrollDirection == "REVERSE" ) {
                return l;
              }

          },

          fromLeft: function(el, panelIndex, triggerAreas, scrollDirection) {

              var elWidth = $(el).width();
              var elHeight = $(el).height();
              var currentLeft = parseInt($(el).css('left'));
              var triggerTop = triggerAreas[panelIndex][0]
              var scrollTop = $(window).scrollTop() - triggerTop;
              var x = (scrollTop/elHeight)*100;
              var l = (x/100)*elWidth;
              return l-elWidth;

          },

          fromTop: function(el, panelIndex, triggerAreas, scrollDirection) {

              var elWidth = $(el).width();
              var elHeight = $(el).height();
              var triggerTop = triggerAreas[panelIndex][0]
              var scrollTop = $(window).scrollTop() - triggerTop;
              var x = (scrollTop/elHeight)*100;
              var l = (x/100)*elHeight;
              return l-elHeight;

          },

          fromBottom: function(el, panelIndex, triggerAreas, scrollDirection) {

              var elWidth = $(el).width();
              var elHeight = $(el).height();
              var triggerTop = triggerAreas[panelIndex][0]
              var scrollTop = $(window).scrollTop() - triggerTop;
              var x = (scrollTop/elHeight)*100;
              var l = (x/100)*elHeight;
              return elHeight-l;

          }

        }

        var scrollPane = {

          scrollFromRight: function(el, panelIndex, triggerAreas, scrollDirection) {

            var newDirection = scrollCalculation.fromRight(el, panelIndex, triggerAreas, scrollDirection);
            return $(el).children(":first").css({'left': newDirection + 'px'});

          },

          scrollFromLeft: function(el, panelIndex, triggerAreas, scrollDirection) {

            var newDirection = scrollCalculation.fromLeft(el, panelIndex, triggerAreas, scrollDirection);
            return $(el).children(":first").css({'left': newDirection + 'px'});

          },

          scrollFromTop: function(el, panelIndex, triggerAreas, scrollDirection) {

            var newDirection = scrollCalculation.fromTop(el, panelIndex, triggerAreas, scrollDirection);
            return $(el).children(":first").css({'top': newDirection + 'px'});

          },

          scrollFromBottom: function(el,panelIndex, triggerAreas, scrollDirection) {

            var newDirection = scrollCalculation.fromBottom(el, panelIndex, triggerAreas, scrollDirection);
            return $(el).children(":first").css({'top': newDirection + 'px'});

          }

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
                  'width': (winWidth-heroWidth)/2 + 'px',
                  'height': winHeight + 'px',
                });

                var i;
                for (i = 1; i < $('.scene').length; i++) {
                  var h = $('.scene-' + i).height();
                  $('.gutter-' + i).width(h*2);
                }
              });
            },

            scrollPanes: function( panelIndex, triggerAreas, scrollDirection ) {
              var elName = '.panel-' + panelIndex.toString();
              var pane = elName + ' .pane';

              $(pane).each(function(index) {
                var paneEl = elName + ' .pane-' + index;
                var scrollFrom = $(paneEl).data('scrollfrom');
                if (scrollFrom == 'right') {
                  scrollPane.scrollFromRight(this, panelIndex, triggerAreas, scrollDirection);
                }
                if (scrollFrom == 'left') {
                  scrollPane.scrollFromLeft(this, panelIndex, triggerAreas, scrollDirection);
                }
                if (scrollFrom == 'top') {
                  scrollPane.scrollFromTop(this, panelIndex, triggerAreas, scrollDirection);
                }
                if (scrollFrom == 'bottom') {
                  scrollPane.scrollFromBottom(this, panelIndex, triggerAreas, scrollDirection);
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

                // init scroll for each hero
                $('.panel-hero').each(function(index, obj) {

                  var i = index;
                  var $el = $(this);
                  var triggerElement = parseInt($(this).attr('data-trigger')) + 1;
                  var pinEl = parseInt($(this).attr('data-trigger'));
                  console.log(triggerElement)

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
                  .addIndicators({name: "gutter-l" + scene})
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
                  .addIndicators({name: "gutter-r" + scene})
                  .addTo(controller);
                });

                // var xHero = new ScrollMagic.Scene({
                //   triggerElement: ".scene-2",
                //   duration: $('.scene-2').height(),
                //   triggerHook: 1,
                // })
                // .setTween(".gutter-2", 1, {x: '-100%'})
                // .addIndicators({name: "gutter2"})
                // .addTo(controller);


                // var xHero = new ScrollMagic.Scene({
                //   triggerElement: ".scene-1",
                //   duration: winHeight*15,
                // })
                // .setTween(".xHeroContainer-r .xHero", 1, {right: "-3700px"})
                // .addTo(controller);

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
