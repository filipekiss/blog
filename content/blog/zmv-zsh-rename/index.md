---
title: Moving files in ZSH - The wonderful world of zmv
spoiler:
    Renaming files in the command line can be quite cumbersome sometimes. zmv is
    a function in zsh that makes it much easier to perform this task.
date: 2019-11-12
published: true
---

From time to time I find myself trying to move a batch of files that have a
similar pattern in their names but doesn't quite match an easy to write glob
pattern. In the past, I used to write quick and dirty scripts — usually in shell
script, nothing fancy — to make it easier to move these files around. A few
months ago I discovered `zmv`, a zsh function that is **much better** than plain
old `mv` to move files around. Since an example is worth a thousand blog posts,
let's jump right into it.

I mean, almost. Before we start, make sure you have `zmv` loaded in your shell —
it's not loaded by default:

```bash{outputLines:2,5-8}
which zmv
zmv not found
autoload -Uz zmv
which zmv
zmv () {
        # undefined
        builtin autoload -X
}
```

Don't be scared by the `undefined`. This is normal when dealing with [zsh
autoload functions]. We can now move on.

#### Changing file extensions

For the first example, let's start with something really simple. Say you're
upgrading and old codebase and you want to change all `.js` files to `.ts`
files. Let's assume the structure is similar to the structure below:

```bash{outputLines:2-10}
tree my-awesome-library/
my-awesome-library
└── src
    ├── index.js
    ├── library
    │   ├── helpers.js
    │   └── utils.js
    ├── parser.js
    └── vendor
        └── third-party-lib.js
```

To move everything to have a `.ts` extension using **only** `mv`… is not
possible. Of course, you can use a loop with parameters expansions and
replacement:

```bash{outputLines:2-6}
for file in **/*.js; do mv $file ${file/.js/.ts}; done;
src/index.js -> src/index.ts
src/library/helpers.js -> src/library/helpers.ts
src/library/utils.js -> src/library/utils.ts
src/parser.js -> src/parser.ts
src/vendor/third-party-lib.js -> src/vendor/third-party-lib.ts
```

But, first of all, that's not very intuitive and, if you are like me and you
want to know what is actually going to happen before you run the command, you
always loop using an `echo` or a `print` statement and then you have to either
retype the whole thing or edit text directly in the CLI (which is not the most
pleasant thing to do).

Let's see how we can tackle this with `zmv`:

```bash{outputLines:2-6}
zmv -n -W '**/*.js' '**/*.ts'
mv -- src/library/helpers.js src/library/helpers.ts
mv -- src/library/utils.js src/library/utils.ts
mv -- src/vendor/third-party-lib.js src/vendor/third-party-lib.ts
mv -- src/index.js src/index.ts
mv -- src/parser.js src/parser.ts
```

I'll explain what's happening above, but first, let's quickly compare this with
the loop we used before:

```bash
zmv -n -W '**/*.js' '**/*.ts' # 29 chars
for file in **/*.js; do mv $file ${file/.js/.ts}; done; # 56 chars
```

Besides saving ~51% of your typing time, which one is easier to understand (or
even guess) what it will actually do with your files?

Let's understand what's going on with `zmv` on the command above:

```bash{outputLines:2-6}
zmv -n -W '**/*.js' '**/*.ts'
# zmv: the zmv command itself
# -n: The famous 'dry-run', so you can see the result before renaming your files
# -W: Since our pattern is very simple, we use this flag so we don't need to do grouping manually
# '**/*.js': The first pattern. Basically means 'match all files that end in .js'
# '**/*.ts': The second pattern (the replacement). It means 'keep everything the same, but change the end to .ts'
```

After you ran the command above and are sure that the output is what you desire,
just remove the `-n` flag and `zmv` will do the heavy lifting for you (I've
added the `-v` flag just so the operations would be output, but you can leave it
out):

```bash{outputLines:2-6}
zmv -v -W '**/*.js' '**/*.ts'
mv -- src/library/helpers.js src/library/helpers.ts
mv -- src/library/utils.js src/library/utils.ts
mv -- src/vendor/third-party-lib.js src/vendor/third-party-lib.ts
mv -- src/index.js src/index.ts
mv -- src/parser.js src/parser.ts
```

So, easy as that we just rename all `.js` files to `.ts` and we didn't need to
care about folder structure or anything like that. This is a simple pattern, but
`zmv` is very powerful and we gonna take a look at a slightly more complex
transformation.

#### Patterns and groups in `zmv`

First of all, let me get this out of the way: `zmv` does not operate using
regular expressions, but it uses [glob operators] to match the files. It's the
same pattern you are used to use in the CLI environment but, unfortunately, we
can't do things like `[0-9]{4}` to match any sequence of 4 numbers. We actually
need to repeat the pattern four times — i.e. `[0-9][0-9][0-9][0-9]` - to get the
same result.

First, let's repeat the example above using group matches:

```bash{outputLines:2-6}
zmv -n '(**/)(*).js' '$1$2.ts'
mv -- src/library/helpers.js src/library/helpers.ts
mv -- src/library/utils.js src/library/utils.ts
mv -- src/vendor/third-party-lib.js src/vendor/third-party-lib.ts
mv -- src/index.js src/index.ts
mv -- src/parser.js src/parser.ts
```

Let's breakdown the pattern above (I will skip `zmv -n`, you already know what
that means):

##### `'(**/)(*).js'`

First thing to notice in the pattern above is that it's surrounded by single
quotes. This is important to ensure that `zsh` itself won't try to transform
this in a glob.

