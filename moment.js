// Get the current time
var currentTime = moment();

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
  