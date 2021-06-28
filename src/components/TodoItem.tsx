import { Component } from "react";
import constants from "../constants";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { TodoInterface } from "../models/ToDoListData";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";

interface ToDoItemProps {
  data: TodoInterface;
  onDoneButtonPress(id: string, done: boolean): void;
  onEditButtonPress(item: object): void;
  onDeleteButtonPress(item: object): void;
}

export default class ToDoItem extends Component<ToDoItemProps> {
  render() {
    const { data, onDoneButtonPress, onEditButtonPress, onDeleteButtonPress } =
      this.props;

    return (
      <Card
        style={{
          padding: 10,
          marginTop: 10,
          backgroundColor: data.done ? constants.PRIMARY_COLOR : "white",
        }}
        elevation={data.done ? 0 : 1}
      >
        <div className="todo-container">
          <div>
            <Typography
              style={{ color: data.done ? "#fff" : "#000", fontWeight: "bold" }}
              variant="body1"
            >
              {data.name}
            </Typography>
            <Typography
              style={{ color: data.done ? "#fff" : "gray" }}
              variant="body2"
            >
              {data.desc}
            </Typography>
          </div>
          <div className="todo-container">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              style={{ color: data.done ? "#fff" : "#000" }}
              onClick={() => onDoneButtonPress(data.id, data.done)}
            >
              {data.done ? (
                <CheckCircleIcon style={{ color: constants.SECONDARY_COLOR }} />
              ) : (
                <CancelIcon style={{ color: "#DB4437" }} />
              )}
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              style={{ color: data.done ? "#fff" : "#000" }}
              onClick={() => onEditButtonPress(data)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              style={{ color: data.done ? "#fff" : "#000" }}
              onClick={() => onDeleteButtonPress(data)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}
