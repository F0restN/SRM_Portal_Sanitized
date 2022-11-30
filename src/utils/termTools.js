const calculateTermValue = (semster) => {
  const splitArr = semster.split(' ');
  const term = splitArr[1];
  const year = splitArr[0];
  if (year === 'null' || term === 'null') {
    return -1;
  }
  let flag = 0;
  switch (term) {
    case 'Spring':
      flag = 1;
      break;
    case 'Summer':
      flag = 2;
      break;
    case 'Fall':
      flag = 3;
      break;
    default:
      flag = 0;
      break;
  }
  return year * 10 + flag;
};

/**
 * Description. (use to auto-calculate the last term)
 * @param [{..."courseYear": Numric, "courseTerm": String}] arr,
 * @returns String lastSemster
 */
function determineLastSemester(arr) {
  let lastScore = 0;
  let lastSemester = '';
  arr.forEach((item, index) => {
    let score = item.courseYear * 10;
    switch (item.courseTerm) {
      case 'Spring':
        score += 1;
        break;
      case 'Summer':
        score += 2;
        break;
      case 'Fall':
        score += 3;
        break;
      default:
        score += 0;
    }
    if (score > lastScore) {
      lastSemester = item.courseYear + item.courseTerm;
      lastScore = score;
    }
  });
  return lastSemester;
}

export { calculateTermValue, determineLastSemester };
