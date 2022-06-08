// let colorH = Math.floor(Math.random() *359)
//     , colorS = Math.floor(Math.random() *40) +60
//     , colorL = Math.floor(Math.random() *15) +7  // dark colors to adjust
//     ;
//   mydiv.style.setProperty('--colorBG', `hsl(${colorH}, ${colorS}%, ${colorL}%)`)

function colorGen() {
  return (
    'hsl(' +
    360 * Math.random() +
    ',' +
    (25 + 70 * Math.random()) +
    '%,' +
    (85 + 10 * Math.random()) +
    '%)'
  );
}

export default colorGen;
