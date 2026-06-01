import React from "react"

interface IconProps {
    name: string
    fill?: string
    width: number | string
    height: number | string
    className?: string
}

const SvgIcon: React.FC<IconProps> = ({ name, fill = '#333', width = 24, height = 24, className, ...props }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aire-hidden="true"
            viewBox="0 0 1024 1024"
            style={{
                display: 'inline-block',
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                overflow: 'hidden',
            }}
            fill={fill}
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <use href={`#icon-${name}`} fill={fill} />
        </svg>
    );
}

export default SvgIcon