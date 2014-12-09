$(function(){
	$(".deleteWatch").on("click", function(event){
		// alert("test");
		event.preventDefault();
		var thisDeleteButton = $(this);
		$.ajax({
			url: "/watch/" + thisDeleteButton.data("id"),
			type: "DELETE",
			success:function(result){
				thisDeleteButton.closest("tr").fadeOut(function(){
					$(this).remove();
				});
			}
		});
	});
	// new add to watch list
	$(".buttonAdd").on("click", function(event){
		// alert("clicked");
		var button = $(this);
		event.preventDefault();
		$.post("/watch", {
			imdb: button.data("imdb"),
			title: button.data("title"),
			year: button.data("year")
		}); 
		$(this).fadeOut(function(){
			$(this).remove();
		});
	});
	// end of watch list thing
});




