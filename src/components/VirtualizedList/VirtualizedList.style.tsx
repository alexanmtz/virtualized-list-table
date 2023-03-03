import styled from 'styled-components';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const VListWrapperStyle = styled('div')<{height: number}>`
  border: 1px solid #ccc;
  max-height: ${props => props.height}px;
  height: ${props => props.height}px;
  width: 100%;
  position: relative;
  overflow: scroll;
`

export const VListStyleInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`
