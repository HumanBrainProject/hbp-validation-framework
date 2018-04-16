# karma-global-preprocessor

> Preprocessor which makes variables globally available in your tests

## Installation

    npm install karma-global-preprocessor --save-dev

## Configuration

    module.exports = function (config) {
        config.set({
            ... 
            
            // Set globally available variables
            globals: {
                'MY_VAR': 123
            },
            
            ...
        });
    };

## Using

Now, you will be able to use the variable via `window.globals.MY_VAR` and it will be `123`!