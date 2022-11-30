/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import { isUndefined, contains } from 'underscore';
import TermDropDown from './TermDropDown';
import YearDropDown from './YearDropDown';
import DayTimeDropDown from './DayTimeDropDown';

const deleteEntryFromCurrSelection = (id, currentSelection) => {
  const cloneCurrentSelection = [...currentSelection];
  for (let i = 0; i < cloneCurrentSelection.length; i += 1) {
    const iterObj = cloneCurrentSelection[i];
    if (iterObj.courseId === id) {
      cloneCurrentSelection.splice(i, 1);
    }
  }
  return cloneCurrentSelection;
};

function CourseRow({
  course,
  currentSelection,
  setCurrentSelection,
  resetFlag,
  setResetFlag,
  coreCourses,
  transactionId,
}) {
  const [day, setDay] = useState(course.courseDay);
  const [time, setTime] = useState(course.courseTime);
  const [term, setTerm] = useState(course.courseTerm);
  const [year, setYear] = useState(course.courseYear);

  // Update state
  useEffect(() => {
    setDay(course.courseDay);
    setTime(course.courseTime);
    setTerm(course.courseTerm);
    setYear(course.courseYear);
    // if (day !== course.courseDay) {
    // }
  }, [
    course.courseDay,
    course.courseTime,
    course.courseTerm,
    course.courseYear,
  ]);

  // Subscribe / unsubscribe
  useEffect(() => {
    if (
      !isUndefined(term) &&
      !isUndefined(year) &&
      !isUndefined(time) &&
      !isUndefined(day) &&
      day !== '' &&
      day !== 'NA' &&
      time !== '' &&
      time !== 'NA' &&
      term !== '' &&
      term !== 'NA' &&
      year !== '' &&
      year !== 'NA'
    ) {
      const data = course.courseData;
      let result = '';
      for (let i = 0; i < data.length; i += 1) {
        const obj = data[i];
        if (
          obj.day === day &&
          obj.time === time &&
          obj.term === term &&
          obj.start_year <= year &&
          obj.end_year >= year
        ) {
          result = obj;
        }
      }
      // Remove previous selection of this course if we have.
      const cloneCurrentSelection = deleteEntryFromCurrSelection(
        course.courseId,
        currentSelection
      );
      // Add in the latest selection
      setCurrentSelection([
        ...cloneCurrentSelection,
        {
          courseTitle: course.courseTitle,
          courseId: course.courseId,
          courseUid: result.uid,
          courseDay: result.day,
          courseTime: result.time,
          courseTerm: term,
          courseYear: year,
          transactionId: transactionId,
        },
      ]);
    }
    // Delete selection
    if (time === 'NA' && day === 'NA' && term === 'NA') {
      setCurrentSelection([
        ...deleteEntryFromCurrSelection(course.courseId, currentSelection),
      ]);
    }
    // Clean up
    return () => {};
  }, [day, time, term, year]);

  const emptySelection = () => {
    setTime('');
    setDay('');
    setTerm('');
    setYear('');
  };

  const displayDayAndTime = () => {
    const { courseOptions } = course;
    let availOptions = [];
    if (
      term === 'Spring' ||
      term === 'Fall' ||
      (term === 'Summer' && !isUndefined(year))
    ) {
      availOptions = courseOptions[term];
    }
    return (
      <DayTimeDropDown
        options={availOptions}
        selectedTerm={term}
        selectedYear={year}
        selectedDay={day}
        selectedTime={time}
        resetFlag={resetFlag}
        setDay={setDay}
        setTime={setTime}
        setResetFlag={setResetFlag}
        emptySelection={emptySelection}
      />
    );
  };

  return (
    // Bolded required courses
    <tr
      key={course.courseUid}
      style={
        contains(coreCourses, course.courseId) ? { fontWeight: 'bold' } : {}
      }
    >
      <td>{course.courseId}</td>
      <td>{course.courseTitle}</td>
      {displayDayAndTime()}
      <td>
        <TermDropDown
          courseAvailTerm={course.courseAvailTerm}
          selectedYear={year}
          selectedTerm={term}
          setTerm={setTerm}
          setDay={setDay}
          setTime={setTime}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
          emptySelection={emptySelection}
        />
      </td>
      <td>
        <YearDropDown
          courseAvailYear={course.courseAvailYear}
          selectedYear={year}
          setYear={setYear}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
        />
      </td>
    </tr>
  );
}

export default CourseRow;
