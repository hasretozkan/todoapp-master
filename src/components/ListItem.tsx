import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TodoItem from "./TodoItem";

interface ListItemProps {
  data: any;
  onDoneButtonPress(id: string, done: boolean): void;
  onEditButtonPress(item: object): void;
  onDeleteButtonPress(item: object): void;
}

export default class ListItem extends Component<ListItemProps> {
  render() {
    const { data, onDoneButtonPress, onEditButtonPress, onDeleteButtonPress } =
      this.props;

    return (
      <Grid container direction="column">
        {data.map((todo: any, index: number) => (
          <TodoItem
            key={todo.id}
            onDoneButtonPress={(id, done) => onDoneButtonPress(id, done)}
            onEditButtonPress={(data) => onEditButtonPress(data)}
            onDeleteButtonPress={(data) => onDeleteButtonPress(data)}
            data={todo}
          />
        ))}
      </Grid>
    );
  }
}
