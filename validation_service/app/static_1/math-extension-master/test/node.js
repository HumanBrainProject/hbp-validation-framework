/* global require it describe */
/* eslint no-sync: 0 */
'use strict'

require ( 'chai' ).should ()
const fs = require ( 'fs' )

const extension = require ( '../src/showdown-math.js' )
const showdown = require ( 'showdown' )

const mdFiles = function ( file ) {
  const ext = file.slice ( -3 )
  return ext === '.md'
}


const map = function ( dir ) {
  return function ( file ) {
    const name = file.replace ( '.md', '' )
    const htmlPath = dir + name + '.html'
    const html = fs.readFileSync ( htmlPath, 'utf8' )
    const mdPath = dir + name + '.md'
    const md = fs.readFileSync ( mdPath, 'utf8' )

    return { name
           , input: md
           , expected: html
           }
  }
}

const converter = new showdown.Converter ( { extensions: [ extension ] } )

const cases = fs.readdirSync ( 'test/cases/' ).filter ( mdFiles )
.map ( map ( 'test/cases/' ) )

const issues = fs.readdirSync ( 'test/issues/' ).filter( mdFiles )
.map ( map ( 'test/issues/' ) )

// Register math extension
// showdown.extensions.math = math

// Normalize input/output
const normalize = function ( testCase ) {

  // Normalize line returns
  testCase.expected = testCase.expected.replace ( /\r/g, '' )
  testCase.actual = testCase.actual.replace ( /\r/g, '' )

  // Ignore all leading/trailing whitespace
  testCase.expected = testCase.expected.split ( '\n' )
  .map ( function ( x ) {
      return x.trim ()
    }
  )
  .join ( '\n' )

  testCase.actual = testCase.actual.split ( '\n' )
  .map ( function ( x ) {
      return x.trim ()
    }
  )
  .join ( '\n' )

  // Remove extra lines
  testCase.expected = testCase.expected.trim()

  // Convert whitespace to a visible character so that it shows up on error reports
  testCase.expected = testCase.expected.replace ( / /g, '·' )
  testCase.expected = testCase.expected.replace ( /\n/g, '•\n' )
  testCase.actual = testCase.actual.replace ( / /g, '·' )
  testCase.actual = testCase.actual.replace ( /\n/g, '•\n' )

  return testCase

}

const assertion = function ( testCase ) {
  return function () {
    testCase.actual = converter.makeHtml ( testCase.input )

    normalize ( testCase )
    .actual.should.equal ( testCase.expected )
  }
}

describe
( 'Math extension simple testcases'
, function () {
    for ( var i = 0; i < cases.length; i += 1 ) {
      it ( cases[ i ].name, assertion ( cases[ i ] ) )
    }
  }
)

describe
( 'Math extension issues testcase'
, function () {
    for ( var i = 0; i < issues.length; i += 1 ) {
      it ( issues[ i ].name, assertion ( issues[ i ] ) )
    }
  }
)
