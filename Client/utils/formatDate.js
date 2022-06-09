import { DateTime } from 'luxon';

function formatDate(data, days) {
  //   console.log(DateTime.fromISO('2022-06-09T05:09:27.000Z').toLocaleString());

  const today = DateTime.now();
  const calendar = [];
  for (let i = days; i >= 0; i--) {
    let curDate = i > 0 ? today.minus({ days: i }) : today;
    let curDateObj = curDate.toObject();
    let dbMapped = data.find(
      (el) =>
        DateTime.fromISO(el.takenat).toLocaleString() ===
          curDate.toLocaleString() || el.takenat === curDate.toLocaleString()
    );
    let dateObj = {
      ...curDateObj,
      weekdayShort: curDate.weekdayShort,
      title: curDateObj.day === 1 ? curDate.year : curDateObj.day,
      subtitle:
        curDateObj.day === 1 ? curDate.monthShort : curDate.weekdayShort,
      img: dbMapped
        ? dbMapped.url
        : 'https://1pad.s3.amazonaws.com/samplePhoto.jpeg',
      id: dbMapped?.id,
      tags: dbMapped?.tags,
      comments: dbMapped?.comments,
      date: dbMapped ? dbMapped.takenat : curDate.toLocaleString(),
    };
    calendar.push(dateObj);
  }
  return calendar;
}

export default formatDate;

const dt = DateTime.now();
const date = dt.toObject();
// {"year":2022,"month":6,"day":7,"hour":13,"minute":24,"second":52,"millisecond":358}

// const generateCalendar = (date) => {
//   const calendar = [];

//   for (let i = 30; i > 0; i--) {
//     const dateObj = date.toObject();
//     dateObj.weekdayShort = date.weekdayShort;
//     if (dateObj.day === 1) {
//       dateObj.title = date.year;
//       dateObj.subtitle = date.monthShort;
//     } else {
//       dateObj.title = dateObj.day;
//       dateObj.subtitle = dateObj.weekdayShort;
//     }
//     dateObj.img = `https://1pad.s3.amazonaws.com/samplePhoto.jpeg`;
//     dateObj.id = i;

//     calendar.unshift(dateObj);

//     date = date.minus({ days: 1 });
//   }
//   return calendar;
// };
