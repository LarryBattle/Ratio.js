$(function(){
	$( ".dotTemplate" ).each(function(){
		var template = $(this).getComments(true).join('<br/>');
		var func = doT.template( template );
		var html = func(data);
		$(this).html( html );
	});
});