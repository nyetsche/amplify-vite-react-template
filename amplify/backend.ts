import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { S3MapStack } from './custom/maps/resource';
import * as s3 from 'aws-cdk-lib/aws-s3';

const backend = defineBackend({
  auth,
  data,
});
new S3MapStack( backend.createStack('mlesko-QUUX-S3MapStack'), 'amplify-amplifyvitereacttemplate-mlesko-sandbox-2045a380c9/mlesko-QUUX-S3MapStack/Default')

/*
const bucketStack = backend.getStack('BucketStack');
const bucket = new s3.Bucket(bucketStack, 'CCMC-mlesko-QUUX-amplify-mint-perch', {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
});
*/
