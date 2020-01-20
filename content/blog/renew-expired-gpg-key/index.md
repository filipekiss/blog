---
title: How to renew a (soon to be) expired GPG key
spoiler: How to change a key expiration date even after it has expired.
date: 2020-01-20
published: true
---

Almost six months ago I published [a quick guide] teaching how to generate a GPG
key and use it to sign your git commits. During the creation of the key, I
recommended you set an expiration date. Today, my key has expired and I'm taking
the opportunity to write this small guide on how to proceed if this happens to
you.

First, run `gpg --list-secret-keys` and you should see the information that your
key has expired:

```bash{outputLines:2-7}
gpg --list-secret-keys
/Users/filipe/.gnupg/pubring.kbx
--------------------------------
sec   rsa2048/A5A675575744B557 2019-07-23 [SC] [expired: 2020-01-20]
BE067D6014DA532143BEE0FCA5A675575744B557
uid                 [ultimate] Test Key <test@key.com>
ssb   rsa2048/A94CC8A32216CCEE 2019-07-23 [E] [expired: 2020-01-20]
```

As you can see, the key is expired. To renew the key, you'll run
`gpg --edit-key <KEYID>`, replacing `<KEYID>` with the ID for your key. (In the
example above it would be `BE067D6014DA532143BEE0FCA5A675575744B557`) and you'll
be in the gpg prompt:

```bash{outputLines:2-15}
gpg --edit-key BE067D6014DA532143BEE0FCA5A675575744B557
gpg (GnuPG) 2.2.17; Copyright (C) 2019 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  rsa2048/A5A675575744B557
     created: 2019-07-23  expired: 2020-01-20  usage: SC
     trust: ultimate      validity: ultimate
ssb rsa2048/A94CC8A32216CCEE
     created: 2019-07-23  expired: 2020-01-20  usage: E
[ultimate] (1). Test Key <test@key.com>

gpg>
```

Type `expire` and then Enter and follow the prompts to renew your key.

```bash{outputLines:2-8,10,12-16}
gpg> expire
Changing expiration time for the primary key.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 6m
Key expires at Sat Jul 18 17:09:19 2020 CEST
Is this correct? (y/N) y
sec  rsa2048/A5A675575744B557
     created: 2019-07-23  expires: 2020-07-18  usage: SC
     trust: ultimate      validity: ultimate
ssb  rsa2048/A94CC8A32216CCEE
     created: 2019-07-23  expired: 2020-01-20  usage: E
```

After that is finished, you also need to update the expiration date for your
subkey. To do that, first select the subkey using the `key <key number>`
command:

```bash{outputLines:2-3}
gpg> key 1
sec  rsa2048/A5A675575744B557
     created: 2019-07-23  expires: 2020-07-18  usage: SC
     trust: ultimate      validity: ultimate
ssb* rsa2048/A94CC8A32216CCEE
     created: 2019-07-23  expired: 2020-01-20  usage: E
[ultimate] (1). Test Key <test@key.com>
```

Notice the `*` after on the second key (right after `ssb`). That means your
subkey is selected. Just run the `expire` command again:

```bash{outputLines:2-8,10,12-16}
gpg> expire
Changing expiration time for the primary key.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 6m
Key expires at Sat Jul 18 17:09:19 2020 CEST
Is this correct? (y/N) y
sec  rsa2048/A5A675575744B557
     created: 2019-07-23  expires: 2020-07-18  usage: SC
     trust: ultimate      validity: ultimate
ssb* rsa2048/A94CC8A32216CCEE
     created: 2019-07-23  expires: 2020-07-18  usage: E
```

And that's it. Your keys are valid and can be used again. If you have more keys,
just repeat the steps above for every key and subkey you have. In the end, type
`quit` and confirm you wish to save changes.

I hope you found this useful. If you have any suggestions or comments, [let me
know].

[a quick guide]: /git-gpg-verified-commits/
[let me know]: https://twitter.com/filipekiss
