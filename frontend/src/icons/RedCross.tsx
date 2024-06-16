import * as React from "react"
import {SVGProps} from "react";
const RedCross = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 480 480"
        {...props}
    >
        <path
            d="M168 472h144V312h160V168H312V8H168v160H8v144h160v160z"
            style={{
                fill: "#d80027",
            }}
        />
        <path
            d="M312 480H168a8 8 0 0 1-8-8V320H8a8 8 0 0 1-8-8V168a8 8 0 0 1 8-8h152V8a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8v152h152a8 8 0 0 1 8 8v144a8 8 0 0 1-8 8H320v152a8 8 0 0 1-8 8zm-136-16h128V312a8 8 0 0 1 8-8h152V176H312a8 8 0 0 1-8-8V16H176v152a8 8 0 0 1-8 8H16v128h152a8 8 0 0 1 8 8v152z"
            style={{
                fill: "#231f20",
            }}
        />
    </svg>
)
export default RedCross
