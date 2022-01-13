const currentDate = () => {
  let myDate = new Date();
  let myDateString;

  myDate.setDate(myDate.getDate());

  myDateString =
    myDate.getFullYear() +
    '-' +
    ('0' + (myDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + myDate.getDate()).slice(-2);

  return myDateString;
};

export default currentDate;
