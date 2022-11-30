import React from 'react';
import * as MdIcon from 'react-icons/md';

const NavBarData = [
  // Faculty Tabs
  {
    authority: 'Faculty',
    title: 'Student Status',
    path: '/faculty',
    icon: <MdIcon.MdFaceUnlock />,
    cName: 'nav-text',
    pageId: 0,
  },
  /*
  {
    authority: 'Faculty',
    title: 'Plan Of Study',
    path: '/CoursePlan',
    icon: <MdIcon.MdEditCalendar />,
    cName: 'nav-text',
    pageId: 1,
  },*/

  // Staff Tabs
  {
    authority: 'Staff',
    title: 'Students',
    path: '/admin',
    icon: <MdIcon.MdFaceUnlock />,
    cName: 'nav-text',
    pageId: 0,
  },
  // {
  //     authority: 'Staff',
  //     title: "Alumni",
  //     path: '/adminAlumni',
  //     icon: <FaIcon.FaPeopleArrows />,
  //     cName: 'nav-text',
  //     pageId: 1
  {
    authority: 'Staff',
    title: 'Survey',
    path: '/survey',
    icon: <MdIcon.MdSpeakerNotes />,
    cName: 'nav-text',
    pageId: 1,
  },
  {
    authority: 'Staff',
    title: 'Courses',
    path: '/courseEditor',
    icon: <MdIcon.MdEditNote />,
    cName: 'nav-text',
    pageId: 1,
  },
  // All
  {
    authority: 'All',
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdIcon.MdDashboard />,
    cName: 'nav-text',
    pageId: 2,
  },

  // Deprecated
];

export default NavBarData;
