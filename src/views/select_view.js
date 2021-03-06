const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-names', (event) => {
    const countryNames = event.detail;
    this.populate(countryNames);
  });

  this.element.addEventListener('change', (event) => {
    const optionID = event.target.value;
    PubSub.publish('SelectView:option-selected', optionID)
  })
};

SelectView.prototype.populate = function (countryNames) {
  countryNames.forEach((countryName, index) => {
    const option = document.createElement('option');
    option.textContent = countryName;
    option.value = index;
    this.element.appendChild(option);
  });
};

module.exports = SelectView
