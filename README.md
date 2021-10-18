# aws-test-launcher

Lambda Function to start test execution.

# How to?

Command to package and upload to S3

```
sam package --template-file template.yaml --output-template-file output.yaml --s3-bucket awslauncher
```

Command to deploy

```
sam deploy --template-file output.yaml --stack-name aws-test-launcher --capabilities CAPABILITY_IAM
```

Update your Lambda Function with the new uploaded Zip (S3-Bucket)
