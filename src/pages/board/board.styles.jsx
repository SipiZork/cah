import styled from 'styled-components'

export const BoardContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  min-width: 1100px;
  background-color: rgb(49, 49, 49);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const Table = styled.div`
  position: relative;
  min-width: 880px;
  margin-top: 100px;
  width: 80vw;
  height: 50vh;
  min-height: 420px;
  border: 2px solid rgba(0, 0, 0, 1);
  background-color: rgb(49, 122, 0);
`

export const PlayerContainer = styled.div`
  position: absolute;
  border-radius: 50%;
  bottom: -80px;
  width: 60px;
  height: 60px;
  cursor: pointer;

  &:nth-child(1) {
    bottom: -80px;
    left: 50%;
    transform: translate(-50%);
  }


  &:nth-child(2) {
    top: -80px;
    left: 50%;
    transform: translate(-50%);
  }

  &:nth-child(3) {
    bottom: -80px;
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
    bottom: -80px;
    right: 10%;
  }
`

export const UserProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

export const UserPoints = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background-color: rgba(24, 24, 24, 1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`