$(".category-card__title li a").bind("mousemove", function(e){
  $(this).addClass("active");
  $(this).parent("li").siblings().find("a").removeClass("active");
  var index = $(this).parent("li").index();
  $(this).parents(".category-card").find(".category-card__right__content:eq("+index+")").addClass("active");
  $(this).parents(".category-card").find(".category-card__right__content:not(:eq("+index+"))").removeClass("active");
});


$(".tabs a").bind("click", function(e){
  e.preventDefault();
  if(!$(this).hasClass("active")){
    var index = $(this).parent("li").index();
    $(this).addClass("active");
    $(this).parent("li").siblings("li").find("a").removeClass("active");
    $(".tabs-content .tabs-panel:eq("+index+")").addClass("active");
    $(".tabs-content .tabs-panel:not(:eq("+index+"))").removeClass("active");
  }
});


/** slide **/
var slide = $(".slide");
var slides = slide.find(".slide__container li");
var slide_nav = slide.find(".slide__nav li");
var slide_current = 0;
window.setInterval(function(){
  slide_animate();
  slide_current = (slide_current == slides.length-1) ? 0 : slide_current+1;
}, 2000);

slide.find(".slide__action a").bind("click", function(e){
  e.preventDefault();
  if($(this).index() == 0){
    slide_current = (slide_current-1 < 0) ? slides.length-1 : slide_current-1;
  }else{
    slide_current = (slide_current+1 > slides.length-1) ? 0 : slide_current+1;
  }
  slide_animate();
});

slide_nav.find("a").bind("click", function(e){
  e.preventDefault();
  slide_current = $(this).parent("li").index();
  slide_animate();
});

function slide_animate(){
  slides.eq(slide_current).addClass("active");
  slides.not(":eq("+slide_current+")").removeClass("active");
  slide_nav.eq(slide_current).find("a").addClass("active");
  slide_nav.not(":eq("+slide_current+")").find("a").removeClass("active");
  var color = slides.eq(slide_current).data("color");
  $(".main").css("background", color);
}


function scroll_to_top(){
  $("html,body").animate({scrollTop:0},"slow");
  return false;
}
