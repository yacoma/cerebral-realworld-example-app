# ![Cerebral Example App](project-logo.png)

> ### [Cerebral](https://cerebraljs.com) codebase containing real world examples (CRUD, auth, advanced patterns, etc)
  that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](http://conduit.yacoma.it)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **Cerebral**
including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [**Cerebral**](https://cerebraljs.com) community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the
[RealWorld](https://github.com/gothinkster/realworld) repo.


## Getting started

You can view a live demo over at http://conduit.yacoma.it.

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server (this project uses parcel)

The local web server will run on port 1234. You can override the default port with the parcel `-p <port number>` option.

We recommend installing the [Cerebral debugger](https://cerebraljs.com/docs/introduction/debugger.html),
which allows you to follow exactly what happens in the App. It virtualizes the signal flow, the recent state of the state-tree,
the history of mutations and provider calls and the component usage.
You can also create [snapshot tests](<https://cerebraljs.com/docs/api/test#test-snapshot-testing-(beta)>) directly from the debugger.
The debugger works for your local installation as well as for the [live demo](http://conduit.yacoma.it) on port 8585.


### Making requests to the backend API

For convenience, we have a live API server running at https://conduit.productionready.io/api for the application
to make requests against. You can view [the API spec here](https://github.com/GoThinkster/productionready/blob/master/api)
which contains all routes & responses for the server.

The source code for the backend servers can be found in the [main RealWorld repo](https://github.com/gothinkster/realworld).

If you want to change the API URL to a local server, simply edit `src/constants.js`
and change `API_URL` to the local server's URL (i.e. `http://localhost:3000/api`)


## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit".
It uses a custom API for all requests, including authentication.
You can view a live demo over at http://conduit.yacoma.it.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/@username, /#/@username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles


# Deployment

Here an example for deployment on a dedicated server.

We use a `post-receive` git hook to puplish the repository on the production
server. He triggers on every push to the git repo on the server.

```sh
#!/bin/bash
#
set -x
prod_path="PATH TO CLIENT APP"

while read oldrev newrev ref
do
        branch=`echo $ref | cut -d/ -f3`
        if [[ "master" == "$branch" ]]; then
                git --work-tree=$prod_path checkout -f $branch
                cd $prod_path
                make deploylive
                echo 'Changes pushed live.'
        fi
done
```

The `post-receive` hook uses the path defined in the `prod_path`
variable. Make sure that this path exists on the server before pushing
the first time. If you want it less verbose you can remove `set -x`.

The hook triggers `make deploylive` which is defined in `Makefile`.
Remember to put a tab character at the beginning of every recipe line!
```make
.PHONY:	deploylive
deploylive:
	rm -rf node_modules
	npm install
	npm run build
```
This installs the dependencies and builds the App.

In the server config you need to point to the path of your client build.
An example for nginx:
```conf
server {
    listen      [IP]:[PORT];
    server_name [SERVERNAME];

    location / {
        root           [PATH TO CLIENT BUILD DIRECTORY];
        try_files      $uri $uri/ /index.html;
        expires        max;
    }
}
```
