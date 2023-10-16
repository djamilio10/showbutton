import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        fullName: "JOE BIDEN",
        bio: "Joseph Robinette Biden, Jr, couramment appelé Joe Biden, né le 20 novembre 1942 à Scranton, en Pennsylvanie, est un homme d'État américain. Membre du Parti démocrate, il est sénateur des États-Unis de 1973 à 2009, puis vice-président des États-Unis de 2009 à 2017",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Portrait_of_United_States_President_Joe_Biden.jpg/640px-Portrait_of_United_States_President_Joe_Biden.jpg",
        profession: "Président des États-Unis depuis 2021",
      },
      show: false,
      interval: 0,
    };
    this.intervalId = null;
  }

  toggleShow = () => {
    if (!this.state.show) {
      this.setState({ interval: 0 });
      // On démarre l'intervalle qui met à jour l'état "interval" chaque seconde
      this.intervalId = setInterval(() => {
        this.setState((prevState) => ({
          interval: prevState.interval + 1,
        }));
      }, 1000);
    } else {
      // si les informations son masquer on arret le compte a rebour
      clearInterval(this.intervalId);
    }

    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { fullName, bio, image, profession } = this.state.person;

    return (
      <>
        {/* Partie image et stylisation */}
        <div className="flex justify-center">
          <img
            className="w-[20%] rounded-lg border-2 border-gray-500"
            src={image}
            alt=""
          />
        </div>

        <div className="flex flex-col items-center">
          {this.state.show && (
            // les information qu'on affiche si on appui sur le boutton afficher
            <div className="flex flex-col text-center w-[25%] mt-4">
              <div className="shadow-2xl p-4">
                <h1 className="text-lg font-bold">Nom: {fullName}</h1>
                <h2 className="font-medium">{bio}</h2>
                <h3 className="text-lg font-bold">Profession: {profession}</h3>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            {/* on met du style au boutton  */}
            <button
              className="ml-[18px] inline-block align-middle select-none border font-normal whitespace-nowrap rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md hover:bg-blue-700 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={this.toggleShow}
            >
              {this.state.show ? "Masquer" : "Afficher"}
            </button>
          </div>

          {this.state.show && (
            // {/* Affichage de l'intervalle de temps en bas des informations */}
            <p>
              Intervalle de temps depuis le montage : {this.state.interval}{" "}
              secondes
            </p>
          )}
        </div>
      </>
    );
  }
}

export default App;
