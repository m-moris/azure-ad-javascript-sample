'use strict';

angular.module('app', ['app.config'])
.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(false);
}])
.controller('main', ['$scope', '$http', '$window', '$location', '$httpParamSerializer', 'CONFIG' ,
    ($scope, $http, $window, $location, $httpParamSerializer, CONFIG) => {

        $scope.action = "Login";

        // login action
        let login = () => {
            var params =
                {
                    client_id: CONFIG.client_id,
                    redirect_uri: CONFIG.redirect_uri,
                    response_type: 'token',
                    resource: "https://graph.windows.net/"
                };

            var query = $httpParamSerializer(params);
            var loginUrl = CONFIG.authorization_endpoint + '?' + query;
            $window.location.href = loginUrl;
        };

        // logout acion
        let logout = () => {
            $window.location.href = CONFIG.end_session_endpoint;
        };

        // handle button click event
        $scope.click = (action) => {
            if (action === 'Login') {
                login();
            }
            else {
                logout();
            }
        };

        let result = {};

        // Authorized
        let hash = window.location.hash;
        if (hash) {
            $scope.action = "Logout";

            // Parse url and get token.
            hash.substr(2).split('&').map((value) => {
                var data = value.split('=');
                return {
                    [data[0]]: data[1]
                }
            }).forEach((value) => {
                Object.assign(result, value);
            });

            // print token
            $scope.decoded = jwt_decode(result.access_token);

            // invoke graph api and print me
            $http({
                method: "GET",
                url : "https://graph.windows.net/me?api-version=1.6",
                headers: {
                    Authorization: "Bearer " + result.access_token
                }
            })
            .then((response) =>{
                $scope.me = response.data;

            });
        }
        $scope.result = result;
    }]);