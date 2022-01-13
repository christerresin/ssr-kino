const renderEvents = (data) => {
  const eventsData = data.map((event) => {
    event.eventDay = event.eventDate.substring(10, 8);

    const movieMonth = event.eventDate.substring(7, 5);

    switch (parseInt(movieMonth)) {
      case 1:
        event.eventMonth = 'Jan';
        break;
      case 2:
        event.eventMonth = 'Feb';
        break;
      case 3:
        event.eventMonth = 'Mar';
        break;
      case 4:
        event.eventMonth = 'Apr';
        break;
      case 5:
        event.eventMonth = 'Maj';
        break;
      case 6:
        event.eventMonth = 'Jun';
        break;
      case 7:
        event.eventMonth = 'Jul';
        break;
      case 8:
        event.eventMonth = 'Aug';
        break;
      case 9:
        event.eventMonth = 'Sep';
        break;
      case 10:
        event.eventMonth = 'Okt';
        break;
      case 11:
        event.eventMonth = 'Nov';
        break;
      case 12:
        event.eventMonth = 'Dec';
        break;
    }
    return event;
  });
  return eventsData;
};

export default renderEvents;
