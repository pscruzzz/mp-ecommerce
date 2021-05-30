import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;

  svg {
    cursor: pointer;
  }

  .cartContainer {
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;

    > div {
      text-align: right;
      margin-right: 10px;

      strong {
        display: block;
        color: #fff;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`
