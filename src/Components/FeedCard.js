import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import axios from "axios";
import { Modal, Box } from "@mui/material";
import EventForm from './Forms/TransactionForm';

const style = {
  position: "absolute",
  borderRadius: "1em",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  zIndex: 1000,
  pt: 2,
  px: 4,
  pb: 3,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FeedCard({ event, reRender, setReRender, search, setSearch }) {
  const [fav, setFav] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const EditEvent = (event) => {
    handleOpen();
  };

  const AddFavourteEvent = () => {
    setFav(!fav);
    axios
      .post("http://127.0.0.1:5000/api/fav-add", {
        event_id: event._id,
        user_id: event.owner._id,
      })
      .then((response) => {
        console.log(response);
        // setReRender(!reRender);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const JoinEvent = () => {
    const useID = localStorage.getItem('user_id');
    axios
      .post("http://127.0.0.1:5000/api/event-join", {
        event_id: event._id,
        user_id: useID,
      })
      .then((response) => {
        console.log(response);
        // setReRender(!reRender);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteEvent = (event) => {
    console.log("event._id: ", event._id);
    axios
      .post("http://127.0.0.1:5000/api/event-delete", {
        id: event._id
      })
      .then((response) => {
        console.log(response);
        setReRender(!reRender);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{ ...style, width: 500, mt: 10, background: "#1c2651" }}
          >
            <EventForm event={event} setReRender={setReRender} reRender={reRender} setOpen={setOpen} />
          </Box>
        </Modal>
      </div>
      <Card sx={{ maxWidth: "100%", mt: 2, mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {event.owner.name.slice(0, 2)}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings">
                <div>
                  <DeleteIcon onClick={() => deleteEvent(event)} sx={{ color: red[500] }} />{" "}
                </div>
              </IconButton>
              <IconButton aria-label="settings">
                <div>
                  <EditIcon onClick={() => EditEvent(event)} color="primary" />{" "}
                </div>
              </IconButton>
            </>
          }
          title={event.title + " | Creaated By: " + event.owner.name}
          subheader={event.date + " at " + event.venue}
        />
        {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {/* <FavoriteIcon sx={{ color: red[500] }} /> */}
            {fav ? (
              <FavoriteIcon
                onClick={() => setFav(!fav)}
                sx={{ color: red[500] }}
              />
            ) : (
              <FavoriteIcon onClick={() => { AddFavourteEvent() }} />
            )}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
          <Button onClick={() => JoinEvent()}>Join</Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>

  );
}
