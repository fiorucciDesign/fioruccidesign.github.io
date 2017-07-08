module.exports = function () {
  $(document).ready(function(){

  var popUpShopClicked = function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Popup',
      eventAction: 'click',
      eventLabel: 'Popup Shop Click'
    });
  }

  var instaClicked = function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Insta',
      eventAction: 'click',
      eventLabel: 'Instagram clicked'
    });
  }

  $('body').on('click', '.popupEvent', function() {
    popUpShopClicked();
  });

  $('body').on('click', '.getStickersClick', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Stickers',
        eventAction: 'click',
        eventLabel: 'Get Free Stickers Click'
      });
  });

  // $('body').on('click', '.instaClick', function() {
  //   // Remember the link href
  //   var href = this.href;

  //   // Don't follow the link
  //   event.preventDefault();
  //   // Do the async thing
  //   instaClicked(function() {
  //       // This is the completion callback for the asynchronous thing;
  //       // go to the link
  //       window.location = href;
  //   });
  // });

  })

}

