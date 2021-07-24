import p5 from 'p5'

interface MySquareProps {
  size: number;
  color: p5.Color
}

export function MySquare (p: p5, { size, color }: MySquareProps) {
  return (x: number, y: number): void => {
    // p.push();
    p.fill(color)
    p.rect(x, y, size, size)
    // p.pop();
  }
}

// export function moveHorizontal(p, { start, moveBy }) {
//   let positionX = start;

//   return () => {
//     positionX += moveBy;

//     // if outside screen move to start
//     if (positionX >= p.width) {
//       positionX = 0;
//     }

//     return positionX;
//   };
// }

// export function getMovingSquare(p, { size, color, startX, startY, moveBy }) {
//   const square = MySquare(p, { size, color });
//   const moveSquare = moveHorizontal(p, { start: startX, moveBy });
//   return () => square(moveSquare(), startY);
// }
