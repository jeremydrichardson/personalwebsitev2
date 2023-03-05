---
title: Samba file shares on Raspberry Pi
createDate: "2022-01-31"
description: Most of the time I use SSH to interface with my Raspberry pis, including CyberDuck for moving files. However, there are certain operations that require an old fashion file share.
tag: Raspberry Pi, Samba, plex
author: You
published: true
---

Most of the time I use SSH to interface with my Raspberry pis, including CyberDuck for moving files. However, there are certain operations that require an old fashion file share.

## Login to Raspberry Pi

From your favorite terminal app, login with ssh

### Make sure you have Samba installed

```bash
sudo apt-get update

sudo apt-get upgrade

sudo apt-get install samba samba-common-bin

```

### Configure Samba

We’re going to add a share called *Music*.

Edit the file `/etc/samba/smb.conf`

At the bottom of the file, add something like this:

```
[Music]
path = /mnt/easystore/Music
writeable=Yes
create mask=0777
directory mask=0777
public=no
read only=no

```

Create a samba user

```
sudo smbpasswd -a pi
```

Restart Samba

```
sudo service smbd restart
```

### Connect to Samba share from macOS

From the Finder

1. Go to *Go > Connect to Server*
2. Enter the address with the smb prefix (eg. smb://192.168.1.x)
3. Click the + button to add it as a favorite (have to do this for it to ask for username and password for some reason...)
4. Enter samba username and password you created earlier

### Access from Terminal in macOS

You should now be able to access the share at

```bash
/Volumes/Music
```