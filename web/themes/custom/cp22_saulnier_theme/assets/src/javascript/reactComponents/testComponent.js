import React, { useState } from "react";
import ReactDOM from "react-dom";

import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.min.css';

const TestComponent = ({ }) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
}

Array.from(document.querySelectorAll('.datepicker')).map((datepicker) => {

    ReactDOM.render(<TestComponent />, datepicker);
});

export default TestComponent;