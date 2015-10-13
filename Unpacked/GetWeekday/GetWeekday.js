// Is invoked each time a new job arrives in one of the input folders for the flow element.
// The newly arrived job is passed as the second parameter.
function jobArrived( s : Switch, job : Job )
{
	var getDay = function( dateString, debug )
   {
      debug = typeof debug !== 'undefined' ? debug : false;
   
      // Pattern for parsing the string
      var regex = /(\d{4})+(\d{2})+(\d{2})+(\d{2})+(\d{2})/;
      regex.search(dateString);
      var parsedYear = regex.cap(1);
      var parsedMonth = regex.cap(2);
      var parsedDay = regex.cap(3);
      var parsedHour = regex.cap(4);
      var parsedMinute = regex.cap(5);
      
      // Log   
      if(debug == true) s.log(2, parsedYear + ', ' + parsedMonth + ', ' + parsedDay + ', ' + parsedHour + ', ' + parsedMinute);
      
      // Convert to date
      var date = new Date( parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute );
      
      // Get the day of the week
      var day = date.getDay();
      
      // Convert day code to full day
      var weekDayValues = {
          1: 'Sunday',
          2: 'Monday',
          3: 'Tuesday',
          4: 'Wednesday',
          5: 'Thursday',
          6: 'Friday',
          7: 'Saturday'
      };
      
      // Return
      return weekDayValues[day];
      
   };
	
	// Get flow element properties
	var dateString = s.getPropertyValue( 'DateString' );
	var privateDataKey = s.getPropertyValue( 'PrivateDataKey' );
   
   // Log
   s.log(2, dateString+' becomes: ' + getDay( dateString ) );
   
   // Write to PD
   job.setPrivateData( privateDataKey, getDay( dateString ) );
   
   // End
   job.sendToSingle( job.getPath() );
}
