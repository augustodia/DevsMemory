import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";

import { Button } from "./components/Button";
import InfoItem from "./components/InfoItem";
import { GridItem } from "./components/GridItem";

import { items } from "./data/items";
import { GridItemType } from "./types/GridItem";

import { formatTimeElapsed } from "./helpers/formatTimeElapsed";
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    if (moveCount > 0 && gridItems.every((i) => i.permanentShown)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  useEffect(() => {
    if (shownCount === 2) {
      let openedItems = gridItems.filter((i) => i.shown);
      if (openedItems.length === 2) {
        if (openedItems[0].type === openedItems[1].type) {
          openedItems[0].permanentShown = true;
          openedItems[1].permanentShown = true;
        }

        setTimeout(() => {
          openedItems[0].shown = false;
          openedItems[1].shown = false;
        }, 500);
        setShownCount(0);
      }
      setMoveCount(moveCount + 1);
    }
  }, [shownCount, gridItems, moveCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timeout", playing);
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const resetAndCreateGrid = () => {
    //#region RESET GAME
    setTimeElapsed(0);
    setMoveCount(0);
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

  const handleItemClick = (idx: number) => {
    if (playing && idx !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];
      if (!tmpGrid[idx].permanentShown && !tmpGrid[idx].shown) {
        tmpGrid[idx].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        {formatTimeElapsed(timeElapsed)}
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
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
