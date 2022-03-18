import { Box, TextField, Button, Typography } from '@mui/material';
import sx from 'mui-sx';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enCA from 'date-fns/locale/en-CA';
import format from 'date-fns/format';
import { add, getUnixTime } from 'date-fns';
import { CREATE_SLOTS } from '../../graphql/mutations';
import { GET_EVENT } from '../../graphql/queries';
import { useMutation } from '@apollo/client';

export default function OwnerCalendar({ slots, setSlots, eventId }) {
  const [createSlots, { data, loading, error }] = useMutation(CREATE_SLOTS, {
    refetchQueries: [GET_EVENT],
  });

  const [seeSlot, setSeeSlot] = useState(false);
  const [seeSlotInfo, setSeeSlotInfo] = useState(false);
  const [slotInfo, setSlotInfo] = useState({});

  const handleSelect = ({ start, end }) => {
    const slotLength = 30; //TODO, Pass in as props

    let startTime = start;
    let endTime = end;
    const newSlots = [];

    while (startTime < endTime) {
      const finTime = add(startTime, { minutes: slotLength });
      //keys needed to match, {startTime}==={startTime:startTime} is true
      const newSlot = {
        title: 'Empty slot',
        start: `${getUnixTime(startTime)}`,
        end: `${getUnixTime(finTime)}`,
      };
      newSlots.push(newSlot);
      startTime = finTime;
    }
    createSlots({
      variables: { input: { eventId: eventId, slots: newSlots } },
    });
  };

  const viewSlot = ({ start, end, _id, bookerId }) => {
    if (bookerId) {
      const startWhen = format(start, 'E MMM dd yyyy, HH:mm');
      const endWhen = format(end, 'E MMM dd yyyy, HH:mm');
      const slInfo = {
        _id: _id,
        who: bookerId._id,
        when: startWhen + ' - ' + endWhen,
        cmnts: '',
      };
      setSlotInfo(slInfo);
      setSeeSlotInfo(true);
      setSeeSlot(false);
    } else {
      setSeeSlot(true);
      setSeeSlotInfo(false);
    }
  };

  const handleClose = (e) => {
    setSlotInfo({});
    setSeeSlotInfo(false);
  };

  const handleDelete = (e) => {
    setSeeSlot(false);
    //TODO, delete with BE
  };

  const locales = {
    'en-CA': enCA,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const base = {
    margin: 1,
  };

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={slots}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={viewSlot}
      />
      {seeSlot ? (
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="body1">
            Would you like to delete this slot?
          </Typography>
          <Button
            sx={sx(base)}
            type="button"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      ) : null}
      {seeSlotInfo ? (
        <Box display="flex" flexDirection="column">
          <TextField
            sx={sx(base)}
            inputProps={{ style: { fontWeight: 'bold' } }}
            label="Who"
            name="appt_booker"
            value={slotInfo.who}
            disabled
          />
          <TextField
            sx={sx(base)}
            inputProps={{ style: { fontWeight: 'bold' } }}
            label="When"
            name="appt_time"
            value={slotInfo.when}
            disabled
          />
          <TextField
            sx={sx(base)}
            placeholder="Comments"
            name="appt_cmnts"
            value={slotInfo.cmnts}
            multiline
            rows={5}
            disabled
          />
          <Button
            sx={sx(base)}
            type="button"
            variant="outlined"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