Secondly, notice that the slash is actually inside the first group (everything
inside the first parentheses). This is to ensure that `zmv` will respect the
current folder structure we have.

After that, we have the second group. This will be used as the file name. In the
pattern above, the filename is everything after the last `/` and before the
`.js`. The file extension is not inside a group because we won't use it, so
there's no need to capture it.

So, let's take, for example, the file `src/library/utils.js`. When the
expression above finds this path, the results are like this:

```
group 1: src/library/
group 2: utils
```

I think you can pretty much guess what happens in the second pattern, but let's
go over it real quick.

##### `'$1$2.ts'`

As you can see, we simply join the two captured groups (so, in the example
above, `src/library/` and `utils`) and append the `.ts` extension to it. Note
that we don't add a `/` between `$1` and `$2`: The `/` is already inside the
first group.

Of course it's much easier to use the `-W` flag like we did above, but it is
important to understand how `zmv` captures and treats groups, so you can
leverage all it's power. Let's try another example. Imagine the following (very
simple) file structure:

```
random-pictures-folder
├── 1
│   └── 19145-22371.jpg
├── 10
│   ├── 19237-9575.jpg
│   └── 3095-21999.png
├── 11
├── 12
│   ├── 19505-18756.jpg
│   └── 8176-27131.png
├── 13
│   ├── 13170-2864.jpg
│   └── 3374-20305.png
├── 14
│   ├── 14108-5664.jpg
│   └── 25497-32117.png
├── 15
│   ├── 6132-16722.png
│   └── 9028-25007.jpg
├── 16
│   └── 24292-20353.jpg
├── 17
│   ├── 10573-7908.jpg
│   └── 20989-20414.png
├── 18
│   └── 24239-15240.png
├── 19
│   └── 30373-27103.png
├── 20
│   └── 31897-18687.jpg
├── 4
│   └── 11363-15067.png
├── 5
│   └── 29448-13817.jpg
└── 8
    └── 25617-17253.png

15 directories, 20 files
```

It's a simple tree with some folders with one picture whose name is composed of
two random numbers separated by a dash and that can be either a `.jpg` or `.png`
and a folder with two pictures, one for each of those extensions. What we want
to achieve is move all the pictures outside these folders and name them in the
following fashion:
`picture-pictureNumber2-folderNumber-pictureNumber1.extension`. Nothing too
difficult, but it will give us a good understanding of how the groups work. To
achieve that, we'll use the following command:

```bash
zmv -n '(*)/(*)-(*).(jpg|png)' 'picture-$2-$3-$1.$4'
```

##### `'(*)/(*)-(*).(jpg|png)'`

This expression is very straightforward, but let's see how it works: The first
group captures the folder name. The second group captures the first random
number from the picture name, the third group captures the second one and the
last group captures the file extension. As you can see, I've used `(jpg|png)`
instead of an asterisk, so if there's a files with another extension (or no
extension), it wouldn't be affected by `zmv`

##### `picture-$2-$3-$1.$4`

The replacement expression is very straightforward. I simply use the group
numbers to format the file with the names I want them to have. I can even
reorder the groups and give a filename completely new piece, like I did with the
`picture` at the beginning of the expression. Running the command will give us
the expected result:

```bash{outputLines:2-21}
zmv -n '(*)/(*)-(*).(jpg|png)' 'picture-$2-$3-$1.$4'
mv -- 1/19145-22371.jpg picture-19145-22371-1.jpg
mv -- 10/19237-9575.jpg picture-19237-9575-10.jpg
mv -- 10/3095-21999.png picture-3095-21999-10.png
mv -- 12/19505-18756.jpg picture-19505-18756-12.jpg
mv -- 12/8176-27131.png picture-8176-27131-12.png
mv -- 13/13170-2864.jpg picture-13170-2864-13.jpg
mv -- 13/3374-20305.png picture-3374-20305-13.png
mv -- 14/14108-5664.jpg picture-14108-5664-14.jpg
mv -- 14/25497-32117.png picture-25497-32117-14.png
mv -- 15/6132-16722.png picture-6132-16722-15.png
mv -- 15/9028-25007.jpg picture-9028-25007-15.jpg
mv -- 16/24292-20353.jpg picture-24292-20353-16.jpg
mv -- 17/10573-7908.jpg picture-10573-7908-17.jpg
mv -- 17/20989-20414.png picture-20989-20414-17.png
mv -- 18/24239-15240.png picture-24239-15240-18.png
mv -- 19/30373-27103.png picture-30373-27103-19.png
mv -- 20/31897-18687.jpg picture-31897-18687-20.jpg
mv -- 4/11363-15067.png picture-11363-15067-4.png
mv -- 5/29448-13817.jpg picture-29448-13817-5.jpg
mv -- 8/25617-17253.png picture-25617-17253-8.png
```

If you pay attention, every picture was moved outside their folder and now
follows the naming pattern we specified previously. This is great to reorganize
_not-so-simple_ file trees (e.g. when refactoring code or sorting the pictures
from that trip to Paris)

So, that's the basics of `zmv`. If you have any questions or just want to chat,
just [say hello]; I hope you enjoyed and learned something new!

[zsh autoload functions]:
    http://zsh.sourceforge.net/Doc/Release/Functions.html#Autoloading-Functions
[glob operators]:
    http://zsh.sourceforge.net/Doc/Release/Expansion.html#Glob-Operators
[zmv-source]: https://github.com/zsh-users/zsh/blob/master/Functions/Misc/zmv
[say hello]: https://twitter.com/filipekiss
