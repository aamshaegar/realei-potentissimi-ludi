import React from "react";

function AnimatedBackground() {
	return (
		<div
			aria-hidden
			className="
				pointer-events-none
				absolute
				inset-1
				rounded-3xl
				border
				border-blue-200/40
				bg-gradient-to-br
				from-blue-500/10
				via-violet-500/5
				to-blue-500/10
				backdrop-blur-xl
			"
		/>
	);
}

export default AnimatedBackground;
