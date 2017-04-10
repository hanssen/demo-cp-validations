# demo-cp-validatons

This project intends to show my approach to use the 
[ember-cp-validations](https://github.com/offirgolan/ember-cp-validations) plugin.

This project is a simple user administration tool, where you can create, list, update and delete users.

A user has three attributes with individual validations:

* Name (presence, length) 
* E-Mail (presence, format)
* Password (presence, length)

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

### No Validation (Tag: 1-no-validation)

Simple interface without any validation.

Failing all requirements.

#### Test 

1. Check out git tag `1-no-validation` 
1. Create and update users -> no validation is active.

### Default Validation (Tag: 2-default-validation)

Implementation very close to suggestion at bottom of 
[ember-cp-validations/docs](http://offirgolan.github.io/ember-cp-validations/docs/modules/V-Get%20Helper.html).

Failing requirements 1, 3, 5.

#### Test

1. Check out git tag `2-default-validation`
1. Click _Add User_ -> validation errors appear immediately (failing requirement 1, 3)
1. Click _Edit_ for user _Test_ -> validation error appears immediately (fulfilling requirement 4)

### Advanced Validation - Version A (Tag: 3-advanced-validation)

Show validations via components `validationError` attribute, shadowing the plugin results. This attribute will be 
updated by:

* `didRender` hook to show initial validation errors on new form. 
* Observer on "V-Get Helper Module message" of current attribute 
* Observer on model `revalidation` flag, which is triggered on failed validation in _new_ route.

Failing requirement 5

#### Test

1. Check out git tag `3-advanced-validation`
1. Click _Add User_ -> validation errors do **not** appear (fulfilling requirement 1)
1. Click _Save_ -> validation errors appear (fulfilling requirement 3)
1. Click _Edit_ for user _Test_ -> validation error appears immediately (fulfilling requirement 4)

### Advanced Validation + Server Errors (Tag: 4-server-validation)

Show server validation errors by watching `model.errors.[]` which is updated by adapter and use serverValidationError
function in component to render these errors into template.

The "backend server" is configured to send random validation errors. The random error ratio can be adjusted in 
`/server/index.js` by changing `randomErrors`.

Fulfilling all requirements.

#### Test

1. Check out git tag `4-server-validation`
1. Edit user _Alice_ and click _Save_ -> validation error(s) _might_ appear (repeat several times or set "random error 
ratio" to 1.0 as described above)
1. Repeat until validation errror(s) appeared
1. Repeat until save was succesful appeared

### Advanced Validation - Version B (Tag: 5-advanced-validation-b)

Based on example at https://offirgolan.github.io/ember-cp-validations/ 
([full code](https://github.com/offirgolan/ember-cp-validations/tree/master/tests/dummy))

* Better approach: no observers or watches only computed properties
* Still need to set a flag in _new_ controller: `this.set('didValidate', true)`

Failing requirement 5

#### Test

1. Check out git tag `5-advanced-validation-b`
1. Click _Add User_ -> validation errors do **not** appear (fulfilling requirement 1)
1. Click _Save_ -> validation errors appear (fulfilling requirement 3)
1. Click _Edit_ for user _Test_ -> validation error appears immediately (fulfilling requirement 4)

### Advanced Validation + Server Errors - Version B (Tag: 6-server-validation-b)

Show server validation errors by watching `model.errors.[]` which is updated by adapter and use serverValidationError
function in component to render these errors into template.

The "backend server" is configured to send random validation errors. The random error ratio can be adjusted in 
`/server/index.js` by changing `randomErrors`.

Fulfilling all requirements.

#### Test

1. Check out git tag `6-server-validation-b`
1. Edit user _Alice_ and click _Save_ -> validation error(s) _might_ appear (repeat several times or set "random error 
ratio" to 1.0 as described above)
1. Repeat until validation errror(s) appeared
1. Repeat until save was succesful appeared

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
