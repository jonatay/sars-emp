/*
  functions to calc paye, age and eti for SARS
  jrTaylor
  
  latest: 170615

180319: 2019 tax table

*/

var empTable = {
    2016: {
        tax_year: 2016,
        rebate: 13257,
        rebate65: 7407,
        rebate75: 2466,
        brackets: [
            {
                idx: 1,
                from: 0,
                to: 181900,
                amount: 0,
                percent: 18
            }, {
                idx: 2,
                from: 181901,
                to: 284100,
                amount: 32742,
                percent: 26
            }, {
                idx: 3,
                from: 284101,
                to: 393200,
                amount: 59314,
                percent: 31
            }, {
                idx: 4,
                from: 393201,
                to: 550100,
                amount: 93135,
                percent: 36
            }, {
                idx: 5,
                from: 550101,
                to: 701300,
                amount: 149619,
                percent: 39
            }, {
                idx: 6,
                from: 701301,
                to: 99999999,
                amount: 208587,
                percent: 18
            }
        ]
    },
    2017: {
        tax_year: 2017,
        rebate: 13500,
        rebate65: 7407,
        rebate75: 2466,
        brackets: [
            {
                idx: 1,
                from: 0,
                to: 188000,
                amount: 0,
                percent: 18
            }, {
                idx: 2,
                from: 188001,
                to: 293600,
                amount: 33840,
                percent: 26
            }, {
                idx: 3,
                from: 293601,
                to: 406400,
                amount: 61296,
                percent: 31
            }, {
                idx: 4,
                from: 406401,
                to: 550100,
                amount: 96264,
                percent: 36
            }, {
                idx: 5,
                from: 550101,
                to: 701300,
                amount: 147996,
                percent: 39
            }, {
                idx: 6,
                from: 701301,
                to: 99999999,
                amount: 208587,
                percent: 18
            }
        ]
    },
        2018: {
        tax_year: 2018,
        rebate: 13635,
        rebate65: 7479,
        rebate75: 2493,
        brackets: [
            {
                idx: 1,
                from: 0,
                to: 189880,
                amount: 0,
                percent: 18
            }, {
                idx: 2,
                from: 189881,
                to: 296540,
                amount: 34178,
                percent: 26
            }, {
                idx: 3,
                from: 296541,
                to: 410460,
                amount: 61910,
                percent: 31
            }, {
                idx: 4,
                from: 410461,
                to: 555600,
                amount: 97225,
                percent: 36
            }, {
                idx: 5,
                from: 555601,
                to: 708310,
                amount: 149475,
                percent: 39
            }, {
                idx: 6,
                from: 708311,
                to: 1500000,
                amount: 209032,
                percent: 41
            }, {
                idx: 7,
                from: 1500001,
                to: 999999999,
                amount: 533625,
                percent: 45
            }
        ]
    },
        2019: {
        tax_year: 2019,
        rebate: 14067,
        rebate65: 7713,
        rebate75: 2574,
        brackets: [
            {
                idx: 1,
                from: 0,
                to: 195850,
                amount: 0,
                percent: 18
            }, {
                idx: 2,
                from: 195851,
                to: 305850,
                amount: 35253,
                percent: 26
            }, {
                idx: 3,
                from: 305851,
                to: 423300,
                amount: 63853,
                percent: 31
            }, {
                idx: 4,
                from: 423301,
                to: 555600,
                amount: 100263,
                percent: 36
            }, {
                idx: 5,
                from: 555601,
                to: 708310,
                amount: 147891,
                percent: 39
            }, {
                idx: 6,
                from: 708311,
                to: 1500000,
                amount: 207448,
                percent: 41
            }, {
                idx: 7,
                from: 1500001,
                to: 999999999,
                amount: 532041,
                percent: 45
            }
        ]
    }

};

