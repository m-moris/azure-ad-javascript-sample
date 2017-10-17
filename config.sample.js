'use strict';


// These values are defined in the following URL.
// https://login.microsoftonline.com/{tenant}/.well-known/openid-configuration
angular.module('app.config', [])
.constant('CONFIG',
    {
        //client_id : "66e052ed-f0ed-4c6b-a0cb-fb2ec2d92e08",
        client_id : "3fd3a839-4e0c-45ee-a002-c4e2f89dd8b7",
        authorization_endpoint:"https://login.microsoftonline.com/1911a505-bea7-49f3-abc1-2b5e75d0152d/oauth2/authorize",
        end_session_endpoint:"https://login.microsoftonline.com/1911a505-bea7-49f3-abc1-2b5e75d0152d/oauth2/logout",
        redirect_uri : "http://localhost:8080/",
    });
