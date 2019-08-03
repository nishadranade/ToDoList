var nishadTodo = angular.module('nishadTodo', []);

function mainController($scope, $http){
    $scope.formData = {};

    // when landing on the page, get all the todos and show them
    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log("Error: " + data);
        });
    
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};   //clear the form so we can type
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    };

    // delete the todo after checking it
    $scope.deleteTodo = function(id){
        $http.delete('/api/todos/' + id)
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log("Error: " + data);
            });
    };

}