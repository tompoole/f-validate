# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.16.0
------------------------------
*March 26, 2018*

### Fixed
- Trims the value property for conditionalRequired rule to invalidate a field if it only contains spaces

v0.15.0
------------------------------
*March 8, 2018*

### Added
- Improved accessibility by allowing a user to validate the form on pressing enter.


v0.14.0
------------------------------
*February 23, 2018*

### Added
- Comments added to each rule definition

### Fixed
- Fixed instances where the `email`, `minlength` and `maxlength` fields would validate as true when they shouldn't do
- Tests added for the above cases


v0.13.0
------------------------------
*February 23, 2018*

### Changed
- Have made it the default behaviour to set the `novalidate` attribute on a form when `f-validate` is initialised on it.  This can be overidden if the developer wants to allow the default HTML5 validation to kick in by setting the `enableHTML5Validation` option to true.
- Custom error attributes changed so that they are in the format `data-val-` as they weren't consistent.
- Updated some of the test descriptions on error messages to be a little clearer as to the expected functionality.  Re-jigged the ordering as well, so that the default rules come first.
- Snapshots updated with the above changes.


v0.12.0
------------------------------
*February 19, 2018*

### Fixed
- Fixed issue with `validateOn` marking form as valid when `blur` event fired due to validating child elements inside groups
- Readme typo

### Added
- Constant `validationGroup` added that defines the data-attribute for group validation elements

### Changed
- Pull request image updated
- Updated how validation groups get assigned.  Now uses the data-attribute `data-val-group` rather than the class `validation-group` as modules should use attributes for hook definitions.
- Some of the tests updated so that they are a bit clearer in their definition.  Stubbed date has changed to 2018 in the tests (as it was a bit confusing testing against a future date)


v0.11.0
------------------------------
*February 7, 2018*

### Added
- Migrated 'conditionalRequired' rule from other project


v0.10.0
------------------------------
*February 6, 2018*

### Added
- Allow user to specify location of error message per field

### Changed
- Only validate fields on blur/keyup if they are not empty
- dateInFuture: Only validating fields when they have both been interacted with
- dateInFuture: Allowing current year/month to be valid


v0.9.0
------------------------------
*January 30, 2018*

### Added
- Browserslist added

### Changed
- Package update for `gulp-build-fozzie`
- Updating the babel config

### Fixed
- Fixed test warning for js-dom on `submit` (as it doesn't handle submit events)


v0.8.2
------------------------------
*January 26, 2018*

### Added
- Added "files" property to `package.json` so that only the `dist` directory is published to npm.


v0.8.1
------------------------------
*January 26, 2018*

### Removed
- Unnecessary space from import

v0.8.0
------------------------------
*January 24, 2018*

### Added
- Ability to validate on 'blur' or 'keyup'
- Migrated 'dateinfuture' rule from other project
- Explicitly restrict an implementation where you're able to both group messages and validate on blur/keyup

v0.7.0
------------------------------
*January 19, 2018*

### Added
- Default error message to each rule
- Logic to display and hide default error messages
- Logic to display and hide custom error messages
- Ability to group messages together either at the top/bottom of form

### Changed
- Moved classes into constants file

v0.6.1
------------------------------
*January 14, 2018*

### Changed
- Split rule definitions and associated unit tests into separate files.
- Updated some of the unit test descriptions.

### Removed
- Unnecessary eslint disable line comments.


v0.6.0
------------------------------
*January 11, 2018*

### Added
- Callback handlers for success and error events.
- Separate callback.js file added to manage callback addition and running.


v0.5.0
------------------------------
*December 20, 2017*

### Added
- Added JS unit test utility module.

### Changed
- Using JS unit test utility module in unit test files.


v0.4.0
------------------------------
*December 20, 2017*

### Added
- Using `concurrently` to run npm tasks concurrently...!

### Changed
- Main file pointed at dist directory.
- Fixed ESlint issues.
- Changed custom validation rule so that it throws an error rather than logs to the console.
- Tidied up Travis config.

### Removed
- Removed placeholder readmes.


v0.3.0
------------------------------
*December 19, 2017*

### Added
- Removed inputs with certain attributes from being validated.

### Changed
- Prevented the last rule on a field from overwriting previous state.
- Binding isValid method to submit.


v0.2.0
------------------------------
*December 19, 2017*

### Added
- Added base rules JSON and conditions/tests.


v0.1.0
------------------------------
*December 12, 2017*

### Added
- Initial setup of component template.
