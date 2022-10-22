let testEmployee = ["Gray", "Worm", "Security", 1]

function createEmployeeRecord(testEmployee){


    let employeeRecord = {
        'firstName': `${testEmployee[0]}`,
        'familyName': `${testEmployee[1]}`,
        'title': `${testEmployee[2]}`,
        'payPerHour': testEmployee[3],
        'timeInEvents': [],
        'timeOutEvents': [],
    }

    return employeeRecord
}

//

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

function createEmployeeRecords(twoRows){
    let allEmployeeRecords = twoRows.map(employee => createEmployeeRecord(employee))
    return allEmployeeRecords

}

//

function createTimeInEvent(employeeRecord, dateStamp){
    let dateAndTimeArray = dateStamp.split(' ')
    let hour = dateAndTimeArray[1]*1
    let date = dateAndTimeArray[0]

    let employeeTimeInRecord = {
        'type': "TimeIn",
        'hour': hour,
        'date': `${date}`,
    }

    employeeRecord.timeInEvents.push(employeeTimeInRecord)
    
    return employeeRecord
}

// 

function createTimeOutEvent(employeeRecord, dateStamp){
    let dateAndTimeArray = dateStamp.split(' ')
    let hour = dateAndTimeArray[1]*1
    let date = dateAndTimeArray[0]

    let employeeTimeOutRecord = {
        'type': "TimeOut",
        'hour': hour,
        'date': `${date}`,
    }

    employeeRecord.timeOutEvents.push(employeeTimeOutRecord)

    return employeeRecord
}

//

function hoursWorkedOnDate(employeeRecord, date){
    //given a date, find # hours worked between time in event and time out event.

    //to do this, we will need to access the timeInEvents array of objects and the timeOutEvents array of objects. Within each array of objects, we need to access the 'hour' values whose 'date' values are equal to the date passed into our argument.
    let timeInEventOnDate = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    let timeInOnDate = timeInEventOnDate.hour
    
    let timeOutEventOnDate = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)
    let timeOutOnDate = timeOutEventOnDate.hour

    //with the hour values acquired, we will need to subtract timeIn from timeOut in order to return the number of hours worked that day. And also make sure that it is an Integer.

    let hoursWorked = (timeOutOnDate - timeInOnDate)/100

    return hoursWorked
}

//

function wagesEarnedOnDate(employeeRecord, date){
    //return an integer representing the wages earned on the date passed in as an argument

    //use the hoursWorkedOnDate function, and multiply it by the payrate of the employee included in that employee's employeeRecord.

    //to do this, we will need to access the 'payPerHour' key/value property wtihin the given employee's employeeRecord. We will also need to access the hoursWorked on the given date by using our above function.
    let hoursOnDate = hoursWorkedOnDate(employeeRecord, date)
    let payRate = employeeRecord.payPerHour

    let amountOwed = hoursOnDate*payRate

    return amountOwed
}

//

function allWagesFor(employeeRecord){
        //need to find access to all of the dates worked and iterate through them while applying the above function (map)
        
        //employeeTimeInRecord is inaccessible, but represents an element within the timeInEvents array which we do have access to.

        let availableDates = employeeRecord.timeInEvents.map(createDates)

        function createDates (timeInEvent){
            return timeInEvent.date
        }
        
        //define this in a way that will aggregate all pay earned  using the wagesEarnedOnDate function 
        let availableWages = availableDates.map((availableDate) => {             
            return wagesEarnedOnDate(employeeRecord, availableDate)  
      })
        const reducer = (accumulator, availableWage) => {
            let total = availableWage
            return accumulator += total
        }

        let payOwedForAllDates = availableWages.reduce(reducer, 0)

        return payOwedForAllDates
    }

    //

    function calculatePayroll(allEmployees){
        
        return allEmployees.reduce(function(a, b){
            return a + allWagesFor(b)
        }, 0)

        // let allRecords = createEmployeeRecords(allEmployees)
        // console.log(allRecords)

        // let allAvailableTimeInEvents = allRecords.map(createAvailTimeInEvents)

        // let createAvailTimeInEvents = (employeeRecord) => {return employeeRecord.timeInEvents}

        // let allAvailableDates = allAvailableTimeInEvents.map(createAvailDates)

        // let createAvailDates = (timeInEvent) => {return timeInEvent.date}
        
        // let allAvailableWages = allAvailableDates.map((availableDate) => {              
        //     return wagesEarnedOnDate(employeeRecord, availableDate)  
        // })

        // const reducer = (accumulator, allAvailableWages) => {
        //     let total = allAvailableWages
        //     return accumulator += total
        // }

        // let payOwedForAllEmployees = allAvailableWages.reduce(reducer, 0)

        // return payOwedForAllEmployees
    }