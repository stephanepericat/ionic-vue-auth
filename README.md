# Ionic Vue Auth Demo

## Configure .env

```
VUE_APP_AUTH0_DOMAIN=<domain.us.auth0.com>
VUE_APP_AUTH0_CLIENT_ID=<client.id>
VUE_APP_PACKAGE_ID=co.shortwavaudio.authdemo
```

## Configure URL Types

1. Open Xcode with: `ionic capacitor open ios`
2. Open App settings, go to info tab, and add URL type (+):

    - Identifier: `co.shortwavaudio.authdemo`
    - URL Schemes: `co.shortwavaudio.authdemo`
    - Role: `Reader`
