# Sample of OAuth2 implicit grant flow in Azure Active Directory

[Japanese](./README.ja.md)

This sample is created for the purpose of self-study. This client (JavaScript) authenticates to Azure AD and gets an access token(JWT). This sample uses [jwt-decode](https://github.com/auth0/jwt-decode) to decode JWT. This library does not support validation for JWT.

I think that it's much better to use ADAL.js.

## Preparation

- Register web application into Azure Active Directory.  
You have to grant Grap API. See following URL.
[Integrating Applications with Azure Active Directory | Microsoft Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-integrating-applications)
- If you will use `http-server`, set the reply uri to `http://localhost:8080/`.
- You have to edit the following items in manifest.

```
{
    "oauth2AllowImplicitFlow": true,
}
```

- Rename `config.sample.js` to  `config.js` and , embed `tenant` and `client-id`.

```json
    {
        client_id : "<<client-id>>",
        authorization_endpoint:"https://login.microsoftonline.com/<<tenant>>/oauth2/authorize",
        end_session_endpoint:"https://login.microsoftonline.com/<<tenant>>/oauth2/logout",
        redirect_uri : "http://localhost:8080/",
    }
```

## Run

Start the http-server. Alternatively, you may use any different HTTP server, but be careful with the response URL.

```
> npm install http-server
> .\node_modules\.bin\http-server.cmd
```

1. Click Login button and redirect authentication page.
1. Input your credential. When authenticated, redirect to reply URL and clients get token.
1. Invoke Graph API with token from client.
1. Some information will be displayed.

## Reference

+ [Understanding the OAuth2 implicit grant flow in Azure AD | Microsoft Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-dev-understanding-oauth2-implicit-grant)
+ [Authentication Scenarios for Azure AD | Microsoft Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-scenarios#single-page-application-spa)
+ [Authentication Scenarios for Azure AD | Microsoft Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-scenarios#single-page-application-spa)