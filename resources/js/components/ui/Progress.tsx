import React from "react";

interface Props {
	text: string;
	percent: number
}

const Progress: React.FC<Props> = ({ percent, text }) => {
	return (
		<div className="progress">
			<div className="progress-bar" style={{ width: `${percent}%` }}>
				{text} {percent}%
			</div>
		</div>
	)
}

export default Progress
