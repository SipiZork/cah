import styled from 'styled-components'

export const PlayerContainer = styled.div`
  position: absolute;
  bottom: -80px;
  width: 62px;
  height: 62px;
  cursor: pointer;
  transition: all .25s cubic-bezier(.56,.01,.49,1.53);
  border-radius: 50%;

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

  &:nth-child(1) {
    top: 500px;
    left: 47%;
  }


  &:nth-child(2) {
    top: -80px;
    left: 47%;
  }

  &:nth-child(3) {
    top: 500px;
    left:10%;
  }

  &:nth-child(4) {
    top: -80px;
    right: 10%;
  }

  &:nth-child(5) {
    top: -80px;
    left: 10%;
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
  top: 0;
  left: 0;
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