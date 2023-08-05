import React from "react";

interface IconProps {
	size?: string;
	width?: string;
	height?: string;
	icon: string;
	name: string;
}

const DefaultIcon = ({size = "1rem", width, height, icon, name}: IconProps) => {
	const styles = {
		img: {
			width: width? width : size,
			height: height? height: size,
		},
	};
	return <img style={styles.img} src={icon} alt={name}/>
}

export default DefaultIcon;