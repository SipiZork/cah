import React from 'react'

import './homepage.styles.scss'

const HomePage = () => (
  <div className="board-container">
    <div className="board">
      <div className="player-container">
        <img src="https://siposmark.com/assets/profil.png" alt="profil" className="profile-pic" />
        <div className="points">
          <span>1</span>
        </div>
      </div>
      <div className="player-container">
        <img src="https://siposmark.com/assets/profil.png" alt="profil" className="profile-pic" />
          <div className="points">
            <span>2</span>
        </div>
      </div>
      <div className="player-container">
        <img src="https://siposmark.com/assets/profil.png" alt="profil" className="profile-pic" />
          <div className="points">
            <span>3</span>
        </div>
      </div>
      <div className="player-container">
        <img src="https://siposmark.com/assets/profil.png" alt="profil" className="profile-pic" />
          <div className="points">
            <span>4</span>
        </div>
      </div>
      <div className="player-container">
        <img src="https://siposmark.com/assets/profil.png" alt="profil" className="profile-pic" />
          <div className="points">
            <span>5</span>
        </div>
      </div>
      <div className="player-container">
        <img src="https://siposmark.com/assets/profil.png" alt="profil" className="profile-pic" />
          <div className="points">
            <span>6</span>
        </div>
      </div>
      <div className="cards-wrapper">
        <div className="black-card-wrapper">
          <div className="black-cards"><p>Cards Against Humanity</p></div>
          <div className="revealed-black-card"><p>Tegnap ____ volt nálam. Nagyon élveztem.</p></div>      
        </div>
        <div className="white-card-wrapper">
          <div className="revealed-white-card"><p>Mókus</p></div>
          <div className="revealed-white-card"><p>Prosti</p></div>
          <div className="revealed-white-card"><p>Keresztény pap</p></div>
          <div className="white-card"><p>Cards Against Humanity</p></div>
          <div className="white-card"><p>Cards Against Humanity</p></div>
          <div className="white-card"><p>Cards Against Humanity</p></div>
        </div>
      </div>
    </div>
    <div className="player-cards">
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
      <div className="card">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac interdum ipsum. Donec sed velit euismod</p>
      </div>
    </div>
  </div>
)

export default HomePage