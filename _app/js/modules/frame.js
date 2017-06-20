module.exports = function () {
  console.log('frame.js is here')
  var winHeight = $(window).height();
  var winWidth = $(window).width();

  var wUnit = function() {
    var height = winWidth/16;
    return height;
  }

  var hUnit = function() {
    var height = winHeight/8;
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
  });

  var sizeBlocks = function() {
    $('.contentBlock').each(function() {
      $(this).css('width', contentWidth() + 'px');
      $(this).css('height', contentHeight() + 'px');
    });
    $('.content').css('margin-top', hUnit()*2 + 'px');
    $('.content').css('margin-bottom', hUnit()*2 + contentHeight() + 'px');

    var sqM = wUnit()/2;

    $('.blk-col').each(function(){
     $(this).css('width', wUnit() + '10px');
    });

      $('.blk-col-half').each(function(){
     $(this).css('width', wUnit()/2 + 'px');
    });

    $('.denim-l').css('left', wUnit()/2 + wUnit() + 'px');
    $('.denim-r').css('right', wUnit()/2 + wUnit() + 'px');

    $('.piccol-l').css('left', wUnit()/2 + 'px');
    $('.piccol-r').css('right', wUnit()/2 + 'px');

    $('.blk-row').each(function(){
     $(this).css('height', hUnit() + 'px');
     $(this).css('line-height', hUnit() + 20 + 'px');
    });

    $('.blk-row-half').each(function(){
     $(this).css('height', hUnit()/2 + 'px');
    });


    $('.row-top-1').css('line-height', hUnit() + 20 + 'px');
    $('.row-bottom-1').css('line-height', hUnit() + 20 + 'px');
    $('.row-top-1').css('top', 0);
    $('.row-top-2').css('top', hUnit()/2 + 'px');
    $('.row-bottom-1').css('bottom', hUnit()/2 + 'px');
    $('.row-bottom-2').css('bottom', 0);

    $('.join-top').css('top', hUnit() + 'px');
    $('.join-bottom').css('bottom', hUnit() + 'px');

    $('.blk-sq').each(function(){
      $(this).css('width', wUnit() + 'px')
      $(this).css('height', hUnit() + 'px')
    });

    $('.sq-tl').css('top', hUnit() + 'px');
    $('.sq-tl').css('left', sqM + 'px');

     $('.sq-tr').css('top', hUnit() + 'px');
    $('.sq-tr').css('right', sqM + 'px');

     $('.sq-br').css('bottom', hUnit() + 'px');
    $('.sq-br').css('right', sqM + 'px');

    $('.sq-bl').css('bottom', hUnit() + 'px');
    $('.sq-bl').css('left', sqM + 'px');
  }

  $(document).on('mouseenter', '.join-top-a', function() {
    $('.join-top-a').removeClass('red').addClass('yellow');
    $(this).closest('.join-top').removeClass('bg-yellow').addClass('bg-red');
  });
  $(document).on('mouseleave', '.join-top-a', function() {
    $('.join-top-a').removeClass('yellow').addClass('red');
    $(this).closest('.join-top').removeClass('bg-red').addClass('bg-yellow');
  });

    $(document).on('mouseenter', '.join-bottom-a', function() {
    $('.join-bottom-a').removeClass('blue').addClass('red');
    $('.join-bottom').removeClass('bg-red').addClass('bg-blue');
  });
  $(document).on('mouseleave', '.join-bottom-a', function() {
    $('.join-bottom-a').removeClass('red').addClass('blue');
    $('.join-bottom').removeClass('bg-blue').addClass('bg-red');
  });

  $(document).on('click', '.cat', function() {
    var w = $('.cat').width() + 50;
    var h = $('.cat').height() + 50;
    $('.cat').css('width', w + 'px');
    $('.cat').css('height', h + 'px');
  });

//   console.log('ffs')
//   $( ".join-top a" ).hover(
//   function() {
//     console.log('hover')
//     $( this ).removeClass('green').addClass('yellow');
//     $(this).children('a').removeClass('yellow').addClass('green');
//   }, function() {
//     $( this ).removeClass('bg-yellow').addClass('bg-green');
//     $(this).children('a').removeClass('green').addClass('yellow');
//   }
// );

  $(document).ready(function(){
    sizeBlocks();
  });

  window.onresize = function(event) {
    sizeBlocks();
  };

 $('document').ready(function() {
    $(document).scroll(function(){
      if (document.documentElement.clientHeight + $(window).scrollTop() >= $(document).height()) {
        $(document).scrollTop(0);
      }
    });
  });

}
