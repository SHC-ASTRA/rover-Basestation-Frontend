import { useState, useEffect } from "react";

export default function ColoredIndicator({ bad_value, good_value, current_value, precision, unit }: { bad_value: number, good_value: number, current_value: number, precision?: number, unit?: string }) {
    const [color, setColor] = useState('var(--green)');
    useEffect(() => {
        if (bad_value < good_value) {
            if (current_value < bad_value) {
                setColor('var(--red)');
            } else if (current_value < good_value) {
                setColor('var(--yellow)');
            } else {
                setColor('var(--green)');
            }
        } else if (good_value < bad_value) {
            if (current_value < good_value) {
                setColor('var(--green)');
            } else if (current_value < bad_value) {
                setColor('var(--yellow)');
            } else {
                setColor('var(--red)');
            }
        } else {
            // shouldn't get here, so make it weirdo
            setColor('var(--blue)');
        }
    }, [bad_value, good_value, current_value]);

    return (
        <div style={{ color: color }} className="colored-indicator">
            <p>{current_value.toFixed(precision)}{unit
                ? unit
                : null}</p>
        </div>
    );
}
