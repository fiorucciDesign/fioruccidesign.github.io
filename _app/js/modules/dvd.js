module.exports = function () {

function em(input) {
    var emSize = parseFloat($("body").css("font-size"));
    return (emSize * input);
}

var KeyFrame =
{
 init: function(){

    if($(window).width() > em(40)) {
      var sq = 120;
    } else {
      var sq = 80;
    }

     //get the left position
     var pushLeft = $(window).width() - sq;
     var pushTop = $(window).height() + $(document).scrollTop() - sq;
     var winHeight = $(window).height();
     var top = $(document).scrollTop();
     //set the style and append to head
     $('#catKeyframes').remove();

     var css=$('<style id="catKeyframes">@keyframes moveX {from { left: 0; } to { left: '+pushLeft+'px; }} @keyframes moveY {from { transform: translateY(' + winHeight + 'px) rotate(0deg); } to { transform: translateY(' + pushTop + 'px) rotate(360deg); }}</style>').appendTo('head');
  }
}
KeyFrame.init();

// $(window).scroll(function() {
//   $(".marquee").css("-webkit-animation", "none");
//   $(".marquee").css("-moz-animation", "none");
//   $(".marquee").css("-ms-animation", "none");
//   $(".marquee").css("animation", "none");
//   $(".marquee").css("-webkit-animation", "moveX 15.05s linear infinite alternate, moveY 15.4s linear infinite alternate");
//   $(".marquee").css("-moz-animation", "moveX 15.05s linear infinite alternate, moveY 15.4s linear infinite alternate");
//   $(".marquee").css("-ms-animation", "moveX 15.05s linear infinite alternate, moveY 15.4s linear infinite alternate");
//   $(".marquee").css("animation", "moveX 15.05s linear infinite alternate, moveY 15.4s linear infinite alternate");
//   KeyFrame.init();
// });
  // KeyFrame.init();
  // setTimeout(KeyFrame.init(), 500);

$(window).resize( function() {
  KeyFrame.init();
});


  // (function ($, window, undefined) {
  //   var scrollTop = $(document).scrollTop();
  //   $(window).scroll(function() {
  //     scrollTop = $(document).scrollTop();
  //   });
  //   $.fn.marqueeify = function (options) {
  //     var settings = $.extend({
  //       horizontal: true,
  //       vertical: true,
  //       speed: 1000, // In pixels per second
  //       container: $('#felixContainer'),
  //       bumpEdge: function () {}
  //     }, options);

  //     return this.each(function () {
  //       var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
  //         $el = $(this);

  //       getSizes = function () {
  //         containerWidth = settings.container.width();
  //         containerHeight = settings.container.height();
  //         elWidth = $el.outerWidth();
  //         elHeight = $el.outerHeight();
  //       };

  //       move = {
  //         right: function () {
  //           $el.animate({left: (containerWidth - elWidth)}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
  //             settings.bumpEdge();
  //             move.left();
  //           }});
  //         },
  //         left: function () {
  //           $el.animate({left: 0}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
  //             settings.bumpEdge();
  //             move.right();
  //           }});
  //         },
  //         down: function () {
  //           $el.animate({top: (containerHeight + scrollTop - elHeight)}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
  //             settings.bumpEdge();
  //             move.up();
  //             $(this).addClass('up').removeClass('down');
  //           }});
  //         },
  //         up: function () {
  //           $el.animate({top: scrollTop}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
  //             settings.bumpEdge();
  //             move.down();
  //             $(this).addClass('down').removeClass('up');
  //           }});
  //         }
  //       };

  //       getSizes();

  //       if (settings.horizontal) {
  //         move.right();
  //       }
  //       if (settings.vertical) {
  //         move.down();
  //       }

  //       // Make that shit responsive!
  //       $(window).resize( function() {
  //         getSizes();
  //       });

  //       $(window).scroll(function() {
  //         getSizes();
  //         console.log('top', scrollTop);
  //         console.log('down', containerHeight + scrollTop - elHeight);
  //         $el.stop();
  //         if($el.hasClass('top')) {
  //           move.up();
  //         }
  //         if($el.hasClass('down')) {
  //           move.down();
  //         }
  //       });
  //     });
  //   };
  // })(jQuery, window);

  // $(document).ready( function() {

  //   $('.marquee').marqueeify({
  //     speed: 100,
  //     bumpEdge: function () {
  //       var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
  //       $('.marquee .logo').css('fill', newColor);
  //     }
  //   });
  // });
}
