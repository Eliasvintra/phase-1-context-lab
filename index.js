/* Your Code Here */
function createEmployeeRecord(recordArray) {
    return { // creates an object for the employee information
      firstName: recordArray[0],
      familyName: recordArray[1],
      title: recordArray[2],
      payPerHour: recordArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
    
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
    
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    
    return this;
  }
    
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    
    return this;
  }
    
  function hoursWorkedOnDate(date) {
    let hoursWorked = 0;
    for (let i = 0; i < this.timeInEvents.length; i++) {
      if (this.timeInEvents[i].date === date) {
        const timeInHour = this.timeInEvents[i].hour;
        const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
        if (timeOutEvent) {
          const timeOutHour = timeOutEvent.hour;
          hoursWorked = (timeOutHour - timeInHour) / 100;// convert to decimal number of hours(24hr system)
        }
      }
    }
    return hoursWorked;
  }
    
  function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  
  function allWagesFor() {
    let eligibleDates = this.timeInEvents.map(function(event) {
      return event.date;
    });
    
    let payable = eligibleDates.reduce(function(memo, date) {
      return memo + wagesEarnedOnDate.call(this, date);
    }.bind(this), 0);
    
    return payable;
  }
    
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(record) {
      return record.firstName === firstName;
    });
  }
    
  function calculatePayroll(records) {
    return records.reduce(function(memo, record) {
      return memo + allWagesFor.call(record);
    }, 0);
  }
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass and it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

