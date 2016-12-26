var Calculator = function() {

  // PRIVATE VARIABLES
  // result tallies after each operation click
  var result = 0;

  // value in the main display screen
  var display = 0;

  // visual reference of operations entered so far
  var formula = '';

  // for the current values
  var entry = 0;
  var operator = '';

  // for the previous values
  var lastOperator = '';

  // boolean to structure workflow
  var newEntry = true;
  var newCalc = true;

  // PRIVATE METHODS
  // reset the current entry
  function clearEntry() {
    display = entry = 0;
    newEntry = true;
  }

  // reset the formula is only used at the end of a calculation
  function clearFormula() {
    formula = '';
    lastOperator = '';
  }

  // reset the results
  function clearResult() {
    result = 0;
  }

  // do math for results
  function doMath(oper) {
    switch(oper) {
      case 'add':
        return result += entry;
        break;
      case 'subtract':
        return result -= entry;
        break;
      case 'divide':
        return result /= entry;
        break;
      case 'multiply':
        return result *= entry;
        break;
               }
  }

  // convert operator button input id into corresponding math symbol for formula display
  function getOperator(id) {
    switch(id) {
      case 'add':
        return '+';
        break;
      case 'subtract':
        return '-';
        break;
      case 'divide':
        return '&divide';
        break;
      case 'multiply':
        return 'x';
        break;
      case 'equals':
        return '='
        break;
               }
  }

  function updateResult() {

    if (newCalc) {
      result = entry;
      lastOperator = operator;
      display = result;
      newCalc = false;
    } else {
      if (operator === 'equals') {
        result = doMath(lastOperator);
        display = result;
        newCalc = true;
      } else {
        result = doMath(lastOperator);
        lastOperator = operator;
        display = result;
      }
    }
    newEntry = true;
  }

  // PRIVILEGED METHODS
  // for CE button
  this.clearEntry = function() {
    clearEntry();
  };

  // for AC button
  this.clearAll = function() {
    clearEntry();
    clearFormula();
    clearResult();
  };

  // output to display screen
  this.getDisplay = function() {
    return display;
  };

  // output to formula screen
  this.getFormula = function() {
    return formula;
  };

  // for operator buttons
  this.doOperation = function(id) {

    operator = id;
    if (entry !== 0) {
      entry = Number(entry);
    }

    // convert operator for formula screen
    var screenOperator = getOperator(operator);
    formula += entry + screenOperator;

    // update result and display
    updateResult();

  };

  // for number buttons
  this.setEntry = function(val) {
    // if start of new calculation, replace previous result with val
    if (newCalc) {
      clearFormula();
      clearResult();
    }

    if (newEntry) {
      entry = val;
      display = entry;
      newEntry = false;
    } else {
      entry += val;
      display = entry;
    }
  };

}

var calc = new Calculator();

function updateScreen() {
  $('#resultScreen').text(calc.getDisplay());
  var html = '<i>fX: </i>';
  html += calc.getFormula();
  $('#equationScreen').html(html);
}

updateScreen();

$('button').on('click', function(){
  switch(this.id) {
    case 'clearAll':
      calc.clearAll();
      updateScreen();
      break;
    case 'clearEntry':
      calc.clearEntry();
      updateScreen();
      break;
    case 'divide':
    case 'multiply':
    case 'add':
    case 'subtract':
    case 'equals':
      calc.doOperation(this.id);
      updateScreen();
      break;
    case 'decimal':
      calc.setEntry('.');
      updateScreen();
      break;
    default:
      calc.setEntry(this.id);
      updateScreen();
      break;
                }
});
