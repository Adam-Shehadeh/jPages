/*					
	Revised by:				Adam Shehadeh
	Initial Date:			1/2/2018
	Current Version:		1.0.2
	Original Developer:		yasser-mas
	Desc:					I am not the original creator of this project.
							This revision was to create a re-usable pagination reference for myself and supplement
							what I believe was missing from this project. All credit goes to the original developer.
	Source:					https://www.jqueryscript.net/table/Minimal-Bootstrap-Table-Pagination-Plugin-With-jQuery-Pagination-Tables.html
*/

var table;
var paginator;
var pagesizeddl;
var pageNum = 1;





function generatePages(TABLE, PAGINATOR, PAGESIZEDDL) {
    table = TABLE;
    paginator = PAGINATOR;
    pagesizeddl = PAGESIZEDDL;

    create_pages();

    $(pagesizeddl).on('change', function () {
        create_pages();
    });
	
	$('.sortable_header').on('click', function () {
		$('.sortable_header').removeClass('selected_sortable_header');
        $(this).addClass('selected_sortable_header');
	});

}

function destroy_pages(){
	$(table + ' tr:gt(0)').each(function () {
		$(this).show();
    });
}

function create_pages() {
	$(paginator).html('');			
	var trnum = 0 ;									
	var maxRows = $(pagesizeddl).val();			
	var totalRows = $(table+' tbody tr').length;	
	$(table+' tr:gt(0)').each(function(){			
		trnum++;									
		if (trnum > maxRows ){					
		 	$(this).hide();							
		 }
		 if (trnum <= maxRows ){
			 $(this).show();}
		 });											
		 if (totalRows > maxRows){						
		 	var pagenum = Math.ceil(totalRows/maxRows);								
		 	for (var i = 1; i <= pagenum ;){			
		 	$('.pagination').append('<a class="btn page-num" data-page="' + i + '">\
					      <span>' + i++ + '</span>\
					    </a>').show();
		 	}											
		 }
		$('.pagination a:first-child').addClass('selected-page');
		$('.pagination a').on('click',function(){		
			pageNum = $(this).attr('data-page');	
			var trIndex = 0 ;						
			$('.pagination a').removeClass('selected-page');
			$(this).addClass('selected-page');					
			$(table+' tr:gt(0)').each(function(){		
			 	trIndex++;								
			 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
			 		$(this).hide();		
			 	}else {
					$(this).show();
				}		
			});									
		});
}


function sortTable(n, tb) {
	destroy_pages();
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById(tb);
	switching = true;
	dir = "asc"; 
	while (switching) {
		switching = false;
		rows = table.getElementsByTagName("TR");
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount ++;      
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
	create_pages();
	$('.pagination a:nth-child('+pageNum+')').trigger('click');	//clicks to current page
}




