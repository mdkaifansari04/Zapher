module.exports = {
  //...
  ignoreWarnings: [
    {
      module: /module2\.js\?[34]/, // A RegExp
    },
    {
      module: /[13]/,
      message: /homepage/,
    },
    /warning from compiler/,
    /Serializing big strings/,
    (warning) => true,
  ],
};