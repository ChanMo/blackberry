/** modal js **/
/**
$("[data-modal-toggle]").bind("click", function(e){
  e.preventDefault();
  $(".modal-bg").toggle();
  $(".modal").toggleClass("modal-active");
});
**/

/** open ele **/
$("[data-modal-open]").on("click", function(e){
  e.preventDefault();
  var ele = $(this).data("modal-open");
  if(ele == '') {
    $(".modal-bg").show();
    $(".modal").addClass("modal-active");
  }else{
    $(".modal-bg").show();
    $(".modal:not("+ele+")").removeClass("modal-active");
    $(ele).addClass("modal-active");
  }
});

/** close **/
$("[data-modal-close]").on("click", function(e){
  e.preventDefault();
  $(".modal-bg").hide();
  $(".modal").removeClass("modal-active");
});
