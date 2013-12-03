$(document).ready(function(){
	if(localStorage.length != 0){$('#noItems').slideUp();$('#Items').slideDown();}
	if(localStorage.length == 0 ){$('#Items').slideUp();}
	$('#addButton').click(function(){
		$('#listButton').slideUp();
		$('#noItems').slideUp();  /*This is temporary should chang based on length of storage*/
		$('#myText').slideDown();
		$('#myResult').slideUp();
		$('#addTodo').slideDown();
		$('#Items').slideUp();
		$('#addTodo').click(function(){
			var a = $('#myText').val();
			var ToDo = a+"<a href="+"'#' class='myAnchor'>delete</a>";
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
	
	for(var j = 0;j<localStorage.length;j++){
			var z="<p>"+localStorage.getItem(j)+"</p>";
			$('#result').append(z);
		}
		
	$('#listButton').click(function(){
		$('#myResult').slideDown();			
	});
	
	$('a').click(function(){
		var toDelete = $(this).parent().text();
		for(var i = 0;i<localStorage.length;i++){
			var myKey = localStorage.key(i);
			var myVal = localStorage.getItem(myKey);
			var myValSplit = myVal.split('<');
			var deletion = myValSplit[0]+"delete";
			if(toDelete == deletion){
				localStorage.removeItem(myKey);
				$('#result').empty();
				for(var i = 0;i<=localStorage.length;i++){
					if(i!=myKey){
						var z="<p>"+localStorage.getItem(i)+"</p>";
						$('#result').append(z);
					}
				}
				
			}
			
		}	
	})
	
});
					
