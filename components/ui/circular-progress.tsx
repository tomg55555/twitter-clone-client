import React from 'react';

interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    backgroundColor?: string;
    progressColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
                                                               percentage,
                                                               size = 25,
                                                               strokeWidth = 3,
                                                               backgroundColor = '#e6e6e6',
                                                               progressColor = '#3b82f6',
                                                           }) => {
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width={size}
                height={size}
            >
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke={backgroundColor}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-blue-600"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke={progressColor}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
        </div>
    );
};

export default CircularProgress;

