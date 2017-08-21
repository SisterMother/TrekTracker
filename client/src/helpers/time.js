module.exports.parse = (timeStringRaw, relativeTime) => {
  let date = new Date(timeStringRaw);
  
  if (relativeTime) {
      let secondsSinceSent = ((new Date().getTime() - date.getTime()) / 1000);
      let minutesSinceSent = secondsSinceSent / 60;
      let hoursSinceSent = minutesSinceSent / 60;
      let daysSinceSent = hoursSinceSent / 24;
      let weeksSinceSent = daysSinceSent / 7;
      let monthsSinceSent = minutesSinceSent / 43800; // There are exactly 43800 minutes in a month
      let yearsSinceSent = monthsSinceSent / 12;
  
      secondsSinceSent = Math.round(secondsSinceSent);
      minutesSinceSent = Math.round(minutesSinceSent);
      hoursSinceSent = Math.round(hoursSinceSent);
      daysSinceSent = Math.round(daysSinceSent);
      weeksSinceSent = Math.round(weeksSinceSent);
      monthsSinceSent = Math.round(monthsSinceSent);
      yearsSinceSent = Math.round(yearsSinceSent);
  
      if (secondsSinceSent < 60) {
          let seconds = Math.round(secondsSinceSent);
          if (seconds <= 5) {
              return 'just now';
          } else {
              return 'less than a minute ago';
          }
      }
      if (minutesSinceSent < 60) {
          if (minutesSinceSent === 1) {
              return minutesSinceSent + ' minute ago';
          } else {
              return minutesSinceSent + ' minutes ago';
          }
      }
      if (hoursSinceSent < 24) {
          if (hoursSinceSent === 1) {
              return hoursSinceSent + ' hour ago';
          } else {
              return hoursSinceSent + ' hours ago';
          }
      }
      if (daysSinceSent < 7) {
          if (daysSinceSent === 1) {
              return daysSinceSent + ' day ago';
          } else {
              return daysSinceSent + ' days ago';
          }
      }
      if (weeksSinceSent < 4) {
          if (weeksSinceSent === 1) {
              return weeksSinceSent + ' week ago';
          } else {
              return weeksSinceSent + ' weeks ago';
          }
      }
      if (weeksSinceSent < 5) {
          if (weeksSinceSent === 1) {
              return weeksSinceSent + ' week ago';
          } else {
              return weeksSinceSent + ' weeks ago';
          }
      }
      if (monthsSinceSent < 12) {
          if (monthsSinceSent === 1) {
              return monthsSinceSent + ' month ago';
          } else {
              return monthsSinceSent + ' months ago';
          }
      }
      if (yearsSinceSent < 4) {
          if (yearsSinceSent === 1) {
              return yearsSinceSent + ' year ago';
          } else {
              return yearsSinceSent + ' years ago';
          }
      }
  }
  
  let dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  let timeString = '';
  let amORpm = 'AM';
  
  if (date.getHours() > 12) {
      timeString += (date.getHours() - 12) + ':';
      amORpm = 'PM';
  } else {
      timeString += date.getHours() + ':';
  }
  
  if (date.getMinutes() < 10) {
      timeString += '0';
  }
  timeString += date.getMinutes() + ' ' + amORpm;
  
  return dateString + ' ' + timeString;
  };