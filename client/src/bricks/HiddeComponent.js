import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

export const HiddeComponent = ({children, showLabel, hideLabel}) => {
    const [hidden, setVisible] = useState(true);
    const enhancedChildren = React.cloneElement(children, {
      setVisible: setVisible,
    });
    console.log(hidden);
  return (
    <div>

    <Button variant="outline-success" onClick={() => setVisible(!hidden)}>
            {hidden ? showLabel : hideLabel}
    </Button>
    <div hidden={hidden}>{enhancedChildren}</div>
    </div>
  )
}
