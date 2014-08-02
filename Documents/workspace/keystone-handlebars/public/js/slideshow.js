jQuery(function($) {
  var slideshow = {
    next: function() {
      var curr;
      var that = this;
      $('.slide').each(function() {
        if($(this).is(':visible')) {
          curr = $(this);
        }
      });
      var nextSlide = $(curr).next();
      if(nextSlide.length == 0) {
        var nextSlide = $('.slide:first-child');
      }
      $(curr).fadeOut(750);
      $(nextSlide).fadeIn(750);
      setTimeout(slideshow.next, 3500);
    },
    init: function(){
      $('.slide:first-child').fadeIn(500);
      setTimeout(slideshow.next, 3500);
    }
  };

  slideshow.init();
});