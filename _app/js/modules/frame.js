module.exports = function () {

  function hideIntro(){
    $('#intro').fadeOut(1000);
    $('body').removeClass('lockedScroll');
  }

  var winHeight = $(window).height();
  var winWidth = $(window).width();

  var wUnit = function() {
    var height = winWidth/20;
    return height;
  }

  var hUnit = function() {
    var height = winHeight/12;
    return height;
  }

  var contentWidth = function() {
    var sU = wUnit()*5;
    var contentW = winWidth - sU;
    return contentW;
  }

  var contentHeight = function() {
    var sU = hUnit()*4;
    var contentH = winHeight - sU;
    return contentH;
  }

  $(window).scroll(function() {
    $('.denim-l').scrollTop(
      $(this).scrollTop()
    );
  });

  $(window).scroll(function() {
    $('.denim-r').scrollTop(
      $(this).scrollTop()
    );
    // $('.piccol-l').scrollTop(
    //   $(this).scrollTop() - ($(this).scrollTop()*2)
    // );

    $('.piccol-l').css('transform', 'translate3d(0,' + $(this).scrollTop()*2 + 'px, 0)');
    $('.piccol-r').css('transform', 'translate3d(0,' + $(this).scrollTop()*2 + 'px, 0)');
  });

  var calcImageMarqueesHeight = function() {
    $('.imgTxt').each(function() {
      var oWidth = $(this).attr('data-originalWidth');
      var oHeight = $(this).attr('data-originalHeight');
      $(this).height(hUnit());
      var newWidth = hUnit()/(oHeight/oWidth);
      $(this).width(newWidth);
    });
  }


  var sizeBlocks = function() {
    $('.contentBlock').each(function() {
      // $(this).css('width', contentWidth() + 'px');
      $(this).css('height', contentHeight() + 'px');
    });
    $('.content').css('margin-top', hUnit()*2 + 'px');
    $('.content').css('margin-bottom', hUnit()*2 + contentHeight() + 'px');

    var sqM = (wUnit()/2);

    $('.blk-col').each(function(){
     $(this).css('width', wUnit() + '10px');
    });

      $('.blk-col-half').each(function(){
     $(this).css('width', wUnit()/2 + 'px');
    });

    $('.denim-l').css('left', wUnit()/2 + 'px');
    $('.denim-r').css('right', wUnit()/2 + 'px');

    $('.piccol-l').css('left', wUnit()/2 + wUnit() + 'px');
    $('.piccol-r').css('right', wUnit()/2 + wUnit() + 'px');

    $('.blk-row').each(function(){
     $(this).css('height', hUnit() + 'px');
     $(this).css('line-height', hUnit() + 20 + 'px');
    });

    $('.blk-row-half').each(function(){
     $(this).css('height', hUnit()/2 + 'px');
    });

    $('.row-top-1').css('top', 0);
    $('.row-top-2').css('top', hUnit()/2 + 'px');
    // $('.row-bottom-1').css('bottom', hUnit()/2 + 'px');
    // $('.row-bottom-2').css('bottom', 0);

    $('.free-bottom').css('bottom', 0 + 'px');


    $('.join-top').css('top', hUnit() + 'px');
    $('.join-bottom').css('bottom', hUnit() + 'px');
    $('.join-bottom-a').css('line-height', hUnit() + 'px');


    $('.blk-sq').each(function(){
      $(this).css('width', wUnit() + 'px')
      $(this).css('height', hUnit() + 'px')
    });

    $('.sq-tl').css('top', 0 + 'px');
    $('.sq-tl').css('left', sqM + 'px');

     $('.sq-tr').css('top', 0 + 'px');
    $('.sq-tr').css('right', sqM + 'px');

     $('.sq-br').css('bottom', 0 + 'px');
    $('.sq-br').css('right', sqM + 'px');

    $('.sq-bl').css('bottom', 0 + 'px');
    $('.sq-bl').css('left', sqM + 'px');
  }

  $(document).on('mouseenter', '.join-top-a', function() {
    $('.join-top-a').removeClass('blue').addClass('red');
    $(this).closest('.join-top').removeClass('bg-pink').addClass('bg-yellow');
  });
  $(document).on('mouseleave', '.join-top-a', function() {
    $('.join-top-a').removeClass('red').addClass('blue');
    $(this).closest('.join-top').removeClass('bg-yellow').addClass('bg-pink');
  });

  $(document).on('click', '.cat', function() {
    var w = $('.cat').width() + 50;
    var h = $('.cat').height() + 50;
    $('.cat').css('width', w + 'px');
    $('.cat').css('height', h + 'px');
  });


  $(document).ready(function() {
    $('.introLogo').fadeIn();
    sizeBlocks();
    calcImageMarqueesHeight();
    setTimeout(hideIntro, 4000)
  });

  // window.onresize = function(event) {
  //   sizeBlocks();
  // };

  $( window ).resize(function() {
    console.log('resized')
    sizeBlocks();
    calcImageMarqueesHeight();
  });

 $('document').ready(function() {
    $(document).scroll(function(){
      if (document.documentElement.clientHeight + $(window).scrollTop() >= $(document).height()) {
        $(document).scrollTop(0);
      }
    });

//  $(document).on('scroll', function (e) {
//     var $this = $(this),
//         $items = $(".content"),
//         scrollPosition = $this.scrollTop();
//     if (scrollPosition > ($this.data('scroll-position') || 0)) {
//       console.log('down')
//         // Scrolling down
//         var threshold = $this.height() - 800;

//         if (scrollPosition > threshold) {
//             var $firstResult = $('.contentBlock:first-child');
//             $items.append($firstResult);
//             scrollPosition -= $firstResult.height();
//             $this.scrollTop(scrollPosition);
//         }
//     } else {
//       console.log('up')
//         // Scrolling up
//         var threshold = $('.contentBlock:first-child').height();
//         if (scrollPosition < threshold) {
//             var $lastResult = $('.contentBlock:last-child');
//             $items.prepend($lastResult);
//             scrollPosition += $lastResult.height();
//             $this.scrollTop(scrollPosition);
//         }
//     }
//     $this.data('scroll-position', scrollPosition)
// });
  });



}
