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
});