var etiTable = [
    {
        "fromSal": 0,
        "toSal": 2001,
        "func" : "calcSEtiT1",
        "year1": {
            "percent": .5,
            "amt": 0,
            "sub": 0
        },
        "year2": {
            "percent": .25,
            "amt": 0,
            "sub": 0
        }
    },
    {
        "fromSal": 2001,
        "toSal": 4001,
        "func" : "calcSEtiT2",
        "year1": {
            "percent": 0,
            "amt": 1000,
            "sub": 0
        },
        "year2": {
            "percent": 0,
            "amt": 500,
            "sub": 0
        }
    },
    {
        "fromSal": 4000,
        "toSal": 6001,
        "func" : "calcSEtiT3",
        "year1": {
            "percent": .5,
            "amt": 1000,
            "sub": 4000
        },
        "year2": {
            "percent": .25,
            "amt": 500,
            "sub": 4000
        }
    },

];

var efiStart = new Date(2013, 10, 1);
  
  function callGSE() {
    return getSarsEti(3500, 243, new Date(2016,3,23), 25);  
  }
  
 
function calcSEtiT1(i, salary, hours, empMths) {
  var eti = etiTable[i];
  return (empMths <= 12) ? salary * eti.year1.percent : salary * eti.year2.percent;
}
function calcSEtiT2(i, salary, hours, empMths) {
  var eti = etiTable[i];
  return (empMths <= 12) ? eti.year1.amt : eti.year2.amt;
}
function calcSEtiT3(i, salary, hours, empMths) {
  var eti = etiTable[i];
  return (empMths <= 12) ? eti.year1.amt - (eti.year1.percent * (salary - eti.year1.sub)) : eti.year2.amt - (eti.year2.percent * (salary - eti.year2.sub));
}


function getSarsEti(salary, hours, empl_date, age, calc_date) {

  salary = Math.round(salary);

  if (!calc_date) { 
    var now = new Date();
  } else {
    var now = calc_date; 
  }
  
  var empMths;
  empMths = (now.getFullYear() - empl_date.getFullYear()) * 12;
  empMths += now.getMonth();
  empMths -= empl_date.getMonth();
  
  if ((empMths <= 24) && (age <= 29) && (age >= 17)) {
    for (var i = 0; i < etiTable.length; i=i+1) {
      var item = etiTable[i];          
      if ((salary >= item.fromSal) && (salary <= item.toSal)) {
        break;
      }  
    }       
    if (i != etiTable.length) 
      return (eval(item.func+"(i, salary, hours, empMths)"));
    else
      return 0;
  } else {
    return 0;
  }
  
}

function getSarsPaye(taxeable, age, tax_year) {

    var emp = empTable[tax_year];

    //rebates
    var rebate = emp.rebate;
    if (age >= 65) {
        rebate += emp.rebate65
    }
    ;
    if (age >= 75) {
        rebate += emp.rebate75
    }
    ;
    //tax
    var tax = 0;
    //full years remuni
    taxeable = taxeable * 12;
    //search tax brackets for matching annual
    for (var i in emp.brackets) {
        var br = emp.brackets[i];
        if (taxeable >= br.from && taxeable <= (br.to + 0.9999)) {
            tax = br.amount + ((taxeable - br.from) * br.percent / 100);
            continue;
        }
    }
    return Math.max((tax - rebate) / 12, 0);
}

function getAgeFromId(id, calc_date) {
  
    //current date
    if (!calc_date) {
      var d = new Date();
    } else {
      var d = calc_date;
    }
    
    // pull out curr yr&mth
    var cM = d.getFullYear().toString().substr(0, 2);
    var cY = d.getFullYear();
    // born year
    var bY = cM.concat(id.substr(0, 2));
    // is born before or after toc - ( only works if younger than 100 :} )
    bY = (cY > bY) ? bY - 1 + 1 : bY - 100;
    //born date
    var bD = new Date(bY, id.substr(2, 2) - 1, id.substr(4, 2));
    //age
    var age = (d - bD) / 31556900000;
    return age;
}

function sheetName() {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}
