(function() {

    // Define the miniki application, currently doing nothing.
    var app = angular.module('miniki', ['hbpCommon']);

    //controller for ticket panel in detailed view
    app.controller('TicketForm', function($scope) {
        $("#TicketToEdit").hide();
        $scope.editTicket = function(ticket) {
            $("#TicketToEdit").show();
            $("#TicketToShow").hide();
        };
    });

    //controller for ticket edition panel in detail view
    app.controller('TicketEditSave', function($scope) {

        $scope.saveEditedTicket = function(pk) {
            // get ticket form
            var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
            var title = $("#title").text()
            var text = $("#text").text()
            $.ajax({
                url: "",
                type: "POST",
                data: { 'pk': JSON.stringify(pk), 'title': title, 'text': text, 'action': "edit_ticket", 'csrfmiddlewaretoken': csrftoken },

                success: function(json) {
                    alert('Your ticket have been edited!');
                    window.location.reload(true)
                },
                error: function(xhr, errmsg, err) {
                    console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                },
            });
            // $("#ticket-title").replaceWith('<td id="ticket-title" class=title width=850>' + title + '</td>');
            // $("#ticket-text").replaceWith('<td id="ticket-text" class=text width=850>' + text + '</td>');
            // $("#TicketToEdit").hide();
            // $("#TicketToShow").show();
        };
    });


    //controller for comment edition in detail view
    app.controller('CommentForm', function($scope) {

        $scope.editComment = function(pk) {
            var comtext = $("#editable-text-" + pk).text()
            angular.element(document.querySelector("#editable-text-" + pk)).attr('contenteditable', "true");
            angular.element(document.querySelector("#editable-text-" + pk)).attr('bgcolor', 'ghostwhite');
            _createButton("Save", saveEditedComment);

            function _createButton(name, func) {
                var btn = $('<input/>').attr({
                    'type': 'button',
                    'id': 'btn' + name,
                    'value': name
                }).bind('click', func);

                $("#panelForButtonSave-" + pk).append(btn);
            };

            function saveEditedComment() {
                // save in database
                var text = $("#editable-text-" + pk).text()
                var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
                $.ajax({
                    url: "",
                    type: "POST",
                    data: { 'pk': JSON.stringify(pk), 'text': text, 'action': "edit_comment", 'csrfmiddlewaretoken': csrftoken },

                    success: function(json) {
                        alert('Your comment have been edited!');
                    },
                    error: function(xhr, errmsg, err) {
                        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                    },
                });
                //  change view
                $("#btnSave").remove();
                angular.element(document.querySelector("#editable-text-" + pk)).attr('contenteditable', "false")
                angular.element(document.querySelector("#editable-text-" + pk)).attr('bgcolor', '');
            }
        };

    });



    app.controller('Detail', function($scope) {
        // this is used to put the ctxstate in the URL of HBP
        $scope.init = function(pk) {
            $scope.pk = pk;
            sendState($scope.pk);
        };

        var sendState = function(pk) {
            window.parent.postMessage({
                eventName: 'workspace.context',

                data: {
                    state: 'ticket.' + pk

                }
            }, 'https://collab.humanbrainproject.eu/');
        };
    });

    app.controller('List', function($scope) {
        // this is used to clean the ctxstate in the URL of HBP when returning to list : no data
        $scope.filter_value = "both"

        $scope.set_filter_value = function(filter_value) {
            $scope.filter_value = filter_value;
        };

        $scope.match_filter = function(ticket_status) {
            if ($scope.filter_value == 'both') {
                return true
            } else if ($scope.filter_value == ticket_status) {
                return true

            } else {
                return false

            }


        };

        var sendState = function() {
            window.parent.postMessage({
                eventName: 'workspace.context',
                data: {
                    state: 'ticket.n'
                },
            }, 'https://collab.humanbrainproject.eu/');
        };
        sendState();


        $scope.myFunction2 = function(ctx) {

            var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
            var pk_list = getCheckedCheckboxesFor('name_box')
            var action_selected = document.getElementById("action_select").value

            $.ajax({
                url: ctx,
                type: "POST",
                data: {
                    'pk': JSON.stringify(pk_list),
                    'action': JSON.stringify(action_selected),
                    'csrfmiddlewaretoken': csrftoken,

                },
                success: function() {
                    alert('DONE!');
                    window.location.reload(true)
                },
                error: function() {
                    alert('ERROR!');
                },
            });


            function getCheckedCheckboxesFor(checkboxName) {
                var checkboxes = angular.element(document.querySelectorAll('input[name="' + checkboxName + '"]:checked')),
                    values = [];
                Array.prototype.forEach.call(checkboxes, function(el) {
                    values.push(el.value);
                });
                return values;
            }
        }

    });

}());






// Bootstrap function
angular.bootstrap().invoke(function($http, $log) {
    $http.get('/config.json').then(function(res) {
        window.bbpConfig = res.data;
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['miniki']);
        });
    }, function() {
        $log.error('Cannot boot miniki application');
    });
});