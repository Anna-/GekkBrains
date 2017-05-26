/*
1). С помощью jQuery создать контрол, работающий с вкладками. 
*/

(function($) {
	$(function() {
		function chooseTab() {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			activateTabContent($(this).index());
		}

		function activateTabContent(index) {
			var curContent = $('div.tabs_content').eq(index);
			curContent.addClass('active');
			curContent.siblings().removeClass('active');
		}

		$('.tabs_menu li').on('click', chooseTab);
		
	});
})(jQuery);
