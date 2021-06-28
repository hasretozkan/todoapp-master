/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from "react";
import "./App.css";
import constants from './constants';
import Grid from "@material-ui/core/Grid";
import AppBar from "./components/AppBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { TodoInterface } from "./models/ToDoListData";
import Hidden from "@material-ui/core/Hidden";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

// Varsayılan tema için font, ilk ve ikinci renk ayarlamaları.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Trebuchet MS",
      "Lucida Sans Unicode",
      "Lucida Grande",
      "Lucida Sans",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: constants.PRIMARY_COLOR,
    },
    secondary: {
      main: constants.SECONDARY_COLOR,
    },
  },
});

interface AppProps {
  todo: TodoInterface[];
  setToDoList(todolist: TodoInterface[]): void;
  addToDoTask(item: TodoInterface): void;
  editToDoTask(editedData: object): void;
  changeToDoTaskStatus(editedData: object): void;
  deleteToDoTask(deletedData: object): void;
}

class App extends Component<AppProps> {
  state = {
    errMessage: "",
    selectedItem: null,
    loading: true,
    mobileModal: false,
  };

  componentDidMount = () => {
    // İlk olarak verileri çekeceği fonksiyonu çalıştıyor.
    // Bu fonksiyon sonrasında loading false olarak değiştiriliyor.
    this.setTodoData();
  };

  setTodoData = async () => {
    // Firebase üzerinden veriler obje olarak alınıp dizi haline çevriliyor
    // Sonrasında ise global değişken olarak saklanıyor.
    try {
      const listValue = await firebase
        .database()
        .ref("todo")
        .orderByChild("done")
        .once("value");

      let listArray: TodoInterface[] = [];

      listValue.forEach((element) => {
        listArray.push(element.val());
      });

      this.props.setToDoList(listArray);
    } catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  };

  addTask = async (name: string, desc: string) => {
    // Yeni oluşturulan task firebase veritabanına yazdırılıyor.
    // Localde ise global değişken güncelleniyor.
    try {
      const id = uuidv4();
      const timestamp = new Date().getTime();
      const newTodo = {
        id,
        name,
        desc,
        timestamp: timestamp,
        done: false,
      };

      await firebase.database().ref("todo").child(id).set(newTodo);
      this.setState({ mobileModal: false });
      this.props.addToDoTask(newTodo);
    } catch (error) {
      return this.setState({ errMessage: "Something went wrong." });
    }
  };

  editTask = async (name: string, desc: string, id: string) => {
    // Task ID'si ile değiştirilen task güncelleniyor.
    // Localde ise global değişken güncelleniyor.
    try {
      var updates = {
        name,
        desc,
      };

      this.setState({ selectedItem: null, mobileModal: false });
      await firebase.database().ref("todo").child(id).update(updates);

      this.props.editToDoTask({
        name,
        desc,
        id,
      });
    } catch (error) {
      return this.setState({ errMessage: "Something went wrong." });
    }
  };

  doneButtonPress = async (id: string, done: boolean) => {
    // Task ID'si ile değiştirilen task durumu güncelleniyor.
    // Localde ise global değişken güncelleniyor.
    try {
      await firebase.database().ref("todo").child(id).child("done").set(!done);
      this.props.changeToDoTaskStatus({
        done,
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onEditButtonPress = async (data: object) => {
    try {
      await this.setState({ selectedItem: data, mobileModal: true });
    } catch (error) {
      console.log(error);
    }
  };

  onDeleteButtonPress = async (data: any) => {
    // Task ID'si ile silinme işlemi gerçekleşiyor.
    // Localde ise global değişken güncelleniyor.
    try {
      await firebase.database().ref("todo").child(data.id).set(null);
      this.props.deleteToDoTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { selectedItem, errMessage, loading, mobileModal } = this.state;
    const { todo } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar />
          <Grid container className="root">
            <Hidden xsDown>
              <Grid item md={4} lg={3} xs={12} sm={4} className="add-div">
                <AddItem
                  data={selectedItem}
                  onAddButtonPress={(name, desc) => this.addTask(name, desc)}
                  onEditButtonPress={(name, desc, id) =>
                    this.editTask(name, desc, id)
                  }
                  errMessage={errMessage}
                  cancelEditing={() =>
                    this.setState({ selectedItem: null, mobileModal: false })
                  }
                />
              </Grid>
            </Hidden>
            <Grid item md={8} lg={9} xs={12} sm={8} className="list-div">
              {loading ? (
                <Typography color="primary" variant="h6">
                  Loading
                </Typography>
              ) : (
                <ListItem
                  data={todo}
                  onDoneButtonPress={(id, done) =>
                    this.doneButtonPress(id, done)
                  }
                  onEditButtonPress={(data) => this.onEditButtonPress(data)}
                  onDeleteButtonPress={(data) => this.onDeleteButtonPress(data)}
                />
              )}
            </Grid>
            <Hidden smUp>
              <Modal
                open={mobileModal}
                className="modal-div"
                onClose={() => this.setState({ mobileModal: false })}
              >
                <Grid item xs={11} className="add-div-modal">
                  <AddItem
                    data={selectedItem}
                    onAddButtonPress={(name, desc) => this.addTask(name, desc)}
                    onEditButtonPress={(name, desc, id) =>
                      this.editTask(name, desc, id)
                    }
                    errMessage={errMessage}
                    cancelEditing={() =>
                      this.setState({ selectedItem: null, mobileModal: false })
                    }
                  />
                </Grid>
              </Modal>
              <IconButton
                style={{
                  backgroundColor: constants.PRIMARY_COLOR,
                  position: "sticky",
                  bottom: 5,
                  left: "80vw",
                }}
                onClick={() => this.setState({ mobileModal: true })}
              >
                <AddIcon fontSize="large" style={{ color: constants.SECONDARY_COLOR }} />
              </IconButton>
              <Grid item xs={12}></Grid>
            </Hidden>
          </Grid>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: { todo: TodoInterface[] }) => {
  return {
    todo: state.todo,
  };
};

const mapDispachToProps = (
  dispatch: (arg0: { type: string; value: any }) => any
) => {
  return {
    setToDoList: (data: TodoInterface[]) =>
      dispatch({ type: "SET_TODOS", value: data }),
    addToDoTask: (data: TodoInterface) =>
      dispatch({ type: "ADD_TODO", value: data }),
    editToDoTask: (data: object) =>
      dispatch({ type: "EDIT_TODO", value: data }),
    changeToDoTaskStatus: (data: object) =>
      dispatch({ type: "CHANGE_STATUS", value: data }),
    deleteToDoTask: (data: object) =>
      dispatch({ type: "DELETE_TODO", value: data }),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(App);
