import * as React from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import * as request from "request-promise";
import GameList from "./GameList";

class LobbyView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.handleJoinResponse = this.handleJoinResponse.bind(this)

        this.state = {
            newRoomName: "",
            rooms: [],
        };

        // Remove game from list when it becomes full
        this.props.socket.on("game-full", fullRoom => {
            this.setState({
                rooms: this.state.rooms.filter(room => room !== fullRoom),
            });
        });
    }

    public componentDidMount() {
        getOpenGames().then((games) => {
            this.setState({
                rooms: games,
            });
        });
    }

    public onSubmitNewRoom(event) {
        event.preventDefault();
        const gameName = this.cleanInput(this.state.newRoomName);
        if (gameName) {
            createGame(gameName).then((game) => {
                this.setState({
                    rooms: [...this.state.rooms, game.title],
                });
                joinGame(game.title).then(this.handleJoinResponse)
            });
        }
    }

    public cleanInput(input: string): string {
        return input.trim().replace("<", "").replace(">", "");
    }

    public onInputChange({target}) {
        this.setState({[target.name]: target.value});
    }

    public handleJoinResponse({title}) {
        this.props.history.push(`/game/${title}`)
    }

    public render() {

        const onInputChange = this.onInputChange.bind(this);
        const onSubmitNewRoom = this.onSubmitNewRoom.bind(this);

        return (
            <div className="room page">
                <h2 id="roomWelcome">
                    Hello! Welcome to Majavashakki.
                    Please, join existing game or create a new one.
                </h2>
                <GameList rooms={this.state.rooms} />
                {this.state.error && <p>Error: {this.state.error}</p>}
                <div className="newRoomArea">
                    <form onSubmit={onSubmitNewRoom}>
                        Create new room:
                        <TextField
                            name="newRoomName"
                            label="Room name"
                            onChange={onInputChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

function getOpenGames() {
    return request({
        method: "GET",
        url: window.location.origin + "/api/games",
        json: true,
    });
}

function createGame(name) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games",
        body: {name},
        json: true,
    });
}

function joinGame(name) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games/join",
        body: {name},
        json: true,
    });
}

export default withRouter(LobbyView);
