// listener is added the first time the page loads, so add the listener on the parent
// element
$("ul").on("click", "li", function () {
    //"click" and "on", "click" will only work on existing elements while on can 
    //work on potential future elements
    $(this).toggleClass("completed");
});

$(".fa-plus").on("click", function(){
    $("input[type = 'text']").fadeToggle();
})

//click on x to delete a todo
$("ul").on("click", "span",  function (e) {
    //stop the event bubbling
    e.stopPropagation();
    $(this).parent().fadeOut();

});

$("input[type = 'text']").keypress(function (e) {
    //check for the enter key
    if (e.which === 13) {
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span>" + todoText + "</li>");
    }
});