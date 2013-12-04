var TODO = (function(){
    var  
	selectors = {
        menu: '#menu',
        listContainer: '#list-container',
        addContainer: '#add-container',
        addButton: '.add-button',
        textTask: '.text-task',
		deleted: '.deleted',
		added: '.added',
		done: '.no-todo',
		pending: '.have-todo'
    },
    bindEvents = function() {
		if(localStorage.length > 1){
			$(selectors.pending).show();
			$(selectors.done).hide();
		}
		else{
			$(selectors.pending).hide();
			$(selectors.done).show();
		}
        $(selectors.menu).on('click','li', handleMenu);
        $(selectors.addContainer).on('click','.add-button',addTask);
		$(selectors.listContainer).on('click','a',deleteTask)
    };var showOnce = 1;
    handleMenu = function() {
        
		if( $(this).attr('id') == 'home' ) {
            $(selectors.listContainer).hide();
            $(selectors.addContainer).hide();
			$('#list button').show(1000);
			if(localStorage.length>1){
			$(selectors.pending).show();
			$(selectors.done).hide();
			}
			else{
			$(selectors.pending).hide();
			$(selectors.done).show();
			}
        } else if( $(this).attr('id') == 'add' ) {
            $(selectors.listContainer).hide();
            $(selectors.addContainer).show();
			$('#list button').hide(1000);
			$(selectors.pending).hide();
			$(selectors.done).hide();
        }else if( $(this).attr('id') == 'list' ) {
			$(selectors.listContainer).show(1000);
            $(selectors.addContainer).hide();
			if(localStorage.length > 1){
				if(showOnce == 1){
				listTasks();      
				showOnce++;
				}
				$(selectors.pending).hide();
				$(selectors.done).hide();
			}
			else{
				$(selectors.pending).hide();
				$(selectors.done).show();
				$(selectors.listContainer).hide(1000);
			}
        };
		
    },
	
    addTask = function() {
        var $textTask = $(selectors.addContainer).find(selectors.textTask);	
		if(localStorage.length <= 1){localStorage.setItem('index',0);}
		var refIndex = localStorage.getItem('index');
		if( $textTask.val() ) {
							localStorage.setItem(refIndex,$textTask.val());
							$textTask.val('');
							$(selectors.added).show(1000);
							$(selectors.added).hide(1000);
							refIndex++;
							localStorage.setItem('index',refIndex);							
        };
    },
    listTasks = function() {
        var totalTasks = localStorage.length;
        if( totalTasks > 0 ) {
			for(var i=0, len=totalTasks; i<len; i++) {
				if(localStorage.getItem(i)!= null){
					var myTask = "<p class='myTask' id='todo-"+i+"'>"+localStorage.getItem(i)+"<a class='delete-anchor' id='"+i+"' href='#'>DONE</a></p>";
					$(selectors.listContainer).append(myTask);
				}
            }
        } else {
        }
    },
	
	deleteTask = function(){
		localStorage.removeItem($(this).attr('id'));
		$(this).parent().css("display","none");
		$(selectors.deleted).show(1000);
		$(selectors.deleted).hide(1000);
		if(localStorage.length>1){listTasks;}
		else{
		$(selectors.listContainer).hide();
		$(selectors.done).show();
		$(selectors.pending).hide();
		}
	}
        
    return {
        init: function() {
            bindEvents();
        }
    };
})();
$(document).ready(function(){
    var k = 0;
	TODO.init();
});
