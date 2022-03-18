import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import * as React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import OwnerCalendar from './OwnerCalendar';

const appointments = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2022, 2, 17),
    end: new Date(2022, 2, 17),
  },
  {
    title: 'Vacation',
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: 'Conference',
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

export default function EventCalendar() {
  const [allAvailableAppts, setAvailableAppts] = useState(appointments);
  // TODO ^ change above to retrieve all available appts for this event

  const eventTitle = 'This Event';
  //TODO ^ change above to retrieve event title from BE
  const eventUrl = 'Share link';
  //TODO ^ change above to retrieve url from BE

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" alignItems="center" m={1}>
        <Typography>{eventTitle}</Typography>
        <Typography>{eventUrl}</Typography>
        {/* TODO, remove below once we have a way for Bob to view Alice's calendar and book appt */}
        <Button variant="contained" href="/book_appt">
          <CalendarMonthIcon />
          Book Appointment
        </Button>
      </Box>

      <OwnerCalendar slots={allAvailableAppts} setSlots={setAvailableAppts} />
    </React.Fragment>
  );
}
