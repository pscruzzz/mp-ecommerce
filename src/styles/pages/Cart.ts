import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }
    }
  }
`

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: #7159c1;
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#7159c1')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#7159c1')};
        cursor: not-allowed;
      }
    }
  }
`

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  input {
    outline: none;
    border: none;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  .totalizerWrapper {
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  input + input {
    margin-top: 10px;
  }
  .subFormContainer {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    .divider {
      display: block;
      width: 1px;
      height: 250px;
      background: #ccc;
      margin: 0px 15px;
    }
    /* >div + div{
      margin-left: 20px;
    } */

    h2 {
      margin-bottom: 10px;
    }

    .profileContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .paymentContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .shippingContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`
