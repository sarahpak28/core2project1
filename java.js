document.addEventListener("DOMContentLoaded", function() {
    $(document).ready(function(){
        $('.content-wrap').on('wheel', function(e){
            e.preventDefault(); 

            var current = parseInt($(this).css('font-size'), 10); 
            if (e.originalEvent.deltaY < 0) {
                $(this).css("font-size", (current - 1) + "px");
            } else {  
                $(this).css("font-size", (current + 1) + "px");
            }
        });
    });
});