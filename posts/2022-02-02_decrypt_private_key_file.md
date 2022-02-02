---
title: Decrypt Private Key File
createDate: "2022-02-02"
description: We recently ran into a situation where we needed to paste the private key file for a certificate into AWS Certificate Manager and realized that it would not accept an encrypted key file.
tag: AWS, Certificates, SSL, openssl
author: You
published: true
---

We recently ran into a situation where we needed to paste the private key file for a certificate into AWS Certificate Manager and realized that it would not accept an encrypted key file.

To determine if a private key file is encrypted you can just look at the first line of the private key file contents:

```bash
-----BEGIN ENCRYPTED PRIVATE KEY-----
```

## Decrypt Private Key file

After a bit of searching we found out how to decrypt the key file.

The following command works on Mac/Linux (still not sure how to do this on Windows...)

```bash
openssl rsa -in privateKeyFilename.pem -out newFilename.pem
```

You will be asked for the passcode that is necessary to decrypt the file.

## Result

If completed successfully you will end up with a new file that has the following at the top:

```bash
-----BEGIN RSA PRIVATE KEY-----
```

Now AWS Certificate Manager will accept this key.