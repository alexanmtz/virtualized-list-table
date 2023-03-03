import React, { useEffect, useState, useCallback, FunctionComponent, ReactNode } from 'react';
import { VListStyleInner, VListWrapperStyle } from './VirtualizedList.style';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableCell } from '@mui/material';

type ListProps = {
  height?: number;
  itemHeight?: number;
  renderItem: (params: {
    index: number;
    style: React.CSSProperties;
  }) => ReactNode;
  itemCount?: number;
  columnData: Array<String>;
}

export const VirtualizedList:FunctionComponent<ListProps> = ({
  height = 200,
  itemHeight = 40,
  renderItem,
  itemCount = 0,
  columnData
}) => {
  const [topIndex, setTopIndex] = useState<number>(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const preRenderPageCount = 1;
  const reRenderCount = 1;

  const finalHeight = height ? height : itemHeight * itemCount;

  const renderItems = useCallback(
    (scrollTop: number) => {
      const topHeaderOffset = 58;
      const items = [];
      if (!renderItem) {
        return [];
      }
      const pageBottom =
        scrollTop + (1 + (preRenderPageCount ?? 1)) * height;
      const pageTop =
        scrollTop - (preRenderPageCount ?? 1) * height;
      for (let i = 0; i < itemCount; i++) {
        const curTop = visibleItems[i];
        const curBottom = visibleItems[i + 1];
        if (curTop < pageBottom && curBottom > pageTop) {
          items.push(
            renderItem({
              index: i,
              style: {
                position: "absolute",
                width: '100%',
                top: `${curTop + topHeaderOffset}px`, height: `${itemHeight}px`
              },
            })
          );
        } else if (items.length > 0) {
          break;
        }
      }
      return items;
    },
    [
      visibleItems,
      height,
      itemCount,
      renderItem,
      preRenderPageCount,
    ]
  );

  const calculatevisibleItems = useCallback(() => {
    const items = [0];
    let top = 0;
    for (let i = 0; i < itemCount; i++) {
      top += itemHeight;
      items.push(top);
    }
    setVisibleItems(items);
  }, [itemCount, itemHeight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    /// @ts-ignore
    const curtopIndex = e.target?.scrollTop ?? 0;
    setTopIndex((prevtopIndex) => {
      const diff = curtopIndex - prevtopIndex;
      const maxDiff = height / 2;
      if (diff < maxDiff && diff > -maxDiff) return prevtopIndex;
      return curtopIndex;
    });
  }, []);

  useEffect(() => {
    calculatevisibleItems();
  }, [reRenderCount, calculatevisibleItems]);

  return (
    <VListWrapperStyle onScroll={handleScroll} data-testid="scrolling-element" height={finalHeight}>
      <VListStyleInner>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columnData.map((column, index) => (
                  <TableCell width={240} key={`table-cell-${index}`} align="right">{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderItems(topIndex)}
            </TableBody>
          </Table>
        </TableContainer>
      </VListStyleInner>
    </VListWrapperStyle>
  );
};
