import styled from 'styled-components'

import * as basic from '../../css/variables'

export const PlayerContainer = styled.div`
  position: absolute;
  bottom: -80px;
  width: 62px;
  height: 62px;
  cursor: pointer;
  transition: all .25s ${basic.mainBezier};
  border-radius: 50%;

  &.czar {
    box-shadow: 5px 5px 5px gold,
                -5px -5px 5px gold;
    animation: czar-animation 3s linear infinite;

    p {
      color: gold;

      span {
        font-size: 1.4rem;
        position: relative;
        top: -15px;
      }
    }
  }

  @keyframes czar-animation {
    0% {
      box-shadow: 5px 5px 5px gold,
                  -5px -5px 5px gold;
    }
    25% {
      box-shadow: 5px -5px 5px gold,
                  -5px 5px 5px gold;
    }
    50% {
      box-shadow: -5px -5px 5px gold,
                  5px 5px 5px gold;
    }
    75% {
      box-shadow: -5px 5px 5px gold,
                  5px -5px 5px gold;
    }
    100% {
      box-shadow: 5px 5px 5px gold,
                  -5px -5px 5px gold;
    }
  }

  &.hover {
    width: 200px;
    height: 60px;
  }

  @keyframes popout-player-details {
    0% {
      width: 60px;
    }
    100% {
      width: 300px;
    }
  }

  .word {
    position: absolute;
    line-height: 55px;
    left: 5px;
    z-index: 5;
    color: white;
    font-size: 2rem;
  }

  &:nth-child(1) {
    top: 500px;
    left: 47%;
  }

  &:nth-child(2) {
    top: 500px;
    left:10%;
  }

  &:nth-child(3) {
    top: -80px;
    left: 10%;
  }

  &:nth-child(4) {
    top: -80px;
    left: 47%;
  }


  &:nth-child(5) {
    top: -80px;
    right: 10%;
  }

  &:nth-child(6) {
    top: 500px;
    right: 10%;
  }
`

export const UserProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  opacity: .4;
`

export const UserPoints = styled.div`
  position: absolute;
  top: -5px;
  left: 40px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(24, 24, 24, 1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  opacity: 1;
  transition: all .25s ease-in-out;

  &.hover {
    opacity: 0;
  }
`

export const UserDetails = styled.div`
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  position: absolute;
  top: -1px;
  left: -1px;
  border: 1px solid white;
  background: rgba(20, 20, 20, 1);
  color: white;
  opacity: 0;
  transition: all .25s ease-in-out;
  border-radius: 40px;

  &.hover {
    border-radius: 40px 10px 10px 40px;
    opacity: 1;
  }
`

export const UserDetail = styled.p`
  padding-left: 40%;
`