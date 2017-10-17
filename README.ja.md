# Azure Active Directory での OAuth2 の暗黙的な許可を利用したサンプル

自己学習目的に作成したサンプルです。クライアントサイドから、ADにて認証を行いアクセストークン（JWT）を取得し、Graph APIを呼び出すまでの一連の流れを実装してあります。

JWTのデコードには、[jwt-decode](https://github.com/auth0/jwt-decode) を利用しています。単なるデーコーダで検証をサポートしてないので、JWTの検証はしていません。

普通は専用のJavaScriptライブラリを使ったほうがよいでしょう。

## 準備

- Azure Active Directory にてWebアプリを登録する。  
以下のURLを参考にアプリケーションを登録し、Graph APIへのアクセス権限を与えておく。  
[Azure Active Directory とアプリケーションの統合 | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-integrating-applications)
- 後述する `http-server` を使うなら、応答URLには、http://localhost:8080/ を登録する。
- マニフェストファイルの `oauth2AllowImplicitFlow` を `true`にする。

```
{
    "oauth2AllowImplicitFlow": true,
}
```

- `config.sample.js` を `config.js`にリネームした後、`tenant` と `client-id` を埋めむ。

```json
    {
        client_id : "<<client-id>>",
        authorization_endpoint:"https://login.microsoftonline.com/<<tenant>>/oauth2/authorize",
        end_session_endpoint:"https://login.microsoftonline.com/<<tenant>>/oauth2/logout",
        redirect_uri : "http://localhost:8080/",
    }
```

## 実行

適当にWebサーバにデプロイすれば動きますが、node.js がインストールされていれば、以下で動きます。リダイレクト先のURLに注意して、必要ならConfigを書き換えてください。

```
> npm install http-server
> .\node_modules\.bin\http-server.cmd
```

1. Loginボタンを押すと認証画面にリダイレクトされるので認証します。
1. 認証されるとリダイレクトされるのでレスポンスをパースしてトークンを取り出します。
1. トークンを利用してGraph APIを叩きます。
1. 上記の情報をページに表示します。


## 参考URL
+ [Azure AD の認証シナリオ | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-authentication-scenarios#single-page-application-spa)
+ [Azure AD での OAuth2 の暗黙的な許可フローについて | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-dev-understanding-oauth2-implicit-grant)
+ [AzureAD/azure-activedirectory-library-for-js](https://github.com/AzureAD/azure-activedirectory-library-for-js)


