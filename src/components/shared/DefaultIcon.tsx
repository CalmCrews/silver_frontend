import React from "react";

interface IconProps {
	size?: string;
	icon: string;
	name: string;
}

const DefaultIcon = ({size = "1rem", icon, name}: IconProps) => {
	const styles = {
		img: {
			width: size,
			height: size,
			marginRight: "0.7rem",
		},
	};
	return <img style={styles.img} src={icon} alt={name}/>
}

export default DefaultIcon;