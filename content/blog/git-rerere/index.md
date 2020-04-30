---
title: The magic of git reuse recorded resolution (or rerere)
spoiler:
    Record conflicts fingerprints and make it easier to handle conflicts,
    specially during rebases.
date: 2019-12-19
published: true
---

We've all been there. You're working in a repository and will fix a conflict
during a merge or rebase. A couple of days later, you try to do another merge
and **the same conflict happens again**. Wouldn't it be nice if git was able to
remember a conflict resolution? That's what I am about to show you.

`rerere` is a weirdly-named and kind of obscure feature from git.
