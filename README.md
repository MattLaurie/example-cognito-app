# Example Cognito App

This example app uses [Amazon Cognito](https://aws.amazon.com/cognito/) to provide user 
  management and authentication.
  
`In progress`
  
## Setting up Cognito

Follow the instructions in [docs/cognito-setup/README.md](docs/cognito-setup/README.md) to 
  obtain:
  
* `region`
* `userPoolId`
* `clientId`
* `identityPoolId`

If you would like to connect to an API Gateway via Serverless then also obtain the User Pool ARN. 
  
## Configuration

Place the details from `Setting up Cognito` above into the `environment.ts` and `environment.prod.ts` files.

`environment.ts`:
```typescript
export const environment = {
  production: false,
  aws: {
    region: 'XX-XXXX-X',
    userPoolId: 'XX-XXXX-X_XXXXXXXXX',
    clientId : 'XXXXXXXXXXXXXXXXXXXXXXXXX',
    identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
  }
};
```

## Extra: Connecting to API Gateway

* Obtain ARN for User Pool created in `Setting up Cognito` (User Pool > Pool ARN)
* Use Serverless to configure an [API Gateway instance](https://serverless.com/framework/docs/providers/aws/events/apigateway/)
* Deploy serverless project
* Obtain API gateway url from Serverless deployment
* Add `gatewayUrl` value to `environment.ts`
* Obtain session id token JWT from Cognito
* Include session id JWT in `Authorization` header of http calls to API Gateway 

`environment.ts`:
```typescript
export const environment = {
  aws: {
    /* add the following */
    gatewayUrl: 'https://XXXXXXXXXX.execute-api.XX-XXXX-X.amazonaws.com/XXX/'
  }
};
```

`core/app.service.ts`:

```typescript
dispatch(action: string, payload?: any): Promise<any> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token
  });
  const options = new RequestOptions({ headers: headers });
  const url = `${environment.aws.gatewayUrl}/${action}`;
  return this.http.post(url, payload || {}, options)
    .map(this.extractData)
    .catch(this.handleError)
    .toPromise();
}

/* example if there was a /hello resource defined in API Gateway */
hello(name: string) {
  const payload = {
    'name': name
  };
  return this.dispatch('hello', payload);
}
```

  
## References

* [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws/amazon-cognito-identity-js)
* [Serverless](https://serverless.com)
