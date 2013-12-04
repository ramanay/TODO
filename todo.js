var TODO = (function(){
    var  
	selectors = {
        menu: '#menu',
        listContainer: '#list-container',
        addContainer: '#add-container',
        addButton: '.add-button',
        textTask: '.text-task',
		deleted: '.deleted',
		done: '.no-todo',
		pending: '.have-todo'
    },
    bindEvents = function() {
        $(selectors.menu).on('click','li', handleMenu);
        $(selectors.addContainer).on('click','.add-button',addTask);
		$(selectors.listContainer).on('click','a',deleteTask)
    };var showOnce = 1;
    handleMenu = function() {
        
		if( $(this).attr('id') == 'home' ) {
            $(selectors.listContainer).hide();
            $(selectors.addContainer).hide();
        } else if( $(this).attr('id') == 'add' ) {
            $(selectors.listContainer).hide();
            $(selectors.addContainer).show();
        }else if( $(this).attr('id') == 'list' ) {
            
			$(selectors.listContainer).show();
            $(selectors.addContainer).hide();
			if(localStorage.length > 1){
				if(showOnce == 1){
				listTasks();      
				showOnce++;
				}	
			}
			else{
				$(selectors.done).show();
				$(selectors.listContainer).hide();
			}
        };
		
    },
	
    addTask = function() {
        var $textTask = $(selectors.addContainer).find(selectors.textTask);	
        if(localStorage.length <= 1){localStorage.setItem('index',0);}
		var refIndex = localStorage.getItem('index');
		if( $textTask.val() ) {
							localStorage.setItem(refIndex,$textTask.val());
							refIndex++;
							localStorage.setItem('index',refIndex);							
        };
    },
    listTasks = function() {
        var totalTasks = localStorage.length;
        if( totalTasks > 0 ) {
			for(var i=0, len=totalTasks; i<len; i++) {
				if(localStorage.getItem(i)!= null){
					var myTask = "<p id='todo-"+i+"'>"+localStorage.getItem(i)+"<a class='delete-anchor' id='"+i+"' href='#'>DONE</a></p>";
					$(selectors.listContainer).append(myTask);
				}
            }
        } else {
        }
    },
	
	deleteTask = function(){
		localStorage.removeItem($(this).attr('id'));
		$(this).parent().css("display","none");
		listTasks;
		return true;
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
