import styled from 'styled-components'

const getCardPositions = () => {
  let nth = ''
  for (let i = 2; i <= 10; i++) {
    nth += `&:nth-child(${i}) {left: ${105 * (i - 1)}px; z-index: ${i} };`
  }
  return nth
}

export const Card = styled.div`
  position: absolute;
  counter-increment: cards;
  bottom: 0;
  border: 1px solid rgb(43, 43, 43);
  width: 155px;
  height: 65%;
  padding: 5px;
  border-radius: 10px 10px 0 0;
  background-color: white;
  cursor: pointer;
  box-shadow: -5px 5px 50px black;
  z-index: 1;
  transition: all .2s ease-in-out;

 ${getCardPositions}

  &:hover {
    z-index: 20;
    height: 70%;
  }
`