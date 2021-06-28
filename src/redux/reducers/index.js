/* eslint-disable default-case */
const initialState = {
  todo: [],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  const newToDoArr = [];

  switch (action.type) {
    case "SET_TODOS":
      // Listeyi direk olarak güncelleme.
      newState.todo = action.value;
      break;
    case "ADD_TODO":
      // Listeye Task eklemek.
      newState.todo = [action.value, ...newState.todo];
      break;
    case "EDIT_TODO":
      // Listede ki seçilen taski güncelleme.
      for (let i = 0; i < newState.todo.length; i++) {
        const element = newState.todo[i];

        if (action.value.id === element.id) {
          newToDoArr.push({
            ...element,
            name: action.value.name,
            desc: action.value.desc,
          });
        } else {
          newToDoArr.push(element);
        }
      }

      newState.todo = newToDoArr;
      break;
    case "CHANGE_STATUS":
      // Listede ki seçilen taskin durumunu değiştirme.
      for (let i = 0; i < newState.todo.length; i++) {
        const element = newState.todo[i];

        if (action.value.id === element.id) {
          newToDoArr.push({
            ...element,
            done: !action.value.done,
          });
        } else {
          newToDoArr.push(element);
        }
      }

      newState.todo = newToDoArr;
      break;
    case "DELETE_TODO":
      // Listede ki seçilen taskin silinmesi.
      for (let i = 0; i < newState.todo.length; i++) {
        const element = newState.todo[i];

        if (action.value.id !== element.id) {
          newToDoArr.push(element);
        }
      }

      newState.todo = newToDoArr;
      break;
  }
  return newState;
};

export default reducer;
