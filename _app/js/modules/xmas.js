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
                this.dev();
                // this.glitter();
            },

            dev: function( ) {

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
                for (i = 0; i < triggerAreas.length; ++i) {
                  var elName = '.panel-' + i.toString();
                  var winHeight = triggerAreas[0][1];

                  var top = triggerAreas[i][0];
                  $(elName).height(winHeight).css('height', winHeight + 'px');
                }
                $('.gutter').css('height', winHeight*11 + 'px');
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
                var tweenPanel1 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-1 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-1 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-1 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-1 .pane-3 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-1 .pane-4 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-1 .pane-5 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-1 .pane-6 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-1 .pane-7 > div", 1, {y:"-100%"}),
                ]);

                var tweenPanel2 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-2 > div", 1, {y:"-100%"}),
                ]);

                var tweenPanel3 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-3 .pane-0 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-3 .pane-1 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-3 .pane-2 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-3 .pane-3 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-3 .pane-4 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-3 .pane-5 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-3 .pane-6 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-3 .pane-7 > div", 1, {x:"100%"}),
                ]);

                var tweenPanel4 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-4 > div", 1, {y:"-100%"}),
                ]);

                var tweenPanel5 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-5 .pane-0 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-5 .pane-1 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-5 .pane-2 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-5 .pane-3 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-5 .pane-4 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-5 .pane-5 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-5 .pane-6 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-5 .pane-7 > div", 1, {y:"-100%"}),
                ]);

                var tweenPanel6 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-6 > div", 1, {y:"-100%"}),
                ]);

                var tweenPanel7 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-7 .pane-0 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-7 .pane-1 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-7 .pane-2 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-7 .pane-3 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-7 .pane-4 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-7 .pane-5 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-7 .pane-6 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-7 .pane-7 > div", 1, {x:"100%"}),
                ]);

                var tweenPanel8 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-6 > div", 1, {y:"-100%"}),
                ]);

                var tweenPanel9 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-9 .pane-0 > div", 1, {x:"-100%"}),
                  TweenMax.to(".panel-9 .pane-1 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-9 .pane-2 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-9 .pane-3 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-9 .pane-4 > div", 1, {y:"100%"}),
                  TweenMax.to(".panel-9 .pane-5 > div", 1, {x:"100%"}),
                  TweenMax.to(".panel-9 .pane-6 > div", 1, {y:"-100%"}),
                  TweenMax.to(".panel-9 .pane-7 > div", 1, {x:"100%"}),
                ]);

                var tweenPanel10 = new TimelineMax ()
                .add([
                  TweenMax.to(".panel-10 > div", 1, {y:"-100%"}),
                ]);

                // var tweenGutterLeft = new TimelineMax ()
                // .add([
                //   TweenMax.to(".gutter-left", 1, {y:"100%"}),
                // ]);


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
                .setTween(tweenPanel1)
                .addTo(controller);

                var panel2 = new ScrollMagic.Scene({
                  triggerElement: ".panel-2",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-2').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-2').removeClass('panel-active');
                })
                .setTween(tweenPanel2)
                .addTo(controller);

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
                .setTween(tweenPanel3)
                .addTo(controller);

                var panel4 = new ScrollMagic.Scene({
                  triggerElement: ".panel-4",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-4').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-4').removeClass('panel-active');
                })
                .setTween(tweenPanel4)
                .addTo(controller);

                var panel5 = new ScrollMagic.Scene({
                  triggerElement: ".panel-5",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-5').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-5').removeClass('panel-active');
                })
                .setTween(tweenPanel5)
                .addTo(controller);

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
                .setTween(tweenPanel6)
                .addTo(controller);

                var panel7 = new ScrollMagic.Scene({
                  triggerElement: ".panel-7",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-7').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-7').removeClass('panel-active');
                })
                .setTween(tweenPanel7)
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
                .setTween(tweenPanel8)
                .addTo(controller);

                var panel9 = new ScrollMagic.Scene({
                  triggerElement: ".panel-9",
                  duration: winHeight,
                })
                .on("enter", function (event) {
                  $('.panel-9').addClass('panel-active');
                })
                .on("leave", function (event) {
                  $('.panel-9').removeClass('panel-active');
                })
                .setTween(tweenPanel9)
                .addTo(controller);

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
                .setTween(tweenPanel10)
                .addTo(controller);


                var shimmer1 = new ScrollMagic.Scene({
                  triggerElement: ".panel-1",
                  duration: winHeight*10,
                })
                .setTween(".shimmer-1", 0.5, {y: "-100%"})
                .addIndicators()
                .addTo(controller);

                var shimmer2 = new ScrollMagic.Scene({
                  triggerElement: ".panel-1",
                  duration: winHeight*10,
                })
                .setTween(".shimmer-2", 1, {y: "-400%", rotationY: "400"})
                .addIndicators()
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
                .addIndicators()
                .addTo(controller);

                var xmasIcon = new ScrollMagic.Scene({
                  triggerElement: ".panel-3",
                  duration: winHeight,
                })
                .setTween(".xmasIcon", 0.5, {x: "1400"})
                .addTo(controller);

                var xHero = new ScrollMagic.Scene({
                  triggerElement: ".panel-0",
                  duration: winHeight*11,
                })
                .setTween(".xHeroContainer-l .xHero", 1, {left: "-4000px"})
                .addTo(controller);

                var xHero = new ScrollMagic.Scene({
                  triggerElement: ".panel-0",
                  duration: winHeight*11,
                })
                .setTween(".xHeroContainer-r .xHero", 1, {right: "-4000px"})
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
