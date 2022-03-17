import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export default function EventItem({ title, startDate, endDate }) {
  //TODO: Build out better date parsing
  const secondary = `${new Date(startDate * 1000)} to ${new Date(
    endDate * 1000
  )}`;
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary={title} secondary={secondary} />
      </ListItemButton>
    </ListItem>
  );
}
