---
title: AWS CLI commands from FileMaker server Script and Verify Schedules
createDate: "2022-05-03"
description: We ran into an issue where the batch file that we use to run an S3 backup script on a schedule with FileMaker server, was erroring out with no indication of why.
tag: AWS, AWS CLI, CloudFormation, FileMaker
author: You
published: true
---

We ran into an issue where the batch file that we use to run an S3 backup script on a schedule with FileMaker server, was erroring out with no indication of why.

## Setup

FileMaker server has the ability to run scripts on a schedule. We want to run various scripts on schedules that will backup our databases to an S3 bucket.

We do this from the FileMaker server admin console under _Configuration > Script and Verify Schedules._

We add the AWS CLI S3 backup command to a batch file as FileMaker server requires and put it in `c:\Program Files\FileMaker\FileMaker Server\Data\Scripts` (or wherever FileMaker server was installed)

```bash
# Contents of the batch file with the aws cli command
aws s3 sync e:\Backups\Daily s3://oapc-s3-backup-dev/Daily --delete
```

Details [Running system script files](https://help.claris.com/en/server-help/content/schedule-run-system-script.html) in the Claris FileMaker server 19 Help.

## Running the script from FileMaker fails

When selecting the script schedule in the FileMaker server console and clicking _Run Now_ we would just get the quick response that it failed. The event log would just say that the script schedule was _aborted by user_. What!? We didn’t abort it, so what is going on?

### User permissions

We know that FileMaker server runs the script as Local System. We wanted to first check if this user for some reason didn’t have the correct permissions to run our AWS CLI S3 command.

We ended up finding an article about [how to use PsExec.exe to open a command prompt](https://www.winhelponline.com/blog/run-program-as-system-localsystem-account-windows/) as the Local System user so we could do some testing.

After all that, our bat file ran flawlessly. Wasn’t a user permission issue.

### Log output from FileMaker server calling script

We decided to add some logging to the commands in our batch file so that it would save the output of the command to a text file.

```bash
echo "TEST S3 backup command">>e:\Backups\Daily\s3backup.log
# Contents of the batch file with the aws cli command
aws s3 sync e:\Backups\Daily s3://oapc-s3-backup-dev/Daily --delete>> e:\Backups\Daily\s3backup.log
```

We add a quick echo so that we know that the batch file was at least called. And the first time we tried it, that’s all we got, a _TEST S3 backup command_ in the s3backup.log file with nothing else. Weird.

Then simplify...

```bash
echo "TEST S3 backup command">>e:\Backups\Daily\s3backup.log
# Contents of the batch file with the aws cli command
aws --version>> e:\Backups\Daily\s3backup.log
```

Still nothing...ok, something weird is going on. Let’s see if AWS CLI is in the path.

```bash
echo "TEST S3 backup command">>e:\Backups\Daily\s3backup.log
echo %PATH%>> e:\Backups\Daily\s3backup.log
```

AND WE FOUND OUR ISSUE! The output did not include the path to the aws cli!

## Solution

It’s unclear why only when FileMaker server would run the batch file that it didn’t have the correct path. The only thing different from echoing the path from the command prompt as Local System and echoing the path through the batch file that FileMaker server executes is the AWS CLI.

The solution is to add the full path to the aws cli:

```bash
# Contents of the batch file with the aws cli command
"c:\Program Files\Amazon\AWSCLIV2\aws.exe" s3 sync e:\Backups\Daily s3://oapc-s3-backup-dev/Daily --delete
```

Remember the quotes around the path because of the space in _Program Files_.

### AWS CLI install

The only explanation for the path issue is how we installed the aws cli. It is installed as part of our CloudFormation stack using the _userdata_ metadata.

```bash
# Install AWS cli
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi /quiet /norestart
```

I have no idea why that would not modify the path in the one context where FileMaker server runs and yet adds it to the path in every other context we tried.
