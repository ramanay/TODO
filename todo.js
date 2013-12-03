$(document).ready(function(){
	var bindEvents = function(){
		$('#addButton').click(function(){
			$('#listButton').slideUp();
			$('#noItems').slideUp();  /*This is temporary should chang based on length of storage*/
			$('#myText').slideDown();
			$('#myResult').slideUp();
			$('#addTodo').slideDown();
			$('#Items').slideUp();
			$('#addTodo').click(function(){
				var a = $('#myText').val();
				var ToDo = a;
				if(a!=""){
					localStorage.setItem(localStorage.length,ToDo);
					$('#myText').val("");
					$('#itemAdded').slideDown(500);	
					$('#itemAdded').slideUp(500);	
					
				}
			
			});
		});
		$('#homeButton').click(function(){
			$('#listButton').slideDown();
			$('#myText').slideUp();
			$('#addTodo').slideUp();
			$('#itemAdded').slideUp();
			window.location.reload();
		
		});
		$('#listButton').click(function(){
			$('#myResult').slideDown();			
		});
	
		$('a').click(function(){
			var toDelete = $(this).parent().text();
			for(var i = 0;i<localStorage.length;i++){
				var myKey = localStorage.key(i);
				var myVal = localStorage.getItem(myKey);
				var toCheck = myVal+"delete"
				if(toDelete == toCheck){
					localStorage.removeItem(myKey);
					$('#result').empty();
					for(var i = 0;i<=localStorage.length;i++){
						if(i!=myKey){
							if(localStorage.getItem(i) != null){
								var z="<p>"+localStorage.getItem(i)+"<a href="+"'#' class='myAnchor'>delete</a>"+"</p>";
								$('#result').append(z);			
							}
						}
					}
				}
			}	
		})
		
	}
	
	var init = function(){
		if(localStorage.length != 0){
			$('#noItems').slideUp();$('#Items').slideDown();
			for(var j = 0;j<=localStorage.length;j++){
				if(localStorage.getItem(j)!= null){
					var z="<p>"+localStorage.getItem(j)+"<a href="+"'#' class='myAnchor'>delete</a>"+"</p>";
					$('#result').append(z);
				}
			}
		}
		if(localStorage.length == 0 ){$('#Items').slideUp();}
	}
	
	var storageTest = function(){
		if(typeof localStorage ==! 'undefined')
		alert('your browser do not support local Storage');
		else{
		init();
		bindEvents();	
		}
		}
	storageTest();
	
	
});
					
