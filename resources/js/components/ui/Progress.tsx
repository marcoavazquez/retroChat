import React from "react";

interface Props {
	percent: number
}

const Progress: React.FC<Props> = ({ percent }) => {
	return (
		<div className="progress">
			<div className="progress-bar" style={{ width: `${percent}%` }}>
				{percent}%
			</div>
		</div>
	)
}

export default Progress
