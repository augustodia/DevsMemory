import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";

import { Button } from "./components/Button";
import InfoItem from "./components/InfoItem";
import { GridItem } from "./components/GridItem";

import { items } from "./data/items";
import { GridItemType } from "./types/GridItem";
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCout, setMoveCout] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    //#region RESET GAME
    setTimeElapsed(0);
    setMoveCout(0);
    setShownCount(0);
    //#endregion

    //#region SORT ITENS GRID
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        type: null,
        shown: false,
        permanentShown: false,
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].type !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].type = i;
      }
    }
    //#endregion

    //#region START GAME
    setPlaying(true);
    setGridItems(tmpGrid);
    //#endregion
  };

  const handleItemClick = (idx: number) => {};
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00:00" />
          <InfoItem label="Movimentos" value="0" />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        ></Button>
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, idx) => (
            <GridItem
              key={idx}
              item={item}
              onClick={() => handleItemClick(idx)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
