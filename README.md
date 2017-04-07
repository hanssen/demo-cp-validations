# demo-cp-validatons

This project intends to show my approach to use the 
[ember-cp-validations](https://github.com/offirgolan/ember-cp-validations) plugin.

A Node.js Express server is used to serve user data and generate random backend validation errors. Saving data is not 
implemented, session data will be lost after page reload.

## Requirements

I have following requirements:

1. When opening a _new_ form, there should be no error shown
1. After typing, errors should be shown for the according field
1. When trying to submit an empty _new_ form, all validation errors should be shown
1. When opening an _edit_ form, all errors should be shown immediately (backend might send data which must be updated 
before user can save)
1. When a validation fails on backend side, the validation error should be presented identical to client validation 
errors

## Versions

I created different Versions with Git Tags to show my progress and different approaches with different complexity.

This project is a simple user administration tool, where you can add, list, update and delete users. A user has three 
attributes with individual validations:

* Name (presence, length) 
* E-Mail (presence, format)
* Password (presence, length)

### No Validation

Simple interface without any validation.

Failing all requirements.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd demo-cp-validatons`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Open [http://localhost:4200](http://localhost:4200).

**Be aware:** `app/adapters/application.js` configures host to `localhost:4200`. If you start your server on a different 
port, you have to adapt this file.
