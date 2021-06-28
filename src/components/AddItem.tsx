import { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface AddItemProps {
  data: any;
  onAddButtonPress(name: string, desc: string): void;
  onEditButtonPress(name: string, desc: string, id: string): void;
  errMessage: string;
  cancelEditing(): void;
}

export default class AddItem extends Component<AddItemProps> {
  state = {
    name: "",
    desc: "",
    id: "",
    nameErr: false,
    descErr: false,
  };

  componentDidMount = () => {
    // Mobile için edit mi yapılıyor yoksa bir task mi ekleniyor kontrolü yapılıyor.
    if (this.props.data) {
      if (this.props.data.id !== this.state.id) {
        this.setState({
          name: this.props.data.name,
          desc: this.props.data.desc,
          id: this.props.data.id,
        });
      }
    }
  };

  componentDidUpdate = () => {
    // Component her render edildiğinde edit mi yapılıyor yoksa bir task mi ekleniyor kontrolü yapılıyor.
    if (this.props.data) {
      if (this.props.data.id !== this.state.id) {
        this.setState({
          name: this.props.data.name,
          desc: this.props.data.desc,
          id: this.props.data.id,
        });
      }
    }
  };

  addOrEditTask = async () => {
    // Name, desc control ve edit/add control
    const { name, desc, id } = this.state;

    if (name === "") {
      return this.setState({ nameErr: true });
    }

    if (desc === "") {
      return this.setState({ descErr: true });
    }

    if (this.props.data) {
      this.props.onEditButtonPress(name, desc, id);
      return this.setState({
        name: "",
        desc: "",
        id: "",
        nameErr: false,
        descErr: false,
      });
    } else {
      this.props.onAddButtonPress(name, desc);
      return this.setState({
        name: "",
        desc: "",
        id: "",
        nameErr: false,
        descErr: false,
      });
    }
  };

  cancelEditTask = async () => {
    // düzenleme iptal ve tüm stateler initial olarak değiştiriliyor.
    this.props.cancelEditing();
    return this.setState({
      name: "",
      desc: "",
      id: "",
      nameErr: false,
      descErr: false,
    });
  };

  render() {
    const { name, desc, nameErr, descErr } = this.state;
    const { data, errMessage } = this.props;

    return (
      <Grid container direction="column">
        <Typography
          style={{ color: "#000", fontWeight: "bold" }}
          variant="body1"
        >
          Task Name
        </Typography>
        <TextField
          error={nameErr}
          id="outlined-basic-top"
          label="Task Name"
          variant="outlined"
          style={{ marginTop: 10 }}
          value={name}
          onChange={(e) =>
            this.setState({ name: e.target.value, nameErr: false })
          }
        />
        <Typography
          style={{ color: "#000", fontWeight: "bold", marginTop: 20 }}
          variant="body1"
        >
          Task Description
        </Typography>
        <TextField
          error={descErr}
          id="outlined-basic-bottom"
          label="Task Description"
          variant="outlined"
          style={{ marginTop: 10 }}
          value={desc}
          onChange={(e) =>
            this.setState({ desc: e.target.value, descErr: false })
          }
        />
        <Button
          variant="contained"
          disableElevation
          color="primary"
          style={{ marginTop: 10 }}
          onClick={this.addOrEditTask}
        >
          {data ? "Edit Task" : "Add Task"}
        </Button>
        {data ? (
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={this.cancelEditTask}
          >
            Cancel
          </Button>
        ) : null}
        {errMessage !== "" ? (
          <Typography
            style={{ color: "red", fontWeight: "bold", marginTop: 20 }}
            variant="body2"
          >
            {errMessage}
          </Typography>
        ) : null}
      </Grid>
    );
  }
}
