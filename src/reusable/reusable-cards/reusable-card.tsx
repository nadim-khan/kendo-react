import React from 'react';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import './reusable-cards.scss'
interface CardRowProps {
  count: number;
}

const ReusableCards: React.FC<CardRowProps> = ({ count }) => {
    const colSize = Math.floor(12 / count);
  const cards = Array.from({ length: count }, (_, index) => (
    <Card key={index} className={`reusableCardsMain col-12 col-md-${colSize} mb-4 `}>
      <CardHeader>
        <h3>Card {index + 1}</h3>
      </CardHeader>
      <CardBody>
        <p>This is card number {index + 1}</p>
      </CardBody>
    </Card>
  ));

  return <div style={{ display: 'flex' }}>{cards}</div>;
};

export default ReusableCards;
