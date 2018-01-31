/*					
	Revised by:				Adam Shehadeh
	Date:					1/2/2018
	Original Developer:		yasser-mas
	Desc:					I am not the original creator of this project.
							This revision was to create a re-usable pagination reference for myself and supplement
							what I believe was missing from this project. All credit goes to the original developer.
	Source:					https://www.jqueryscript.net/table/Minimal-Bootstrap-Table-Pagination-Plugin-With-jQuery-Pagination-Tables.html
*/

var table;
var paginator;
var pagesizeddl;

function generatePages (TABLE, PAGINATOR, PAGESIZEDDL){
	table = TABLE;
	paginator = PAGINATOR;
	pagesizeddl = PAGESIZEDDL; 
	
	create();
	
	$(pagesizeddl).on('change',function(){
		create();										
	});
	
	}	


function create(){
	$('.pagination').html('');						
	var trnum = 0;									
	var maxRows = parseInt($(pagesizeddl).val());	
	var totalRows = $(table + '>tr').length;
	$(table + ' tr:gt(0)').each(function () {
	    trnum++;
	 	if (trnum > maxRows ){						
	 	    $(this).hide();
	 	} if (trnum < maxRows) {
	 	    $(this).show();
	 	}
	 });											
	 if (totalRows > maxRows){						
	 	var pagenum = Math.ceil(totalRows/maxRows);	
	 	for (var i = 1; i < pagenum ;){			
	 	    $('.pagination').append('<a href="#" class="btn page-num" data-page="' + i + '">\
						      <span>' + i++ + '</span>\
						    </a>').show();
	 	}											
	 }

	 //if (totalRows < maxRows)     //Makes pagesizeddl disappear when no pages are shown
	 //    $(pagesizeddl).hide();
	 //else
	 //    $(pagesizeddl).show();

	 $('.pagination a:first-child').addClass('selected-page');
	 $('.pagination a').on('click', function () {
		var pageNum = $(this).attr('data-page');	
		var trIndex = 0;							
		$('.pagination a').removeClass('selected-page');
		$(this).addClass('selected-page');
		 $(table+' tr:gt(0)').each(function(){							
		 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
		 	    $(this).hide();
		 	} else {
		 	    $(this).show();
		 	}
		 	trIndex++;
		 }); 									
	});									
}



