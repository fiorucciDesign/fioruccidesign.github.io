module.exports = function () {

  var email;

  var lockScroll = function() {
    $('body').addClass('lockedScroll');
  }

  var unlockScroll = function() {
    $('body').removeClass('lockedScroll');
  }
  $(function() {
    $('#emailForm').submit(function(event) {
      event.preventDefault();

      var formEl = $(this);
      var submitButton = $('input[type=submit]', formEl);

      $.ajax({
        type: 'POST',
        url: formEl.prop('action'),
        accept: {
          javascript: 'application/javascript'
        },
        data: formEl.serialize(),
        beforeSend: function() {
          submitButton.prop('disabled', 'disabled');
          email = $('#email-address-first').val();
          $('#email-address-hidden').val(email);
          $('#emailSubmitButton').html('LOADING...');
        }
      }).done(function(data) {
        lockScroll();
        $('.addressSignup').fadeIn();
      });
    });
  });

  $(function() {
    $('#addressForm').submit(function(event) {
      event.preventDefault();

      var formEl = $(this);
      var submitButton = $('input[type=submit]', formEl);

      $.ajax({
        type: 'POST',
        url: formEl.prop('action'),
        accept: {
          javascript: 'application/javascript'
        },
        data: formEl.serialize(),
        beforeSend: function() {
          submitButton.prop('disabled', 'disabled');
          $('#addressSubmitButton').html('LOADING...');
        }
      }).done(function(data) {
        function delayedShow(){
          $('.addressSignup').fadeOut();
          unlockScroll();
          $('#addressSignupSuccess').fadeOut();
        }
        $('#addressSignupSuccess').fadeIn();
        $('#emailSignUpThanks').hide();
        $('#emailForm').hide();
        $('#addressSignUpThanks').show();
        $('#addressSignupSuccess').removeClass('dn');
        setTimeout(delayedShow, 1000)
      });
    });
  });

  $(document).on('click', '#addressBack', function(e) {
    e.preventDefault();
    $('.addressSignup').fadeOut();
    $('#emailSubmitButton').html('GO GO GO');
    unlockScroll();
  });

  $(document).on('click', '.getStickers', function(e) {
    e.preventDefault();
    $('.addressSignup').fadeIn();
    lockScroll();
    $('#email-address-hidden').show();
  });

}
