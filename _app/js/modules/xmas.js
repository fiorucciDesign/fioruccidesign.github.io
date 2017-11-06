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
                $('body').height(wH*panelsTotal);
                var triggerAreas = [
                  [0, wH*1],
                  [wH*1, wH*2],
                  [wH*2, wH*3],
                  [wH*3, wH*4],
                  [wH*4, wH*5],
                  [wH*5, wH*6],
                  [wH*6, wH*7],
                  [wH*7, wH*8],
                  [wH*8, wH*9],
                  [wH*9, wH*10],
                  [wH*10, wH*11]
                ]

                this.positionPanels( triggerAreas );
                this.initScroll( triggerAreas );
                this.glitterTime();
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
                for (i = 0; i < 15; ++i) {
                  var elName = '.panel-' + i.toString();
                  var winHeight = $(window).height();

                  $(elName).height(winHeight).css('height', winHeight + 'px');
                  console.log(elName + ' .panel-image')
                }
                $('.panel-image').css('margin-top', winHeight/2 + 'px');
                $('.gutter').css('height', winHeight*11 + 'px');
                var unit = Math.round(winHeight * (5/7)/2);
                var fullWidth = unit*4;
                console.log('fW', fullWidth)
                var imageWidth = unit*2;
                $('.panes').css('width', unit*2 + 'px');
                $('.panes').css('margin-left', -unit + 'px' );
                $('.imgIntro').css({
                  'width': imageWidth + 'px',
                  'height': winHeight + 'px',
                  'marginLeft': -unit + 'px',
                });
                $('.pane').each(function() {
                  $(this).width(unit);
                });
                // $('.gutter-left').css('margin-top', -winHeight*10 + 'px');
              })
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

              var ta = triggerAreas;
              var $this = this;
              var winHeight = $(window).height();

              var controller = new ScrollMagic.Controller();

              $(document).ready(function() {
                // var scene0
                // ease: Linear.easeNone
                var tweenScene1 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-1 .pane-0 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-1 .pane-1 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-1 .pane-2 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-1 .pane-3 > div", 1, {x:"-100%"}),
                ]);

                var tweenScene3 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-3 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-3 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-3 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-3 .pane-3 > div", 1, {x:"100%"}),
                ]);

                var tweenScene6 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-6 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-6 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-6 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-6 .pane-3 > div", 1, {x:"100%"}),
                ]);

                var tweenScene8 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-8 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-8 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-8 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-8 .pane-3 > div", 1, {x:"100%"}),
                ]);

                var tweenScene10 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-10 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-10 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-10 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-10 .pane-3 > div", 1, {x:"100%"}),
                ]);

                var tweenScene12 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-12 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-12 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-12 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-12 .pane-3 > div", 1, {x:"100%"}),
                ]);


                // var tweenPanel2 = new TimelineMax ()
                // .add([
                //   TweenMax.to(".panel-2 > div", 1, {y:"-100%"}),
                // ]);

                // var tweenScene4 = new TimelineMax ()
                // .add([
                //   TweenMax.to(".panel-4 .pane-0 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-4 .pane-1 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-4 .pane-2 > div", 1, {x:"-100%"}),
                //   TweenMax.to(".panel-4 .pane-3 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-4 .pane-4 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-4 .pane-5 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-4 .pane-6 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-4 .pane-7 > div", 1, {y:"-100%"}),
                // ]);
                //
                // var tweenScene6 = new TimelineMax ()
                // .add([
                //   TweenMax.to(".panel-6 .pane-0 > div", 1, {x:"-100%"}),
                //   TweenMax.to(".panel-6 .pane-1 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-6 .pane-2 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-6 .pane-3 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-6 .pane-4 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-6 .pane-5 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-6 .pane-6 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-6 .pane-7 > div", 1, {x:"100%"}),
                // ]);
                //
                // var tweenScene8 = new TimelineMax ()
                // .add([
                //   TweenMax.to(".panel-8 .pane-0 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-8 .pane-1 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-8 .pane-2 > div", 1, {x:"-100%"}),
                //   TweenMax.to(".panel-8 .pane-3 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-8 .pane-4 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-8 .pane-5 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-8 .pane-6 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-8 .pane-7 > div", 1, {y:"-100%"}),
                // ]);
                //
                // var tweenScene10 = new TimelineMax ()
                // .add([
                //   TweenMax.to(".panel-10 .pane-0 > div", 1, {x:"-100%"}),
                //   TweenMax.to(".panel-10 .pane-1 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-10 .pane-2 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-10 .pane-3 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-10 .pane-4 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-10 .pane-5 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-10 .pane-6 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-10 .pane-7 > div", 1, {x:"100%"}),
                // ]);
                //
                // var tweenScene12 = new TimelineMax ()
                // .add([
                //   TweenMax.to(".panel-12 .pane-0 > div", 1, {x:"-100%"}),
                //   TweenMax.to(".panel-12 .pane-1 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-12 .pane-2 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-12 .pane-3 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-12 .pane-4 > div", 1, {y:"100%"}),
                //   TweenMax.to(".panel-12 .pane-5 > div", 1, {x:"100%"}),
                //   TweenMax.to(".panel-12 .pane-6 > div", 1, {y:"-100%"}),
                //   TweenMax.to(".panel-12 .pane-7 > div", 1, {x:"100%"}),
                // ]);



                // Panel 0

                var panel1 = new ScrollMagic.Scene({
                  triggerElement: ".panel-1",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-1').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-1').removeClass('panel-active');
                })
                .setTween(tweenScene1)
                .addTo(controller);

                // Panel 2 - Image

                var panel3 = new ScrollMagic.Scene({
                  triggerElement: ".panel-3",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-3').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-3').removeClass('panel-active');
                })
                .setTween(tweenScene3)
                .addTo(controller);

                // Panel 4 - img
                // Panel 5 - Logo


                var panel6 = new ScrollMagic.Scene({
                  triggerElement: ".panel-6",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-6').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-6').removeClass('panel-active');
                })
                .setTween(tweenScene6)
                .addIndicators({name: "panel 6"})
                .addTo(controller);


                var panel8 = new ScrollMagic.Scene({
                  triggerElement: ".panel-8",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-8').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-8').removeClass('panel-active');
                })
                .setTween(tweenScene8)
                .addIndicators({name: "panel 8"})
                .addTo(controller);

                // panel 9 - img

                var panel10 = new ScrollMagic.Scene({
                  triggerElement: ".panel-10",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-10').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-10').removeClass('panel-active');
                })
                .setTween(tweenScene10)
                .addIndicators({name: "panel 10"})
                .addTo(controller);

                // panel 11 -img

                var panel12 = new ScrollMagic.Scene({
                  triggerElement: ".panel-12",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-12').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-12').removeClass('panel-active');
                })
                .setTween(tweenScene12)
                .addIndicators({name: "panel 12"})
                .addTo(controller);

                //
                // // Panel 7 - images
                //
                // var panel8 = new ScrollMagic.Scene({
                //   triggerElement: ".panel-8",
                //   duration: winHeight,
                // })
                // .on("enter", function (event) {
                //   $('.panel-8').addClass('panel-active');
                // })
                // .on("leave", function (event) {
                //   $('.panel-8').removeClass('panel-active');
                // })
                // .setTween(tweenScene8)
                // .addIndicators({name: "panel 8"})
                // .addTo(controller);
                //
                // // Panel 9 - image
                //
                // var panel10 = new ScrollMagic.Scene({
                //   triggerElement: ".panel-10",
                //   duration: winHeight,
                // })
                // .on("enter", function (event) {
                //   $('.panel-10').addClass('panel-active');
                // })
                // .on("leave", function (event) {
                //   $('.panel-10').removeClass('panel-active');
                // })
                // .setTween(tweenScene10)
                // .addIndicators({name: "panel 10"})
                // .addTo(controller);
                //
                // // Panel 11  - i mage
                //
                // var panel12 = new ScrollMagic.Scene({
                //   triggerElement: ".panel-12",
                //   duration: winHeight,
                // })
                // .on("enter", function (event) {
                //   $('.panel-12').addClass('panel-active');
                // })
                // .on("leave", function (event) {
                //   $('.panel-12').removeClass('panel-active');
                // })
                // .setTween(tweenScene12)
                // .addIndicators({name: "panel 12"})
                // .addTo(controller);







                var shimmer1 = new ScrollMagic.Scene({
                  triggerElement: ".panel-1",
                  duration: winHeight*10,
                })
                .setTween(".shimmer-1", 0.5, {y: "-100%"})
                .addTo(controller);

                var shimmer2 = new ScrollMagic.Scene({
                  triggerElement: ".panel-1",
                  duration: winHeight*10,
                })
                .setTween(".shimmer-2", 1, {y: "-400%", rotationY: "400"})
                .addTo(controller);

                var shimmer1 = new ScrollMagic.Scene({
                  triggerElement: ".glitter-1",
                  duration: winHeight*10,
                })
                .setTween(".glitter-1", 0.5, {y: "-100%", rotationY: "250"})
                .addTo(controller);

                var shimmer1 = new ScrollMagic.Scene({
                  triggerElement: ".glitter-1",
                  duration: winHeight*10,
                })
                .setTween(".glitter-1", 0.5, {y: "-100%"})
                .addTo(controller);

                var shimmer3 = new ScrollMagic.Scene({
                  triggerElement: ".panel-3",
                  duration: winHeight*5,
                })
                .setTween(".shimmer-3", 1, {top: -200, x:"-200%", rotationY: "250"})
                .addTo(controller);

                var xmasIcon = new ScrollMagic.Scene({
                  triggerElement: ".panel-3",
                  duration: winHeight,
                })
                .setTween(".xmasIcon", 0.5, {x: "1400"})
                .addTo(controller);

                var xHero = new ScrollMagic.Scene({
                  triggerElement: ".panel-0",
                  duration: winHeight*15,
                })
                .setTween(".xHeroContainer-l .xHero", 1, {left: "-3700px"})
                .addTo(controller);

                var xHero = new ScrollMagic.Scene({
                  triggerElement: ".panel-0",
                  duration: winHeight*15,
                })
                .setTween(".xHeroContainer-r .xHero", 1, {right: "-3700px"})
                .addTo(controller);


                // $(window).scroll(function() {
                //   $('.gutter-left').css('transform', 'translate3d(0,' + $(this).scrollTop()*2 + 'px, 0)');
                // });
              });

            }
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
