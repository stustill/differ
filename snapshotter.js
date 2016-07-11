var page = require('webpage').create();
var system = require('system');

var url = 'https://web.ig.com/register#/page/1/country/FR/locale/fr_FR/platform/websites?type=large';
var hashPage2 = '/page/2';
var hashPage3 = '/page/3';
var hashPage4 = '/page/4';
var hashPage5 = '/page/5';
var dir = system.args[1];

page.viewportSize = { width: 1024, height: 1024 };

page.open(url, function (status) {
  setTimeout(function() {
    // populateField(page, 'firstName', '&');
    // populateField(page, 'lastName', '&');
    // populateField(page, 'email', '&');
    // populateField(page, 'username', '&');
    // populateField(page, 'password', '&');
    page.render(dir + '/page1.png');


    renderPage(hashPage2, dir + '/page2.png', function () {
      renderPage(hashPage3, dir + '/page3.png', function () {
        renderPage(hashPage4, dir + '/page4.png', function () {
          renderPage(hashPage5, dir + '/page5.png', function () {
            phantom.exit();
          });
        });
      });
    });

  }, 2000);
});

function renderPage(url, image, then) {
    page.evaluate(function (hash) {
      window.location.hash = hash;
    }, url);
    setTimeout(function() {
      page.render(image);
      then();
    }, 2000);
}


function populateField(page, fieldName, value) {
  focusField(page, fieldName);
  typeString(page, value);
}

function focusField(page, fieldName) {
  page.evaluate(function (n) {
    document.querySelector('input[name="' + n + '"]').focus();
  }, fieldName);
}

function typeString(page, value) {
  for (var i = 0; i < value.length; i++) {
    page.sendEvent('keypress', value[i]);
  }
}