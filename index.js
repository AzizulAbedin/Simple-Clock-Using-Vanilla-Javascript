const currentTime = document.querySelector("h1"), // Selects the h1 element with the class "currentTime" and assigns it to the constant variable "currentTime"
content = document.querySelector(".content"), // Selects the element with the class "content" and assigns it to the constant variable "content"
selectMenu = document.querySelectorAll("select"), // Selects all the select elements on the page and assigns them to the constant variable "selectMenu" as a NodeList
setAlarmBtn = document.querySelector("button"); // Selects the button element on the page and assigns it to the constant variable "setAlarmBtn"

let alarmTime, isAlarmSet, // Declares three variables: "alarmTime", "isAlarmSet", and "ringtone" without assigning them any values
ringtone = new Audio("alarmtone.mp3"); // Creates a new Audio object with the file path "./files/ringtone.mp3" and assigns it to the "ringtone" variable

for (let i = 12; i > 0; i--) { // A for loop that iterates from 12 to 1 (inclusive) and assigns the value to the variable "i"
    i = i < 10 ? `0${i}` : i; // If "i" is less than 10, prepend a "0" to it, otherwise keep its original value
    let option = `<option value="${i}">${i}</option>`; // Creates an HTML option element with a value and text content of "i" and assigns it to the variable "option"
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option); // Inserts the "option" HTML into the first child element of the first select element in the "selectMenu" NodeList, after the first child element
}

for (let i = 59; i >= 0; i--) { // A for loop that iterates from 59 to 0 (inclusive) and assigns the value to the variable "i"
    i = i < 10 ? `0${i}` : i; // If "i" is less than 10, prepend a "0" to it, otherwise keep its original value
    let option = `<option value="${i}">${i}</option>`; // Creates an HTML option element with a value and text content of "i" and assigns it to the variable "option"
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option); // Inserts the "option" HTML into the first child element of the second select element in the "selectMenu" NodeList, after the first child element
}

for (let i = 2; i > 0; i--) { // A for loop that iterates from 2 to 1 (inclusive) and assigns the value to the variable "i"
    let ampm = i == 1 ? "AM" : "PM"; // If "i" is equal to 1, assign the string "AM" to the variable "ampm", otherwise assign the string "PM"
    let option = `<option value="${ampm}">${ampm}</option>`; // Creates an HTML option element with a value and text content of "ampm" and assigns it to the variable "option"
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option); // Inserts the "option" HTML into the first child element of the third select element in the "selectMenu" NodeList, after the first child element
}
// This function runs every second to update the current time displayed in the h1 element
setInterval(() => {
    let date = new Date(), // Creates a new Date object to get the current date and time
    h = date.getHours(), // Gets the current hour
    m = date.getMinutes(), // Gets the current minute
    s = date.getSeconds(), // Gets the current second
    ampm = "AM"; // Initializes the AM/PM indicator as "AM"
    if(h >= 12) { // Checks if the hour is greater than or equal to 12 (afternoon/evening)
        h = h - 12; // Converts the hour to 12-hour format by subtracting 12
        ampm = "PM"; // Sets the AM/PM indicator to "PM"
    }
    h = h == 0 ? h = 12 : h; // Sets the hour to 12 if it is 0 (midnight)
    h = h < 10 ? "0" + h : h; // Adds a leading zero to single-digit hour values
    m = m < 10 ? "0" + m : m; // Adds a leading zero to single-digit minute values
    s = s < 10 ? "0" + s : s; // Adds a leading zero to single-digit second values
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`; // Updates the h1 element with the current time in hh:mm:ss AM/PM format

    if (alarmTime === `${h}:${m} ${ampm}`) { // Checks if the alarm time matches the current time
        ringtone.play(); // Plays the alarm ringtone
        ringtone.loop = true; // Sets the alarm ringtone to loop continuously
    }
});

// This function sets or clears an alarm based on the current state of the isAlarmSet variable
function setAlarm() {
    if (isAlarmSet) { // Checks if an alarm is already set
        alarmTime = ""; // Clears the alarm time
        ringtone.pause(); // Pauses the alarm ringtone
        content.classList.remove("disable"); // Removes the "disable" class from the content element
        setAlarmBtn.innerText = "Set Alarm"; // Updates the text of the setAlarmBtn to "Set Alarm"
        return isAlarmSet = false; // Sets the isAlarmSet variable to false and returns from the function
    }

    // Constructs the alarm time string from the values selected in the select menu
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    // Checks if any of the select menu values are not selected (still set to default)
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!"); // Displays an alert to select a valid time
    }

    alarmTime = time; // Sets the alarm time to the constructed time string
    isAlarmSet = true; // Sets the isAlarmSet variable to true, indicating that an alarm is set
    content.classList.add("disable"); // Adds the "disable" class to the content element to disable further input
    setAlarmBtn.innerText = "Clear Alarm"; // Updates the text of the setAlarmBtn to "Clear Alarm"
}

setAlarmBtn.addEventListener("click", setAlarm); // Adds a click event listener to the setAlarmBtn that triggers the setAlarm() function when clicked