import React from "react";
import { fetchData } from "./api/axios";
import Table from "./components/table";
import Modal from "./components/modal";
import AppBar from "./components/appbar";

class App extends React.Component {
  state = {
    users: null,
    modelOpen: false,
    selectedUserIndex: 0,
  };
  async componentDidMount() {
    const data = await fetchData();
    this.setState({ users: data });
  }
  handleClick = (selectedUserId) => {
    this.setState({ modelOpen: true });
    this.state.users.map((user, idx) => {
      if (selectedUserId === user.id) {
        this.setState({ modelOpen: true, selectedUserIndex: idx });
      }
    });
  };

  render() {
    if (this.state.users) {
      let index = this.state.selectedUserIndex;
      return (
        <>
          <AppBar />
          <div style={{ position: "absolute", display: "flex", width: "90%" }}>
            <Table
              users={this.state.users}
              openModal={(selectedUser) => this.handleClick(selectedUser)}
            />
          </div>
          <Modal
            doOpen={this.state.modelOpen}
            doClose={() => this.setState({ modelOpen: false })}
            activetimesList={this.state.users[index].activity_periods}
            timeZone={this.state.users[index].tz}
          />
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default App;
