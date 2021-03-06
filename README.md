# [Components in Angular 1.5](http://prezi.com/zsjz4kuliv_s/?utm_campaign=share&utm_medium=copy&rc=ex0share)
A presentation (linked in the title above) on building and using AngularJS components

Angular 1.5 introduces a new paradigm, in Angular development, by shifting reusable display bits to “Components”.
Angular Components replace many traditional Directives, while continuing to provide a rich ecosystem for handling
isolate scope and change handling, giving us the flexibility to create more modular display blocks for reuse. While
very similar to Directives, there are key differences that a developer needs to be aware of when deciding which to use
in a specific situation. This session will cover the basics of Component development, some of the differences between
Components and Directives, and some guidelines to use when determining which is appropriate for your use case.

## Following Along

To see each step of the process, check out each of the tags beginning with **0.1**, in succession. This file will
contain details of what is happening each step of the way. Final step includes all unit tests.

### Pre-Requisites
- [Node & NPM](https://nodejs.org)
- [Bower](http://bower.io)

All app source is located in the 'src' directory at the root of this project. All gulp tasks are located in the 'gulp/tasks' directory.
When built, final code resides in the 'dist' directory.

### Get Up And Running
- Download the template via the [zip file download](https://github.com/cutterbl/cc-base-app-template/archive/master.zip)
- At a command line prompt, run 'bower install'
- At a command line prompt, run 'npm install' (use sudo if necessary)
- At a command line prompt, run 'npm start' (use sudo if necessary)

The 'npm start' command will run the default 'gulp' task, building the project from source and starting a local node server on port 8080.

Running 'gulp test' will run jasmine tests located in the 'src' directory.
