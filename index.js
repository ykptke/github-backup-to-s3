const backup = require('./backup');
let crontab = require('node-crontab');

require('dotenv').config();

const cronTime = process.env.CRON_TIME;

const options = {
  githubAccessToken: process.env.GITHUB_ACCESS_TOKEN,
  githubOrganization: process.env.GITHUB_ORGANIZATION,
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
  s3AccessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  s3AccessSecretKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
  s3StorageClass: process.env.AWS_S3_STORAGE_CLASS,
};

console.log("Schedule cron jobs.");
crontab.scheduleJob(cronTime, function() {
  console.log("Cron job started.");
  backup(options).then(
    () => {
      console.log('');
      console.log('all repos was succesfully backed up');
    },
    error => {
      console.log('');
      console.error(error);
    }
  );
});
