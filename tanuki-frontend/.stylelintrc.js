const path = require('path');

module.exports = {
  root: true,
  customSyntax: 'postcss-styled-syntax',
  extends: [
    'stylelint-config-standard',
    // https://github.com/constverum/stylelint-config-rational-order
    path.join(__dirname, './stylelint-config-rational-order'),
    'stylelint-config-styled-components'
  ],
  rules: {
    'selector-type-no-unknown': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': [
      'lower', { ignoreKeywords: ['dummyValue'] }
    ],
    'alpha-value-notation': 'number',
    // https://github.com/hudochenkov/postcss-styled-syntax/issues/3
    'block-no-empty': null
  }
};
