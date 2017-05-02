# Cognito Auth Role for S3

This is configuring the Cognito Auth Role such that it allows a user write and read data directly to S3.

See https://aws.amazon.com/blogs/mobile/understanding-amazon-cognito-authentication-part-3-roles-and-policies/

![cognito-s3-role-01](cognito-s3-role-01.png?raw=true)
![cognito-s3-role-02](cognito-s3-role-02.png?raw=true)
![cognito-s3-role-03](cognito-s3-role-03.png?raw=true)

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": ["s3:ListBucket"],
      "Effect": "Allow",
      "Resource": ["arn:aws:s3:::lastly-dev"],
      "Condition": {"StringLike": {"s3:prefix": ["${cognito-identity.amazonaws.com:sub}/*"]}}
    },
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": ["arn:aws:s3:::lastly-dev/${cognito-identity.amazonaws.com:sub}/*"]
    }
  ]
}
```

Where `lastly-dev` is replaced with the name of the S3 bucket for the user data.
