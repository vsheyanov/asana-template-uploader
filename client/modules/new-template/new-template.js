/**
 * Created by Victor on 25.11.2015.
 */

angular.module('asana-template-uploader')
    .controller('NewTemplateController', ['$scope', function($scope){

        function parseContent(textContent){
            var json = Papa.parse(textContent);


            var nameIndex  = json.data[0].indexOf("Name");
            var notesIndex  = json.data[0].indexOf("Notes");

            var tasks = [];

            for (var i = 1; i < json.data.length; i++){
                tasks.push(new Task(json.data[i][nameIndex], json.data[i][notesIndex]));
            }
            return tasks;
        }

        function Task(name, notes){
            this.name = name;
            this.notes = notes;
        }

        $scope.onFileSelected = function($fileContent){
            console.log($fileContent);

            $scope.selectedTasks = parseContent($fileContent);


        };

        $scope.createTemplate = function(){
            Meteor.call('asanaCreateTemplate',
                $scope.templateName,
                $scope.templateDescription,
                $scope.isPrivate,
                $scope.selectedTasks);
        };
    }]);

angular.module('asana-template-uploader').directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});