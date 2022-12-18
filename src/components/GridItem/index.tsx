import * as C from "./styles";
import { GridItemType } from "../../types/GridItem";
import b7Svg from "../../svgs/b7.svg";

import { items } from "../../data/items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};
export const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container onClick={onClick} show={item.permanentShown || item.shown}>
      {!item.permanentShown && !item.shown && (
        <C.Icon src={b7Svg} alt="" opacity={0.3} />
      )}
      {(item.permanentShown || item.shown) && item.type !== null && (
        <C.Icon src={items[item.type].icon} alt="" />
      )}
    </C.Container>
  );
};
