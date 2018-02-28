# Fake Facebook Hack

**Current Status: Incomplete**

![screenshot](https://i.imgur.com/bnhahFc.png)

Started probably as a joke/collab idea by `kurtr` on DevRant (https://devrant.io/collabs/1179923) and I thought "Hey, I've made something
similar. Why not do it?", and so I did. Although unlike the initial idea, this
doesn't make use of Facebook's OAuth but rather Facebook's internal API for messenger. Also, as
`-vim-` suggested, I turned this into a CLI app, unlike it's predecessor
which was based on Electron. I've tried to give it a very 'warez' feeling with a
tad bit of inspiration from Metasploit and I really hope it looks convincing.

What it's supposed to do is basically:

1. Log into the skiddie's Facebook.
2. Allow him to choose the friends he wants to 'hack'.
3. Pretend to 'hack' by displaying random content, logs and code to make it seem
   like it's doing something.
4. Message the people he tried to 'hack', stating that the said person attempted to
   hack him/her.
5. ...
6. PROFIT.

Do note that credentials don't actually touch anything besides Facebook's servers. This is not meant to be something used to harvest credentials. I'm not that evil.
