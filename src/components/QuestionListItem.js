import { useState } from "react";
import {
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import WebcamStreamCapture from './WebcamStreamCapture'
const QuestionListItem = ({
  question,
  onToggle,
  selected,
  onDelete,
  onChange,
  onSubmitVideo
}) => {
  const [form, setForm] = useState({
    label: question.question,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const _handleClickCheckbox = ({ target: { checked } }) => {
    if (onToggle) onToggle({ questionId: question._id, checked });
  };
  const _handleChangeText = ({ target: { value, name } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const _handleDelete = () => {
    if (onDelete) onDelete(question._id);
  };
  const _handleClickEditMode = () => {
    setIsEditMode(true);
    setForm({
      label: question.question,
    });
  };
  const _handleClickCancel = () => {
    setIsEditMode(false);
  };

  const _handleSubmit = () => {
    if (onChange) onChange({ ...question, ...form });
    setIsEditMode(false);
  };
  const _handleSubmitVideo=(question) =>{
    onSubmitVideo(question)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia>
          <WebcamStreamCapture
            question = {question}
            onSubmit = {_handleSubmitVideo}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              
              {isEditMode ? (
                <TextField
                  size="small"
                  value={form.label}
                  name="label"
                  onChange={_handleChangeText}
                />
              ) : (
                question.question
              )
            }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isEditMode ? (
              <>
                <IconButton size="small" onClick={_handleClickCancel}>
                  <ClearIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={_handleSubmit}>
                  <CheckIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton size="small" onClick={_handleClickEditMode}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={_handleDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
            <Checkbox
          edge="end"
          onChange={_handleClickCheckbox}
          checked={selected}
        />
      </CardActions>
    </Card>
  );
};
export default QuestionListItem;
