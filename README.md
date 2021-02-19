# atx-snowpocalypse

A tool to collectively share information about utilities outages during the Texas Snowpocalypse of 2021.

Can you help make this app better?  I would love it if you did!

### How you can help

1. Color gradients for the heatmaps
2. Styling and mobile responsiveness
3. More intuitive form validations
4. General cleanup of the frankencoded landing page
5. A sweet favicon or some bitchin design.

### Get it running

1. Have node.js installed on your computer
2. Clone the repo with `git clone git://github.com/uncletammy/atx-snowpocalypse.git`
3. Change into the project's root directory with `cd atx-snowpocalypse.git`
4. Run `npm install` to install project dependencies.
5. Run `sails lift` then point your browser to `https://localhost:1337`

### Where are the files?

If you're looking for html and javascript files, you'll find them either under the `assets/` directory or under `views`

The vast majority of the code in this project is split between these four files

1. `assets/styles/pages/homepage.css`
2. `assets/styles/pages/homepage.less`
3. `views/layouts/layout.ejs`
4. `views/pages/homepage.ejs`

If you're adding javascript files to the project, stick them in the `assets/js/` directory.  You won't need to add them with a script tag.  Those script tags are created automatically.  You can see them at `views/layouts/layout.ejs`

### Links
+ [See it live](https://snowpocalypse.info/)
+ [About this project](https://old.reddit.com/r/Austin/comments/ln515q/atx_snowpocalypse_resource_map/)
+ [Sails framework documentation](https://sailsjs.com/get-started)

### Version info

This app was originally generated on Wed Feb 17 2021 22:51:34 GMT-0600 (Central Standard Time) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.17.2`](https://github.com/balderdashy/sails-generate/tree/v1.17.2/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

