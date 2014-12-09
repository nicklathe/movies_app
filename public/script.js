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
	// add to watch list

	$(".buttonAdd").on("click", function(event){
	var button = $(this);
	event.preventDefault();
	$.post("/watch", {
		imdb: button.data("imdb"),
		title: button.data("title"),
		year: button.data("year")
	},function(data){
		button.fadeOut();
		}); 
	});
});




