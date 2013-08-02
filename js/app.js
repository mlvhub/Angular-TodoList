angular.module("todoApp", [])
		.controller("TodoCtrl", function($scope){
			$scope.todos = [
				{
					id: 1,
					title: "Go to the grocery store",
					done: false
				},
				{
					id: 2,
					title: "Go to the drugstore",
					done: false
				}
			];

			$scope.todosBeingEdited = []; 

			$scope.isBeingEdited = function(index){
				var id = $scope.todos[index].id,
					todoBeingEdited =  $.grep($scope.todosBeingEdited, function(e){ return e.id == id; }),
				 	isTodoBeingEdited = ( typeof todoBeingEdited[0] != 'undefined' );

				return isTodoBeingEdited;
			};

			$scope.enterEditMode = function(index){
				if( ! $scope.isBeingEdited(index) ){

					var todo = $scope.todos[index];
					$scope.todosBeingEdited.push( todo );

					$("#edit-"+todo.id).focus();
				}
			};

			$scope.exitEditMode = function(index){
				var id = $scope.todos[index].id,
					todos = $scope.todosBeingEdited;

				$.each(todos, function(i){

				    if(typeof todos[i] != 'undefined' 
				    	&& todos[i].id === id) {

				    	todos.splice(i,1);
				    }	
				});
			};

			$scope.highestId = function(){
				var highest = 0;
				for (var i=$scope.todos.length-1; i>=0; i--) {
				    tmp = $scope.todos[i].id;
				    if (tmp > highest) highest = tmp;
				}
				return highest;
			};

			$scope.pushTodo = function(title){
				var nextId = $scope.highestId()+1;
				$scope.todos.push(
					{
						id: nextId,
						title: 	title,
						done: 	false,
						order: $scope.todos.length+1
					}
				);
			};

			$scope.edit = function(index){
				$scope.exitEditMode(index);
			};

			$scope.add = function(){
				$scope.pushTodo($scope.newTodo);
				$scope.newTodo = "";
			};

			$scope.remove = function(index){
				$scope.todos.splice(index,1);
				$scope.reorder();
			};

			$("#todoContainer").sortable({
			   update: function( event, ui ) {
			     $scope.reorder();
			     $scope.$apply();
			   }
			});

			$scope.reorder = function(){
				var uiArray = $("#todoContainer").sortable('toArray');
			     var i = 0;
			     while (i < uiArray.length) {

			     	var id = parseInt( uiArray[i] );
			     	var todo = $.grep($scope.todos, function(e){ return e.id == id; });

			     	if(typeof todo[0] != 'undefined'){
			     		todo[0].order = i+1;
			     		i++;
			     	}else{
			     		uiArray.splice(i,1);
			     	}

			     }
			     
			};
		});