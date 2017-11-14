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
            this.winHeight = $(window).height();
            this.winWidth = $(window).width();
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

                var $this = this;
                var controller = new ScrollMagic.Controller();
                var scenes = [];
                $(document).ready(function() {
                  $this.positionPanels(
                    $this.winHeight,
                    $this.winWidth
                  );

                  $this.initScenes(
                    $this,
                    controller,
                    $this.winHeight,
                    $this.winWidth,
                    scenes
                  );

                  console.log(scenes);

                  $('body').on('click', '.cta-down', function(e) {
                    e.preventDefault();
                    $('body,html').animate({ scrollTop: windowHeight + (windowHeight/2) }, 800);
                  });
                });


                window.onresize = function(event) {
                  var winHeight = $(window).height();
                  var winWidth = $(window).width();
                  $this.positionPanels(
                    $(window).height(),
                    $(window).width()
                  );

                  // controller.removeScene(scenes);
                  scenes.forEach(function (scene, index) {
                    // make sure scene wasn't null
                    if (scene) {
                      // destroy active scene
                      scene.destroy(true);
                    }
                  });
                  scenes = [];
                  console.log(scenes)
                  $this.initScenes(
                    $this,
                    controller,
                    winHeight,
                    winWidth,
                    scenes
                  );
                };

            },

            initScenes: function ($this, controller, winHeight, winWidth, scenes) {
              $this.initIntroScene( controller, winHeight, winWidth, scenes );
              $this.initPaneScene( controller, winHeight, winWidth, scenes );
              $this.initForegroundScene( controller, winHeight, winWidth, scenes );
              $this.initSceneCtaScene( controller, winHeight, winWidth, scenes );
              $this.initHeroScene( controller, winHeight, winWidth, scenes );
              $this.initDownScene( controller, winHeight, winWidth, scenes );
              $this.initGutterScene( controller, winHeight, winWidth, scenes );
            },

            positionPanels: function ( winHeight, winWidth ) {
              var i;
              // Panels
              var panelsLength = $('.panel').length;
              $('.panel').css('height', winHeight + 'px');
              $('.panel-panes').css('height', winHeight*2 + 'px');

              // Panes
              // Pane Width Unit
              var unit = Math.round(winHeight * (5/7)/2);
              var panesWidth,
                heroWidth,
                panesMarginLeft;

              if ( winWidth <= 600 ) {
                panesWidth = '100%';
                panesMarginLeft = 0;
                heroWidth = winWidth;
              } else {
                panesWidth = unit*2 + 'px';
                panesMarginLeft = -unit;
                heroWidth = unit*2;
              }
              $('.panes').css({
                'width': panesWidth,
                'margin-left': panesMarginLeft + 'px',
              })
              $('.panel-hero > div').css({
                'width': heroWidth,
                'margin-left': panesMarginLeft + 'px',

              })
              $('.panel-hero').css({
                'margin-top': winHeight + 'px',
              })

              // Gutters
              // Gutter sizes
              var docHeight = $('#content').height();
              $('.xHero').width(winWidth).height(winHeight);
              $('.xHero div').width('1923px');
              // Gutter mask container
              $('.xHeroContainer-mask').css({
                'height': winHeight + 'px',
              });

              var i;
              for (i = 1; i < $('#content .scene').length; i++) {
                var h = $('#scene-' + i).height();
                $('#gutter-' + i).width(h*2);
              }
            },

            initIntroScene: function( controller, winHeight, winWidth, scenes ) {
              var tweenIntro = new TimelineMax()
              .add([
                TweenMax.to($('.intro-window-1'), 1, {x:"-100%"}),
                TweenMax.to($('.intro-window-2'), 1, {x:"100%"})
              ]);

              // init intro scroll
              var $panel0 = $('#panel-0');
              var introScene = new ScrollMagic.Scene({
                triggerElement: "#panel-0",
                duration: "100%",
                triggerHook: 0,
              })
              .on("enter", function (event) {
                $panel0.addClass('panel-active');
              })
              .on("leave", function (event) {
                $panel0.removeClass('panel-active');
              })
              .setTween( tweenIntro )
              .addTo( controller );

              scenes.push(introScene);
            },

            initPaneScene: function( controller, winHeight, winWidth, scenes ) {

              var getTweenStyle = function (el, style) {
                var tweenStyle1 = new TimelineMax()
                .add([
                  TweenMax.to($('.pane-0 > div', el), 1, {y:"100%"}),
                  TweenMax.to($('.pane-1 > div', el), 1, {x:"100%"}),
                  TweenMax.to($('.pane-2 > div', el), 1, {y:"-100%"}),
                  TweenMax.to($('.pane-3 > div', el), 1, {x:"-100%"}),
                ]);

                if ( style == 1 ) {
                  return ( tweenStyle1 );
                } else {
                  return false;
                }
              }

              // init scroll for each pane
              var panelPanesLength = $('.panel-panes').length;
              var els = $('.panel-panes');
              var x;

              for ( x = 0; x < panelPanesLength; x++ ) {
                var panelPane = els[x];
                var $panelPane = $(els[x]);
                // var $pane = $('#scene-' + i + ' .panel-panes');
                var triggerElement = $panelPane.attr('data-trigger');
                var tweenStyle = $panelPane.attr('data-tweenStyle');
                var fetchedTweenStyle = getTweenStyle(panelPane, tweenStyle);

                var panelPaneScene = new ScrollMagic.Scene({
                  triggerElement: "#" + triggerElement,
                  duration: "150%",
                  offset: winHeight/2,
                  triggerHook: 0.5,
                })
                .on("enter", function (event) {
                  $panelPane.addClass('panel-active');
                })
                .on("leave", function (event) {
                  $panelPane.removeClass('panel-active');
                })
                .setTween( fetchedTweenStyle )
                .addTo( controller );
                scenes.push(panelPaneScene);
              }
            },

            initForegroundScene: function( controller, winHeight, winWidth, scenes ) {
              // Foregrounds
              var fgCount = $('.fg').length;
              var z;
              console.log(fgCount)
              for ( z = 1; z <= fgCount + 1; z++ ) {

                var sc = z + 1;
                $( '#scene-' + z + ' .fg' ).height( winHeight*2 );
                var foregroundScene = new ScrollMagic.Scene({
                  triggerElement: "#scene-" + sc,
                  duration: "500%",
                  triggerHook: 1,
                })
                .setTween($('#fg-' + z + ' div'), 1, {y:"200%"})
                .addIndicators({name: "fg"})
                .addTo(controller);
                scenes.push(foregroundScene);
                console.log(sc, '#fg-' + z + ' div')
              }
            },

            initSceneCtaScene: function( controller, winHeight, winWidth, scenes ) {
              // var ctaLength = $('.scene-cta').length;
              // var i;
              // var els = $('.scene-cta');
              // for ( i = 0; i < ctaLength; i++ ) {
              //   console.log('i', els[i]);
              //   var $cta = $(els[i]);
              //   var trigger = $cta.parent().attr('id');
              //   var ctas = new ScrollMagic.Scene({
              //     triggerElement: '#' + trigger,
              //     duration: "300%",
              //     triggerHook: 0,
              //     offset: 100,
              //   })
              //   .on("enter", function (event) {
              //     $cta.addClass('scene-cta-active');
              //   })
              //   .on("progress", function (event) {
              //     if (event.scrollDirection === "FORWARD" && event.progress > 0.7) {
              //       $cta.removeClass('scene-cta-active');
              //     }
              //   })
              //   .on("leave", function (event) {
              //     $cta.removeClass('scene-cta-active');
              //   })
              //   .addIndicators({name: "fg"})
              //   .addTo(controller);

              // }

              $('.scene-cta').each(function(index, obj) {
                var i = index + 1;
                var sceneCtaScene = new ScrollMagic.Scene({
                  triggerElement: "#scene-" + i,
                  duration: "400%",
                  triggerHook: 0,
                  offset: 100,
                })
                .on("enter", function (event) {
                  $('#scene-' + i + ' .scene-cta').addClass('scene-cta-active');
                })
                .on("progress", function (event) {
                  if (event.scrollDirection === "FORWARD" && event.progress > 0.7) {
                    $('#scene-' + i + ' .scene-cta').removeClass('scene-cta-active');
                  }
                })
                .on("leave", function (event) {
                  $('#scene-' + i + ' .scene-cta').removeClass('scene-cta-active');
                })
                .addIndicators({name: "fg"})
                .addTo(controller);

                scenes.push(sceneCtaScene);
              });
            },

            initHeroScene: function( controller, winHeight, winWidth, scenes ) {
              var heroLength = $('.panel-hero').length;
              var i;
              var els = $('.panel-hero');
              for ( i = 1; i < heroLength; i++ ) {
                var $el = $(els[i]);
                var panelId = $el.attr('id');
                var pinEl = parseInt($el.attr('data-trigger'));
                pinEl = pinEl;
                var setPin = new ScrollMagic.Scene({
                  triggerElement: "#panel-" + pinEl,
                  triggerHook: 0,
                  duration: '50%',
                  offset: 0,

                })
                .on("enter", function (event) {
                  $el.addClass('panel-active');
                })
                .on("leave", function (event) {
                  $el.removeClass('panel-active');
                })
                // .setPin('#' + panelId)
                .addTo(controller);
              }

              var pinOutro = new ScrollMagic.Scene({
                triggerElement: ".panel-outro",
                triggerHook: 0,
              })
              .setPin(".panel-outro")
              .addTo(controller);

              scenes.push(setPin);
            },

            initDownScene: function( controller, winHeight, winWidth, scenes ) {
              var ctaDown = new ScrollMagic.Scene({
                triggerElement: "#scene-0",
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
              scenes.push(ctaDown);
            },

            initGutterScene: function( controller, winHeight, winWidth, scenes ) {
              if ( winWidth > 600 ) {

                var getGutterTweenStyle = function (i) {
                  var tweenStyle = new TimelineMax()
                  .add([
                    TweenMax.to($('#gutter-l-' + i), 1, {x:"-100%"}),
                    TweenMax.to($('#gutter-r-' + i), 1, {x:"100%"}),
                  ]);
                  return ( tweenStyle );
                }

                var gutterLlength = $('.gutter-l').length;
                var q;
                console.log(gutterLlength);
                // var $el = $('#gutt');
                for ( q = 1; q <= gutterLlength; q++ ) {
                  console.log('gutter',q);
                  var triggerEl = ".scene-" + q;
                  var fetchedGutterTweenStyle = getGutterTweenStyle( q );
                  var xHeroL = new ScrollMagic.Scene({
                    triggerElement: triggerEl,
                    duration: $(triggerEl).height(),
                    triggerHook: 1,
                  })
                  .setTween( fetchedGutterTweenStyle )
                  .addTo(controller);
                  scenes.push(xHeroL);
                }
              }
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
