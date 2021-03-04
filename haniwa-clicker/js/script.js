$(function(){
  var click = 0;
  $('.haniwa-img img').click(function() {
      click += 1;
      $(".clicknum").text(click);
    })
})
