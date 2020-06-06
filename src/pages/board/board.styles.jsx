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

export const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

export const BlackCardsContainer = styled.div`
  width: 300px;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`

export const HiddenBlackCards = styled.div`
  position: relative;
  width: 80px;
  height: 120px;
  margin: 0 20px;
  border: 1px solid white;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  p {
    position: absolute;
    left: -18px;
    top: 40px;
    width: 150%;
    transform: rotate(-60deg);
  }
`