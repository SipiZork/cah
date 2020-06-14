import styled, { css } from 'styled-components'

const getCardPositions = () => {
  let nth = ''
  for (let i = 2; i <= 3; i++) {
    nth += `&:nth-child(${i}) {left: ${50 * (i - 1)}px; z-index: ${i} };`
  }
  return nth
}

export const Card = styled.div`
  width: 120px;
  height: 165px;
  border: 1px solid black;
  background-color: white;
  color: black;
  font-size: .9rem;
  padding: .25rem;
  position: absolute;
  top: 10px;
  ${getCardPositions}
  transition: .2s ease-in-out;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  box-shadow: -5px 5px 40px black;
  border: 1px solid black;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    transform: scale(1.3);
    z-index: 5;
  }

  &.selected {
    box-shadow: -5px 5px 50px green;
    border: 1px solid green;
  }

  span {
    text-align: center;
    position: absolute;
    font-size: 1.4rem;
    left: -25%;
    top: 35%;
    font-weight: 600;
    width: 150%;
    transform: rotate(-60deg);
  }
`