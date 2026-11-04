---
title: Difference between Netcat and SSH
date: 2026-11-04
tag: CTF
excerpt: SSH and Netcat both seem similar on the surface but have some major differences which change a lot
---

Today I was just practicing some simple challenges on [CyLab Academy](https://learn.cylabacademy.org/) (which is a great site to get started with CTF challs btw) and I got curious about something which I should have learned long ago. What makes netcat and ssh different. Now anyone who's experienced in this area would think this is super-obvious and yeah, even I am ashamed I just got to know this even though I have used them both several times before.

That is the reason I thought I should document this here so I never forget:

>**Netcat** sends raw data. It adds nothing on top of TCP. Whatever bytes you type go to the server exactly as typed, and whatever the server sends comes straight back. There’s **no login, no encryption, and no rules** about what the conversation looks like. Whatever program listens on that port decides what happens, which is why a CTF challenge **can just be a script that prints a question and reads your answer**.  
>  
>**SSH** is a full protocol on top of TCP. When you run <kbd>`ssh user@server -p 2222`</kbd>, a lot happens before you see a prompt. The client and server first agree on encryption, so everything after that, including your password, is scrambled for anyone watching the network. Then the server proves its identity with its host key. That’s the “are you sure you want to continue connecting?” message on first connect, and the fingerprint gets saved in `~/.ssh/known_hosts`. Next, you prove your identity with a password or an SSH key, and the server checks that user exists and is allowed in. Finally, **the server starts a shell for you as that user, so you get a real terminal and can run any command your account allows**."

## How I came to think of it
The real wake-up call for me was when I accidentally used:
```bash
ScalledOne23-academy@webshell:~$ nc chatelaine.cylabacademy.net 14497
```
when the server was actually using SSH. It sent some raw data which it normally sends but then it's all messed up because there's no appropriate response from my end since I was using netcat instead of SSH.

Then I finally used SSH like a normal person would and this is how it went:

```console
ScalledOne23-academy@webshell:~$ ssh ctf-player@chatelaine.cylabacademy.net -p 14497
The authenticity of host '[chatelaine.cylabacademy.net]:14497 ([18.190.79.158]:14497)' can't be established.
ED25519 key fingerprint is SHA256:nalfXhowfu1stSyT0M4F6ZC1kzwfaCJibpzyUyiqt/U.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? [[yes]]
Warning: Permanently added '[chatelaine.cylabacademy.net]:14497' (ED25519) to the list of known hosts.
ctf-player@chatelaine.cylabacademy.net's password: 
Welcome to Ubuntu 24.04.4 LTS (GNU/Linux 7.0.0-1014-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

ctf-player@academy-chall$
```

I noticed all this and realised SSH required authentication, while netcat didn't. There had to be some big difference between them. Even now I don't understand the working of both even individually, but for all practical purposes (for now), understanding this difference is a good start.

### The conclusion I came to
Netcat and SSH both use TCP to communicate, but unlike Netcat, SSH is a whole protocol which builds on it, gives the user a remote shell access and has authentication and encryption to make it more secure and reliable, but a little more complex to use. Whereas, Netcat is preferred for simple challenges which use programs to read input from our end and respond accordingly.

Hope this helps others like me realise this sooner. 

**Regards,**  
**Harshit Lakhotia**