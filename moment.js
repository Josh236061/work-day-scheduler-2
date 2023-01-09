// Get the current time
var currentTime = moment();

 // current day is displayed at the top of the calendar
 $("#currentDay").text(moment().format('dddd MMMM Do YYYY'));
 
 // each time block is color-coded to indicate whether it is in the past, present, or future
 function timeBlockColor() {
     var hour = moment().hours();
 
     $(".time-block").each(function() {
         var currHour = parseInt($(this).attr("id"));
 
         // console.log(this); //each time-block
 
         if (currHour > hour) {
             $(this).addClass("future");
         } else if (currHour === hour) {
             $(this).addClass("present");
         } else {
             $(this).addClass("past");
         }
     })
 };

function updateTimeBlocks() {
  // Loop through each time block
  $('.time-block').each(function() {
    // Get the time label for the time block
    var timeLabel = $(this).find('.hour').text();

    // Convert the time label to a moment object
    var time = moment(timeLabel, 'h:mm A');

    // Compare the current time to the time in the time block
    if (time.isBefore(currentTime)) {
      // Time is in the past, so add the 'past' class
      $(this).addClass('past');
    } else if (time.isSame(currentTime)) {
      // Time is now, so add the 'present' class
      $(this).addClass('present');
    } else {
      // Time is in the future, so add the 'future' class
      $(this).addClass('future');
    }
  });
}

function saveEvent() {
  // Save the event when the save button is clicked
  $('.saveBtn').on('click', function() {
    // Get the event text from the textarea
    var event = $(this).siblings('.description').find('textarea').val();

    // Get the time label for the time block
    var timeLabel = $(this).parent('.time-block').find('.hour').text();

    // Store the event in local storage with the time label as the key
    localStorage.setItem(timeLabel, event);
  });
}

 // WHEN I refresh the page
 // THEN the saved events persist
 function usePlanner() {
 
  $(".hour").each(function() {
      var currHour = $(this).text();
      var currPlan = localStorage.getItem(currHour);

      // console.log(this);
      // console.log(currHour);

      if(currPlan !== null) {
          $(this).siblings(".plan").val(currPlan);
      }
  });
}

function displaySavedEvents() {
  // Loop through each time block
  $('.time-block').each(function() {
    // Get the time label for the time block
    var timeLabel = $(this).find('.hour').text();

    // Get the saved event from local storage, if it exists
    var event = localStorage.getItem(timeLabel);

    // If an event was saved, display it in the textarea
    if (event) {
      $(this).find('.description').find('textarea').val(event);
    }
  });
}

// Update the time blocks every minute
setInterval(function() {
    updateTimeBlocks();
  }, 60000);
  
  // Initialize the page with the current day and time
  $(document).ready(function() {
    // Display the current day
    $('#currentDay').text(currentTime.format('dddd, MMMM Do'));
  
    updateTimeBlocks();
    saveEvent();
    displaySavedEvents();
  });
  